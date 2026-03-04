import type {
  Emoji,
  Category,
  SearchOptions,
  RawEmoji,
  LocaleData,
  CategoryNames,
} from "./types";

// Data will be loaded lazily
let rawEmojis: RawEmoji[] | null = null;
let loadedLocales: Map<string, LocaleData> = new Map();
let categoryList: Category[] | null = null;
let categoryNames: CategoryNames | null = null;

/**
 * Load the main emoji dataset.
 * Called automatically on first use, but can be called manually for preloading.
 */
export function loadEmojis(): RawEmoji[] {
  if (!rawEmojis) {
    rawEmojis = require("../data/emojis.json");
  }
  return rawEmojis!;
}

/**
 * Load translations for a specific locale.
 * Returns true if locale was loaded successfully.
 */
export function loadLocale(locale: string): boolean {
  if (loadedLocales.has(locale)) return true;
  try {
    const data: LocaleData = require(`../data/i18n/${locale}.json`);
    loadedLocales.set(locale, data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Load category data.
 */
function loadCategories(): Category[] {
  if (!categoryList) {
    categoryList = require("../data/categories.json");
  }
  return categoryList!;
}

/**
 * Load category name translations.
 */
function loadCategoryNames(): CategoryNames {
  if (!categoryNames) {
    categoryNames = require("../data/category-names.json");
  }
  return categoryNames!;
}

/**
 * Resolve an emoji with locale data.
 */
function resolveEmoji(raw: RawEmoji, locale: string): Emoji {
  const localeData = loadedLocales.get(locale);
  const entry = localeData?.[raw.id];

  return {
    emoji: raw.e,
    unicode: raw.u,
    shortcode: raw.s,
    version: raw.v,
    category: raw.c,
    name: entry?.[0] ?? raw.s ?? "",
    keywords: entry?.[1] ?? "",
  };
}

/**
 * Search emojis by name or keywords.
 *
 * @example
 * ```ts
 * import { search } from 'emojigo'
 *
 * search('heart')           // English search
 * search('kalp', { locale: 'tr' })  // Turkish search
 * search('love', { category: 'smileys-emotion', limit: 10 })
 * ```
 */
export function search(query: string, options?: SearchOptions): Emoji[] {
  const locale = options?.locale ?? "en";
  const limit = options?.limit ?? 50;
  const category = options?.category;

  loadEmojis();
  loadLocale(locale);

  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: Emoji[] = [];

  for (const raw of rawEmojis!) {
    if (category && raw.c !== category) continue;

    const resolved = resolveEmoji(raw, locale);
    const nameMatch = resolved.name.toLowerCase().includes(q);
    const keywordMatch = resolved.keywords.toLowerCase().includes(q);
    const shortcodeMatch = raw.s?.toLowerCase().includes(q) ?? false;

    if (nameMatch || keywordMatch || shortcodeMatch) {
      results.push(resolved);
      if (results.length >= limit) break;
    }
  }

  return results;
}

/**
 * Get all emojis in a category.
 *
 * @example
 * ```ts
 * import { getByCategory } from 'emojigo'
 *
 * getByCategory('smileys-emotion')
 * getByCategory('food-drink', 'tr')
 * ```
 */
export function getByCategory(categorySlug: string, locale?: string): Emoji[] {
  const loc = locale ?? "en";
  loadEmojis();
  loadLocale(loc);

  return rawEmojis!
    .filter((raw) => raw.c === categorySlug)
    .map((raw) => resolveEmoji(raw, loc));
}

/**
 * Get a random emoji.
 *
 * @example
 * ```ts
 * import { random } from 'emojigo'
 *
 * random()       // Random emoji with English name
 * random('tr')   // Random emoji with Turkish name
 * ```
 */
export function random(locale?: string): Emoji {
  const loc = locale ?? "en";
  loadEmojis();
  loadLocale(loc);

  const idx = Math.floor(Math.random() * rawEmojis!.length);
  return resolveEmoji(rawEmojis![idx], loc);
}

/**
 * Get emoji info by character.
 *
 * @example
 * ```ts
 * import { getInfo } from 'emojigo'
 *
 * getInfo('😀')          // English info
 * getInfo('😀', 'tr')    // Turkish info
 * ```
 */
export function getInfo(emoji: string, locale?: string): Emoji | null {
  const loc = locale ?? "en";
  loadEmojis();
  loadLocale(loc);

  const raw = rawEmojis!.find((r) => r.e === emoji);
  if (!raw) return null;

  return resolveEmoji(raw, loc);
}

/**
 * Get all available categories.
 *
 * @example
 * ```ts
 * import { getCategories } from 'emojigo'
 *
 * getCategories()       // English category names
 * getCategories('tr')   // Turkish category names
 * ```
 */
export function getCategories(locale?: string): Category[] {
  const loc = locale ?? "en";
  const cats = loadCategories();
  const names = loadCategoryNames();

  return cats.map((cat) => ({
    ...cat,
    name: names[loc]?.[cat.slug] ?? names["en"]?.[cat.slug] ?? cat.slug,
  }));
}

/**
 * Get all emojis (optionally filtered by locale).
 *
 * @example
 * ```ts
 * import { getAll } from 'emojigo'
 *
 * getAll()       // All emojis with English names
 * getAll('de')   // All emojis with German names
 * ```
 */
export function getAll(locale?: string): Emoji[] {
  const loc = locale ?? "en";
  loadEmojis();
  loadLocale(loc);

  return rawEmojis!.map((raw) => resolveEmoji(raw, loc));
}

/**
 * List available locales.
 */
export const LOCALES = [
  "tr", "en", "de", "fr", "hi", "ar", "ru", "ur",
  "id", "vi", "th", "fa", "ha", "am", "sw", "bn",
  "my", "uz", "mr", "te", "jv", "ku", "fil",
] as const;

export type Locale = (typeof LOCALES)[number];

// Re-export types
export type { Emoji, Category, SearchOptions };
