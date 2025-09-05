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
import type * as experiences from "../experiences.js";
import type * as info from "../info.js";
import type * as languages from "../languages.js";
import type * as projects from "../projects.js";
import type * as skills from "../skills.js";
import type * as translations from "../translations.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  experiences: typeof experiences;
  info: typeof info;
  languages: typeof languages;
  projects: typeof projects;
  skills: typeof skills;
  translations: typeof translations;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
