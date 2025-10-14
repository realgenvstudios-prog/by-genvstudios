import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Helper function to validate admin session
type AdminSessionValidation = { isValid: boolean; reason?: string; userId?: string };
const validateAdminSession = async (
  ctx: any,
  sessionToken?: string
): Promise<AdminSessionValidation> => {
  if (!sessionToken) {
    throw new Error("Session token required");
  }
  const validation: AdminSessionValidation = await ctx.runQuery(api.adminSessions.validateSession, { sessionToken });
  if (!validation?.isValid) {
    throw new Error("Invalid or expired admin session");
  }
  if (!validation.userId) {
    throw new Error("Session validation did not return a userId");
  }
  return validation;
};

// Get all blogs
export const getAll = query({
  args: {},
  handler: async (ctx): Promise<any[]> => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();
    return blogs;
  },
});

// Get a single blog by ID
export const getById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args): Promise<any> => {
    return await ctx.db.get(args.id);
  },
});

// Create a new blog post
export const create = mutation({
  args: {
    title: v.string(),
    subtitle: v.string(),
    date: v.string(),
    excerpt: v.string(),
    content: v.string(),
    author: v.string(),
    imageUrl: v.string(),
    sessionToken: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    // Validate admin session
    const session: AdminSessionValidation = await validateAdminSession(ctx, args.sessionToken);
    const now = new Date().toISOString();
    // Generate slug from title
    const slug: string = args.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const { sessionToken, ...blogData } = args;
    const blogId: string = await ctx.db.insert("blogs", {
      ...blogData,
      slug,
      status: "published",
      featured: false,
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
      createdBy: session.userId!,
    });
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Blog post '${args.title}' was created`,
      type: "success",
      userId: session.userId!,
      read: false,
      createdAt: now
    });
    return blogId;
  },
});

// Update a blog post
export const update = mutation({
  args: {
    id: v.id("blogs"),
    title: v.string(),
    subtitle: v.string(),
    date: v.string(),
    excerpt: v.string(),
    content: v.string(),
    author: v.string(),
    imageUrl: v.string(),
    sessionToken: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    // Validate admin session
    const session: AdminSessionValidation = await validateAdminSession(ctx, args.sessionToken);
    const now = new Date().toISOString();
    // Generate slug from title
    const slug: string = args.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const { sessionToken, ...updateData } = args;
    await ctx.db.patch(args.id, {
      ...updateData,
      slug,
      updatedAt: now,
    });
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Blog post '${args.title}' was updated`,
      type: "info",
      userId: session.userId!,
      read: false,
      createdAt: now
    });
    return args.id;
  },
});

// Delete a blog post
export const remove = mutation({
  args: { 
    id: v.id("blogs"),
    sessionToken: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    // Validate admin session
    const session: AdminSessionValidation = await validateAdminSession(ctx, args.sessionToken);
    const blog: any = await ctx.db.get(args.id);
    await ctx.db.delete(args.id);
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Blog post '${blog?.title || 'Unknown'}' was deleted`,
      type: "warning",
      userId: session.userId!,
      read: false,
      createdAt: new Date().toISOString()
    });
    return args.id;
  },
});
