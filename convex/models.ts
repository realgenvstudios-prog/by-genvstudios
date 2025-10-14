import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Helper function to validate admin session
const validateAdminSession = async (ctx: any, sessionToken?: string) => {
  if (!sessionToken) {
    throw new Error("Session token required");
  }
  
  const validation = await ctx.runQuery(api.adminSessions.validateSession, { sessionToken });
  
  if (!validation?.isValid) {
    throw new Error("Invalid or expired admin session");
  }
  
  return validation;
};

// Get all models for the catalogue page
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const models = await ctx.db.query("models").collect();
    return models;
  },
});

// Get a single model by ID for the detail page
export const getById = query({
  args: { id: v.id("models") },
  handler: async (ctx, args) => {
    const model = await ctx.db.get(args.id);
    return model;
  },
});

// Create a new model (admin only)
export const create = mutation({
  args: {
    name: v.string(),
    age: v.number(),
    tagline: v.string(),
    mainImage: v.string(),
    categoryImages: v.object({
      casual: v.string(),
      formal: v.string(),
      sports: v.string(),
      evening: v.string(),
      commercial: v.string(),
    }),
    bio: v.string(),
    highlights: v.object({
      ageRange: v.string(),
      skinTone: v.string(),
      styleVibe: v.string(),
      height: v.string(),
      build: v.string(),
      ethnicity: v.string(),
      features: v.string()
    }),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate admin session
    const sessionToken = (args as any).sessionToken;
    const session = await validateAdminSession(ctx, sessionToken);
    
    const now = new Date().toISOString();
    const modelId = await ctx.db.insert("models", {
      name: args.name,
      age: args.age,
      tagline: args.tagline,
      mainImage: args.mainImage,
      categoryImages: args.categoryImages,
      bio: args.bio,
      highlights: args.highlights,
      status: "active",
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
    });
    
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Model '${args.name}' was created`,
      type: "success",
      userId: session.userId,
      read: false,
      createdAt: now
    });
    return modelId;
  }
});

// Update an existing model (admin only)
export const update = mutation({
  args: {
    id: v.id("models"),
    name: v.string(),
    age: v.number(),
    tagline: v.string(),
    mainImage: v.string(),
    categoryImages: v.object({
      casual: v.string(),
      formal: v.string(),
      sports: v.string(),
      evening: v.string(),
      commercial: v.string(),
    }),
    bio: v.string(),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("featured")),
    highlights: v.object({
      ageRange: v.string(),
      skinTone: v.string(),
      styleVibe: v.string(),
      height: v.string(),
      build: v.string(),
      ethnicity: v.string(),
      features: v.string()
    }),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate admin session
    const session = await validateAdminSession(ctx, args.sessionToken);
    
    const { id, sessionToken, ...updateData } = args;
    await ctx.db.patch(id, {
      ...updateData,
      updatedAt: new Date().toISOString(),
    });
    
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Model '${updateData.name}' was updated`,
      type: "info",
      userId: session.userId,
      read: false,
      createdAt: new Date().toISOString()
    });
  }
});

// Delete a model (admin only)
export const remove = mutation({
  args: { 
    id: v.id("models"),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate admin session
    const session = await validateAdminSession(ctx, args.sessionToken);
    
    const model = await ctx.db.get(args.id);
    await ctx.db.delete(args.id);
    
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Model '${model?.name || 'Unknown'}' was deleted`,
      type: "warning",
      userId: session.userId,
      read: false,
      createdAt: new Date().toISOString()
    });
  }
});