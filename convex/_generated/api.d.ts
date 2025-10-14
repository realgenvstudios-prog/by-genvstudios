/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as adminSessions from "../adminSessions.js";
import type * as adminUsers from "../adminUsers.js";
import type * as blogs from "../blogs.js";
import type * as models from "../models.js";
import type * as notifications from "../notifications.js";
import type * as settings from "../settings.js";
import type * as setupAdmin from "../setupAdmin.js";
import type * as testModels from "../testModels.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  adminSessions: typeof adminSessions;
  adminUsers: typeof adminUsers;
  blogs: typeof blogs;
  models: typeof models;
  notifications: typeof notifications;
  settings: typeof settings;
  setupAdmin: typeof setupAdmin;
  testModels: typeof testModels;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
