import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

// Helper function to validate admin session
const validateAdminSession = async (ctx: any, sessionToken?: string): Promise<{isValid: boolean, userId: string, email: string}> => {
  if (!sessionToken) {
    throw new Error("Session token required");
  }
  
  const validation: any = await ctx.runQuery(api.adminSessions.validateSession, { sessionToken });
  
  if (!validation?.isValid) {
    throw new Error("Invalid or expired admin session");
  }
  
  return validation;
};

// Get all admin users
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("adminUsers").collect();
  },
});

// Get admin user by email
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Create new admin user
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("super_admin"), v.literal("content_manager"), v.literal("editor"), v.literal("viewer")),
    createdBy: v.string(),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate admin session
    const session = await validateAdminSession(ctx, args.sessionToken);
    
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    const now = new Date().toISOString();
    
    return await ctx.db.insert("adminUsers", {
      name: args.name,
      email: args.email,
      role: args.role,
      status: "active",
      createdAt: now,
      createdBy: session.userId,
    });
  },
});

// Update admin user
export const update = mutation({
  args: {
    id: v.id("adminUsers"),
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("super_admin"), v.literal("content_manager"), v.literal("editor"), v.literal("viewer")),
    status: v.union(v.literal("active"), v.literal("inactive")),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate admin session
    await validateAdminSession(ctx, args.sessionToken);
    
    const { id, sessionToken, ...updateData } = args;
    
    return await ctx.db.patch(id, updateData);
  },
});

// Delete admin user
export const remove = mutation({
  args: { 
    id: v.id("adminUsers"),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate admin session
    await validateAdminSession(ctx, args.sessionToken);
    
    return await ctx.db.delete(args.id);
  },
});

// Update last login
export const updateLastLogin = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        lastLogin: new Date().toISOString(),
      });
    }
  },
});