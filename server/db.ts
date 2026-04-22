import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  InsertUser,
  users,
  projects,
  teachingExperiences,
  galleryImages,
  teachingPlans,
  liveDemos,
  contactInfo,
  type InsertProject,
  type InsertTeachingExperience,
  type InsertGalleryImage,
  type InsertTeachingPlan,
  type InsertLiveDemo,
  type InsertContactInfo,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    
    await db.insert(users)
      .values(values as any)
      .onConflictDoUpdate({
        target: users.openId,
        set: updateSet
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUser(data: InsertUser) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [user] = await db.insert(users).values(data as any).returning();
  return user;
}

export async function updateUser(id: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(users).set(data).where(eq(users.id, id));
}

// ── Projects ────────────────────────────────────────────────────────────────
export async function getProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(projects.sortOrder, projects.createdAt);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0];
}

export async function createProject(data: Omit<InsertProject, "id">) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(projects).values(data as any);
}

export async function updateProject(id: number, data: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(projects).set(data).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(projects).where(eq(projects.id, id));
}

// ── Teaching Experiences ─────────────────────────────────────────────────────
export async function getTeachingExperiences() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(teachingExperiences).orderBy(teachingExperiences.sortOrder);
}

export async function createTeachingExperience(data: Omit<InsertTeachingExperience, "id">) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(teachingExperiences).values(data as any);
}

export async function updateTeachingExperience(id: number, data: Partial<InsertTeachingExperience>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(teachingExperiences).set(data).where(eq(teachingExperiences.id, id));
}

export async function deleteTeachingExperience(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(teachingExperiences).where(eq(teachingExperiences.id, id));
}

// ── Gallery Images ───────────────────────────────────────────────────────────
export async function getGalleryImages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(galleryImages).orderBy(galleryImages.sortOrder, galleryImages.createdAt);
}

export async function createGalleryImage(data: Omit<InsertGalleryImage, "id">) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(galleryImages).values(data as any);
}

export async function updateGalleryImage(id: number, data: Partial<InsertGalleryImage>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(galleryImages).set(data).where(eq(galleryImages.id, id));
}

export async function deleteGalleryImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
}

// ── Teaching Plans ───────────────────────────────────────────────────────────
export async function getTeachingPlans() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(teachingPlans).orderBy(teachingPlans.sortOrder, teachingPlans.createdAt);
}

export async function createTeachingPlan(data: Omit<InsertTeachingPlan, "id">) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(teachingPlans).values(data as any);
}

export async function updateTeachingPlan(id: number, data: Partial<InsertTeachingPlan>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(teachingPlans).set(data).where(eq(teachingPlans.id, id));
}

export async function deleteTeachingPlan(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(teachingPlans).where(eq(teachingPlans.id, id));
}

// ── Live Demos ───────────────────────────────────────────────────────────────
export async function getLiveDemos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(liveDemos).orderBy(liveDemos.sortOrder, liveDemos.createdAt);
}

export async function createLiveDemo(data: Omit<InsertLiveDemo, "id">) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(liveDemos).values(data as any);
}

export async function updateLiveDemo(id: number, data: Partial<InsertLiveDemo>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(liveDemos).set(data).where(eq(liveDemos.id, id));
}

export async function deleteLiveDemo(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(liveDemos).where(eq(liveDemos.id, id));
}

// ── Contact Info ─────────────────────────────────────────────────────────────
export async function getContactInfo() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contactInfo).limit(1);
  return result[0];
}

export async function upsertContactInfo(data: Partial<InsertContactInfo>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const existing = await getContactInfo();
  if (existing) {
    await db.update(contactInfo).set(data).where(eq(contactInfo.id, existing.id));
  } else {
    await db.insert(contactInfo).values(data as any);
  }
}
