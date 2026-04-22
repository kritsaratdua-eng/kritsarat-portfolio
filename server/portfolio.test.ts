import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Helper to create a public (unauthenticated) context
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

// Helper to create an admin context
function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

// Helper to create a regular user context
function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user info for authenticated users", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.role).toBe("admin");
  });
});

describe("projects router", () => {
  it("public list query does not throw", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    // DB may not be available in test env, so we just check it doesn't throw with a type error
    await expect(caller.projects.list()).resolves.toBeDefined();
  });

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.projects.create({ title: "Test Project" })
    ).rejects.toThrow();
  });

  it("delete requires admin role", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.projects.delete({ id: 1 })
    ).rejects.toThrow();
  });
});

describe("teaching router", () => {
  it("public list query does not throw", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.teaching.list()).resolves.toBeDefined();
  });

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.teaching.create({ title: "Test Experience" })
    ).rejects.toThrow();
  });
});

describe("gallery router", () => {
  it("public list query does not throw", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.gallery.list()).resolves.toBeDefined();
  });

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.gallery.create({ imageUrl: "https://example.com/img.jpg" })
    ).rejects.toThrow();
  });
});

describe("teachingPlans router", () => {
  it("public list query does not throw", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.teachingPlans.list()).resolves.toBeDefined();
  });

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.teachingPlans.create({ title: "Test Plan" })
    ).rejects.toThrow();
  });
});

describe("liveDemos router", () => {
  it("public list query does not throw", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.liveDemos.list()).resolves.toBeDefined();
  });

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.liveDemos.create({ title: "Test Demo" })
    ).rejects.toThrow();
  });
});

describe("contact router", () => {
  it("public get query does not throw", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.contact.get()).resolves.toBeDefined();
  });

  it("update requires admin role", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.contact.update({ email: "test@example.com" })
    ).rejects.toThrow();
  });
});

describe("admin guard", () => {
  it("admin can access protected procedures without FORBIDDEN error", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    // Admin should not throw FORBIDDEN (may return undefined if DB not available)
    await expect(
      caller.projects.create({ title: "Admin Project" })
    ).resolves.not.toThrow();
  });

  it("non-admin cannot access admin procedures", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.projects.create({ title: "Unauthorized" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
