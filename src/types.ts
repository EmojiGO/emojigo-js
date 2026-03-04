export interface Emoji {
  /** Emoji character (e.g. "😀") */
  emoji: string;
  /** Unicode codepoint (e.g. "U+1F600") */
  unicode: string;
  /** Short name / alias (e.g. "grinning") */
  shortcode: string | null;
  /** Unicode version (e.g. "15.1") */
  version: string | null;
  /** Category slug (e.g. "smileys-emotion") */
  category: string;
  /** Localized name */
  name: string;
  /** Comma-separated keywords */
  keywords: string;
}

export interface Category {
  /** Category slug */
  slug: string;
  /** Category icon emoji */
  icon: string;
  /** Localized name (if locale loaded) */
  name?: string;
}

export interface SearchOptions {
  /** Locale for search (default: "en") */
  locale?: string;
  /** Filter by category slug */
  category?: string;
  /** Max results (default: 50) */
  limit?: number;
}

export interface RawEmoji {
  id: number;
  e: string;
  u: string;
  s: string | null;
  v: string | null;
  c: string;
}

export type LocaleData = Record<number, [string, string]>;
export type CategoryNames = Record<string, Record<string, string>>;
