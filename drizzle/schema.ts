import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).unique(),
  password: text("password"),
  openId: varchar("openId", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  techStack: text("techStack"), // JSON array stored as string
  liveUrl: varchar("liveUrl", { length: 512 }),
  githubUrl: varchar("githubUrl", { length: 512 }),
  imageUrl: varchar("imageUrl", { length: 512 }),
  featured: boolean("featured").default(false),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// Teaching experiences table
export const teachingExperiences = pgTable("teaching_experiences", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  organization: varchar("organization", { length: 255 }),
  period: varchar("period", { length: 100 }),
  description: text("description"),
  topics: text("topics"), // JSON array stored as string
  targetAudience: varchar("targetAudience", { length: 255 }),
  achievements: text("achievements"),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type TeachingExperience = typeof teachingExperiences.$inferSelect;
export type InsertTeachingExperience = typeof teachingExperiences.$inferInsert;

// Gallery images table
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 512 }).notNull(),
  imageKey: varchar("imageKey", { length: 512 }),
  category: varchar("category", { length: 100 }),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;

// Teaching plans table
export const teachingPlans = pgTable("teaching_plans", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  gradeLevel: varchar("gradeLevel", { length: 100 }),
  duration: varchar("duration", { length: 100 }),
  objectives: text("objectives"),
  materials: text("materials"),
  activities: text("activities"),
  assessment: text("assessment"),
  notes: text("notes"),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type TeachingPlan = typeof teachingPlans.$inferSelect;
export type InsertTeachingPlan = typeof teachingPlans.$inferInsert;

// Live demos table
export const liveDemos = pgTable("live_demos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  demoUrl: varchar("demoUrl", { length: 512 }),
  embedUrl: varchar("embedUrl", { length: 512 }),
  techStack: text("techStack"),
  thumbnailUrl: varchar("thumbnailUrl", { length: 512 }),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LiveDemo = typeof liveDemos.$inferSelect;
export type InsertLiveDemo = typeof liveDemos.$inferInsert;

// Contact info table (single row)
export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  linkedinUrl: varchar("linkedinUrl", { length: 512 }),
  githubUrl: varchar("githubUrl", { length: 512 }),
  twitterUrl: varchar("twitterUrl", { length: 512 }),
  websiteUrl: varchar("websiteUrl", { length: 512 }),
  location: varchar("location", { length: 255 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = typeof contactInfo.$inferInsert;
