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

// Get all blogs
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();
    return blogs;
  },
});

// Get a single blog by ID
export const getById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
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
  handler: async (ctx, args) => {
    // Validate admin session
    const session = await validateAdminSession(ctx, args.sessionToken);
    const now = new Date().toISOString();
    
    // Generate slug from title
    const slug = args.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const { sessionToken, ...blogData } = args;
    const blogId = await ctx.db.insert("blogs", {
      ...blogData,
      slug,
      status: "published",
      featured: false,
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
      createdBy: session.userId,
    });
    
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Blog post '${args.title}' was created`,
      type: "success",
      userId: session.userId,
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
  handler: async (ctx, args) => {
    // Validate admin session
    const session = await validateAdminSession(ctx, args.sessionToken);
    const now = new Date().toISOString();
    
    // Generate slug from title
    const slug = args.title.toLowerCase()
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
      userId: session.userId,
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
  handler: async (ctx, args) => {
    // Validate admin session
    const session = await validateAdminSession(ctx, args.sessionToken);
    
    const blog = await ctx.db.get(args.id);
    await ctx.db.delete(args.id);
    
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Blog post '${blog?.title || 'Unknown'}' was deleted`,
      type: "warning",
      userId: session.userId,
      read: false,
      createdAt: new Date().toISOString()
    });
    return args.id;
  },
});
