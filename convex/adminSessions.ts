import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new admin session
export const createSession = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Generate a simple session token
    const sessionToken = `admin_${args.userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Deactivate any existing sessions for this user
    const existingSessions = await ctx.db
      .query("adminSessions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
    
    for (const session of existingSessions) {
      await ctx.db.patch(session._id, { isActive: false });
    }
    
    // Create new session
    const sessionId = await ctx.db.insert("adminSessions", {
      userId: args.userId,
      email: args.email,
      sessionToken,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      isActive: true,
    });
    
    return { sessionToken, sessionId };
  },
});

// Validate a session token (returns validation status only, doesn't modify)
export const validateSession = query({
  args: {
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", args.sessionToken))
      .first();
    
    if (!session || !session.isActive) {
      return { isValid: false, reason: "session_not_found" };
    }
    
    // Check if session is expired
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    
    if (now > expiresAt) {
      return { isValid: false, reason: "session_expired" };
    }
    
    // Check if user is still an admin
    const admin = await ctx.db
      .query("adminUsers")
      .filter((q) => q.eq(q.field("email"), session.email))
      .first();
    
    if (!admin || admin.status !== 'active') {
      return { isValid: false, reason: "user_not_admin" };
    }
    
    return {
      isValid: true,
      userId: session.userId,
      email: session.email,
    };
  },
});

// Invalidate a session (logout)
export const invalidateSession = mutation({
  args: {
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", args.sessionToken))
      .first();
    
    if (session) {
      await ctx.db.patch(session._id, { isActive: false });
    }
  },
});

// Clean up expired sessions (can be called periodically)
export const cleanupExpiredSessions = mutation({
  args: {},
  handler: async (ctx) => {
    const now = new Date().toISOString();
    const expiredSessions = await ctx.db
      .query("adminSessions")
      .filter((q) => q.lt(q.field("expiresAt"), now))
      .collect();
    
    for (const session of expiredSessions) {
      await ctx.db.patch(session._id, { isActive: false });
    }
    
    return { cleanedUp: expiredSessions.length };
  },
});