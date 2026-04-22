import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "./trpc";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { sql } from "drizzle-orm";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),


  getInfo: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) return { setupNeeded: false };
      
      const countRes = await db.select({ count: sql<number>`count(*)` }).from(users);
      return {
        setupNeeded: Number(countRes[0].count) === 0
      };
    } catch (error) {
      console.error("[SystemRouter] getInfo failed", error);
      return { setupNeeded: false };
    }
  }),
});
