import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  // Enhanced admin users with roles and permissions
  adminUsers: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("super_admin"), v.literal("content_manager"), v.literal("editor"), v.literal("viewer")),
    status: v.union(v.literal("active"), v.literal("inactive")),
    createdAt: v.string(),
    lastLogin: v.optional(v.string()),
    createdBy: v.string(), // ID of admin who created this user
  }).index("by_email", ["email"]),
  
  // Enhanced models with categorized images
  models: defineTable({
    name: v.string(),
    age: v.number(),
    tagline: v.string(),
    mainImage: v.string(), // Main profile image
    categoryImages: v.object({
      casual: v.string(),
      formal: v.string(),
      sports: v.string(),
      evening: v.string(),
      commercial: v.string()
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
      features: v.string(),
    }),
    createdAt: v.string(),
    updatedAt: v.string(),
    viewCount: v.optional(v.number()),
  }),
  settings: defineTable({
    siteName: v.string(),
    logoUrl: v.string(),
    contactEmail: v.string(),
    phoneNumber: v.string(),
    address: v.string(),
    updatedAt: v.string(),
  }),
  blogs: defineTable({
    title: v.string(),
    subtitle: v.string(),
    slug: v.optional(v.string()), // URL-friendly version of title
    date: v.string(),
    excerpt: v.string(),
    content: v.string(), // Rich HTML content from editor
    author: v.string(),
    imageUrl: v.string(),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    featured: v.optional(v.boolean()),
    viewCount: v.optional(v.number()),
    createdAt: v.string(),
    updatedAt: v.string(),
    createdBy: v.string(), // ID of admin who created the blog
  }).index("by_status", ["status"]).index("by_date", ["date"]),
  notifications: defineTable({
    message: v.string(),
    type: v.string(),
    createdAt: v.string(),
    read: v.boolean(),
    userId: v.string(),
  }),
  
  // Admin sessions for backend authentication
  adminSessions: defineTable({
    userId: v.string(), // Clerk user ID
    email: v.string(),
    sessionToken: v.string(),
    createdAt: v.string(),
    expiresAt: v.string(),
    isActive: v.boolean(),
  }).index("by_session_token", ["sessionToken"])
    .index("by_user_id", ["userId"]),
});
