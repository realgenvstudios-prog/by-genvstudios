import { mutation } from "./_generated/server";
import { v } from "convex/values";

// One-time setup function to create the first admin user
// This bypasses normal authentication since we need a bootstrap admin
export const createFirstAdmin = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if any admin users already exist
    const existingAdmins = await ctx.db.query("adminUsers").collect();
    
    if (existingAdmins.length > 0) {
      throw new Error("Admin users already exist. Use the normal admin creation process.");
    }

    // Check if user with this email already exists
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    const now = new Date().toISOString();
    
    // Create the first super admin
    const adminId = await ctx.db.insert("adminUsers", {
      name: args.name,
      email: args.email,
      role: "super_admin",
      status: "active",
      createdAt: now,
      createdBy: "system", // Bootstrap admin
    });

    return {
      success: true,
      adminId,
      message: "First admin user created successfully!"
    };
  },
});

// Helper function to check if any admins exist
export const hasAdmins = mutation({
  handler: async (ctx) => {
    const admins = await ctx.db.query("adminUsers").collect();
    return admins.length > 0;
  },
});