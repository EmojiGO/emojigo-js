<div align="center">

# 🚀 emojigo

**Multilingual emoji search library — 3,600+ emojis in 23 languages**

Fast, lightweight, zero dependencies.

[![npm version](https://img.shields.io/npm/v/emojigo.svg)](https://www.npmjs.com/package/emojigo)
[![license](https://img.shields.io/npm/l/emojigo.svg)](https://github.com/emojigo/emojigo-js/blob/main/LICENSE)

[Website](https://emojigo.io) · [npm](https://www.npmjs.com/package/emojigo) · [GitHub](https://github.com/emojigo/emojigo-js)

</div>

---

## Features

- 🌍 **23 languages** — Turkish, English, German, French, Hindi, Arabic, Russian, and 16 more
- ⚡ **Fast search** — Search by name, keywords, or shortcode in any language
- 📦 **Zero dependencies** — Lightweight and self-contained
- 🎯 **9 categories** — Smileys, People, Animals, Food, Travel, Activities, Objects, Symbols, Flags
- 🔤 **TypeScript** — Full type definitions included
- 🌳 **Tree-shakeable** — Import only what you need

## Install

```bash
npm install emojigo
```

## Quick Start

```js
import { search, getInfo, random, getCategories } from 'emojigo'

// Search in English (default)
search('heart')
// → [{ emoji: '❤️', name: 'Red Heart', ... }, { emoji: '💜', name: 'Purple Heart', ... }]

// Search in Turkish
search('kalp', { locale: 'tr' })
// → [{ emoji: '❤️', name: 'Kırmızı Kalp', ... }]

// Search in Arabic
search('قلب', { locale: 'ar' })
// → [{ emoji: '❤️', name: 'قلب أحمر', ... }]

// Get emoji info
getInfo('😀')
// → { emoji: '😀', name: 'Grinning Face', unicode: 'U+1F600', category: 'smileys-emotion', ... }

// Random emoji
random()
// → { emoji: '🎉', name: 'Party Popper', ... }

// List categories
getCategories('de')
// → [{ slug: 'smileys-emotion', icon: '😀', name: 'Smileys & Emotionen' }, ...]
```

## API

### `search(query, options?)`

Search emojis by name, keywords, or shortcode.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `locale` | `string` | `'en'` | Language for search |
| `category` | `string` | — | Filter by category slug |
| `limit` | `number` | `50` | Max results |

```js
// Filter by category
search('love', { category: 'smileys-emotion', limit: 10 })

// Search in Hindi
search('दिल', { locale: 'hi' })
```

### `getInfo(emoji, locale?)`

Get detailed info for a single emoji character.

```js
getInfo('🔥')       // English
getInfo('🔥', 'fr') // French
```

### `getByCategory(slug, locale?)`

Get all emojis in a category.

```js
getByCategory('food-drink')
getByCategory('animals-nature', 'tr')
```

### `getCategories(locale?)`

List all categories with localized names.

### `getAll(locale?)`

Get all 3,600+ emojis with localized names.

### `random(locale?)`

Get a random emoji.

### `loadLocale(locale)`

Preload a locale's translation data. Returns `true` if successful.

```js
loadLocale('tr') // Preload Turkish
```

## Supported Languages

| Code | Language | Code | Language |
|------|----------|------|----------|
| `en` | English | `ar` | العربية |
| `tr` | Türkçe | `ru` | Русский |
| `de` | Deutsch | `hi` | हिन्दी |
| `fr` | Français | `ur` | اردو |
| `id` | Indonesia | `vi` | Tiếng Việt |
| `th` | ไทย | `fa` | فارسی |
| `bn` | বাংলা | `sw` | Kiswahili |
| `my` | မြန်မာ | `ha` | Hausa |
| `uz` | Oʻzbek | `am` | አማርኛ |
| `mr` | मराठी | `te` | తెలుగు |
| `jv` | Jawa | `ku` | Kurdî |
| `fil` | Filipino | | |

## Categories

| Slug | Icon | Example |
|------|------|---------|
| `smileys-emotion` | 😀 | 😂 😍 🥺 😭 |
| `people-body` | 👋 | 👍 💪 🙏 🤷 |
| `animals-nature` | 🐶 | 🦁 🌸 🌊 🌈 |
| `food-drink` | 🍕 | 🍔 🍣 ☕ 🍰 |
| `travel-places` | ✈️ | 🚀 🏖️ 🗼 🌍 |
| `activities` | ⚽ | 🎮 🎨 🎵 🏆 |
| `objects` | 💡 | 📱 💻 📚 🔑 |
| `symbols` | ❤️ | ✅ ♻️ ⚡ ☮️ |
| `flags` | 🏳️ | 🚩 🏁 |

## Emoji Data

Emoji data is sourced from [Unicode CLDR](https://cldr.unicode.org/) and curated by the [Emojigo](https://emojigo.io) team. Names and keywords are available in 23 languages with native translations.

## License

MIT © [Emojigo](https://emojigo.io)

---

<div align="center">

**Data powered by [Emojigo.io](https://emojigo.io)** — The multilingual emoji encyclopedia 🚀

</div>
