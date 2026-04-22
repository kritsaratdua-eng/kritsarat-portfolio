import { AXIOS_TIMEOUT_MS, COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import axios, { type AxiosInstance } from "axios";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import { ENV } from "./env";

export type SessionPayload = {
  userId: string;
  username: string;
  name: string;
};

class SDKServer {
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance = axios.create({ timeout: AXIOS_TIMEOUT_MS })) {
    this.client = client;
  }

  private parseCookies(cookieHeader: string | undefined) {
    if (!cookieHeader) {
      return new Map<string, string>();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  /**
   * Creates a secure session token using HMAC-SHA256 with hex-encoded payload.
   * Hex encoding ensures all cookie characters are ASCII-safe (no special chars
   * that trigger Safari's strict cookie pattern matching).
   */
  async createSessionToken(
    userId: string,
    username: string,
    name: string,
    options: { expiresInMs?: number } = {}
  ): Promise<string> {
    return this.signSession({ userId, username, name: name || "" }, options);
  }

  async signSession(
    payload: SessionPayload,
    options: { expiresInMs?: number } = {}
  ): Promise<string> {
    const expires = Date.now() + (options.expiresInMs ?? ONE_YEAR_MS);
    const dataJson = JSON.stringify({ ...payload, expires });
    // Convert JSON to hex to avoid cookie character issues on Safari
    const dataHex = Buffer.from(dataJson).toString("hex");

    const hmac = (await import("crypto")).createHmac("sha256", ENV.cookieSecret);
    hmac.update(dataHex);
    const signature = hmac.digest("hex");
    return `${dataHex}.${signature}`;
  }

  async verifySession(
    cookieValue: string | undefined | null
  ): Promise<SessionPayload | null> {
    if (!cookieValue) return null;

    try {
      const dotIndex = cookieValue.lastIndexOf(".");
      if (dotIndex === -1) return null;

      const dataHex = cookieValue.slice(0, dotIndex);
      const signature = cookieValue.slice(dotIndex + 1);
      if (!dataHex || !signature) return null;

      const hmac = (await import("crypto")).createHmac("sha256", ENV.cookieSecret);
      hmac.update(dataHex);
      const expectedSignature = hmac.digest("hex");

      if (signature !== expectedSignature) return null;

      // Convert hex back to JSON
      const dataJson = Buffer.from(dataHex, "hex").toString("utf8");
      const payload = JSON.parse(dataJson);
      if (payload.expires < Date.now()) return null;

      return payload as SessionPayload;
    } catch {
      return null;
    }
  }

  async authenticateRequest(req: Request): Promise<User> {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);

    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }

    const userId = parseInt(session.userId);
    if (isNaN(userId)) {
      throw ForbiddenError("Malformed session");
    }

    const db = await import("../db");
    const schema = await import("../../drizzle/schema");
    const orm = await import("drizzle-orm");
    const dbInstance = await db.getDb();
    const result = await dbInstance
      ?.select()
      .from(schema.users)
      .where(orm.eq(schema.users.id, userId))
      .limit(1);

    const user = result && result.length > 0 ? result[0] : null;
    if (!user) {
      throw ForbiddenError("User not found");
    }

    return user;
  }
}

export const sdk = new SDKServer();
