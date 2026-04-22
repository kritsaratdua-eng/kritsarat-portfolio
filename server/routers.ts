import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  getProjects, getProjectById, createProject, updateProject, deleteProject,
  getTeachingExperiences, createTeachingExperience, updateTeachingExperience, deleteTeachingExperience,
  getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage,
  getTeachingPlans, createTeachingPlan, updateTeachingPlan, deleteTeachingPlan,
  getLiveDemos, createLiveDemo, updateLiveDemo, deleteLiveDemo,
  getContactInfo, upsertContactInfo,
} from "./db";
import { storagePut } from "./storage";

// Admin guard middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ── Projects Router ──────────────────────────────────────────────────────────
const projectsRouter = router({
  list: publicProcedure.query(() => getProjects()),
  getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) =>
    getProjectById(input.id)
  ),
  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      techStack: z.string().optional(),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      imageUrl: z.string().optional(),
      featured: z.boolean().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => createProject(input)),
  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      techStack: z.string().optional(),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      imageUrl: z.string().optional(),
      featured: z.boolean().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateProject(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteProject(input.id)),
});

// ── Teaching Experiences Router ──────────────────────────────────────────────
const teachingRouter = router({
  list: publicProcedure.query(() => getTeachingExperiences()),
  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      organization: z.string().optional(),
      period: z.string().optional(),
      description: z.string().optional(),
      topics: z.string().optional(),
      targetAudience: z.string().optional(),
      achievements: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => createTeachingExperience(input)),
  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      organization: z.string().optional(),
      period: z.string().optional(),
      description: z.string().optional(),
      topics: z.string().optional(),
      targetAudience: z.string().optional(),
      achievements: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateTeachingExperience(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteTeachingExperience(input.id)),
});

// ── Gallery Router ───────────────────────────────────────────────────────────
const galleryRouter = router({
  list: publicProcedure.query(() => getGalleryImages()),
  create: adminProcedure
    .input(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().min(1),
      imageKey: z.string().optional(),
      category: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => createGalleryImage(input)),
  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      imageKey: z.string().optional(),
      category: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateGalleryImage(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteGalleryImage(input.id)),
  uploadImage: adminProcedure
    .input(z.object({
      fileName: z.string(),
      fileBase64: z.string(),
      mimeType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const buffer = Buffer.from(input.fileBase64, "base64");
      const key = `gallery/${Date.now()}-${input.fileName}`;
      const { url } = await storagePut(key, buffer, input.mimeType);
      return { url, key };
    }),
});

// ── Teaching Plans Router ────────────────────────────────────────────────────
const teachingPlansRouter = router({
  list: publicProcedure.query(() => getTeachingPlans()),
  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      subject: z.string().optional(),
      gradeLevel: z.string().optional(),
      duration: z.string().optional(),
      objectives: z.string().optional(),
      materials: z.string().optional(),
      activities: z.string().optional(),
      assessment: z.string().optional(),
      notes: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => createTeachingPlan(input)),
  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      subject: z.string().optional(),
      gradeLevel: z.string().optional(),
      duration: z.string().optional(),
      objectives: z.string().optional(),
      materials: z.string().optional(),
      activities: z.string().optional(),
      assessment: z.string().optional(),
      notes: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateTeachingPlan(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteTeachingPlan(input.id)),
});

// ── Live Demos Router ────────────────────────────────────────────────────────
const liveDemosRouter = router({
  list: publicProcedure.query(() => getLiveDemos()),
  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      demoUrl: z.string().optional(),
      embedUrl: z.string().optional(),
      techStack: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => createLiveDemo(input)),
  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      demoUrl: z.string().optional(),
      embedUrl: z.string().optional(),
      techStack: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateLiveDemo(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteLiveDemo(input.id)),
});

// ── Contact Router ───────────────────────────────────────────────────────────
const contactRouter = router({
  get: publicProcedure.query(() => getContactInfo()),
  update: adminProcedure
    .input(z.object({
      email: z.string().optional(),
      phone: z.string().optional(),
      linkedinUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      twitterUrl: z.string().optional(),
      websiteUrl: z.string().optional(),
      location: z.string().optional(),
    }))
    .mutation(({ input }) => upsertContactInfo(input)),
});

// ── App Router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  projects: projectsRouter,
  teaching: teachingRouter,
  gallery: galleryRouter,
  teachingPlans: teachingPlansRouter,
  liveDemos: liveDemosRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
