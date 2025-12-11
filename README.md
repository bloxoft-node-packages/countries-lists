# Countries Lists

> Optimized, lightning-fast country, state, and city map for Node.js.

[![npm version](https://img.shields.io/npm/v/countries-lists.svg)](https://www.npmjs.com/package/countries-lists)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`countries-lists` is a comprehensive library providing high-performance access to world countries, states, and cities data. Designed for speed, it uses intelligent caching and lazy-loading strategies to ensure your application remains fast, even when handling large datasets.

## Features

- 🚀 **Lightning Fast**: Optimized data loading with fs buffers.
- 📉 **Low Memory Footprint**: Cities are lazy-loaded only when requested.
- 📦 **Zero Dependencies**: Pure data and logic.
- 📘 **TypeScript Ready**: Full type definitions included.
- 🌍 **Comprehensive Data**: Includes countries, states, and cities with rich metadata (currencies, timezones, lat/long, etc.).
- 🔍 **O(1) Lookups**: Indexed access for countries and states.

## Installation

```bash
npm install countries-lists
# or
pnpm add countries-lists
# or
yarn add countries-lists
```

## Usage

### Basic Usage

```typescript
import { CountryLocalesMap } from 'countries-lists';

// Get all countries (O(N) - cached after first call)
const countries = CountryLocalesMap.getAllCountries();
console.log(countries.length); // 250

// Get a specific country by ISO2 code (O(1))
const us = CountryLocalesMap.getCountryByIso('US');
console.log(us.name); // "United States"
console.log(us.emoji); // "🇺🇸"

// Get States (O(1) lookup)
const states = CountryLocalesMap.getStatesOfCountry(us.id);
console.log(states.length); // 66 (includes territories)

// Get Cities (Lazy loaded on first request)
const ny = states.find(s => s.state_code === 'NY');
if (ny) {
  const cities = CountryLocalesMap.getCitiesOfState(ny.id);
  console.log(cities.length); // 1000+
}
```

## API Reference

### `CountryLocalesMap`

#### `getAllCountries(): Country[]`
Returns an array of all available countries.

#### `getCountryByIso(iso2: string): Country | undefined`
Returns a country object matching the provided ISO2 code (case-insensitive).

#### `getStatesOfCountry(countryId: number): State[]`
Returns all states belonging to a specific country ID.

#### `getCitiesOfState(stateId: number): City[]`
Returns all cities belonging to a specific state ID. Warning: This method triggers the loading of the cities dataset if it hasn't been loaded yet.

## Data Types

### Country
```typescript
interface Country {
  id: number;
  name: string;
  iso2: string; // e.g., "US"
  iso3: string; // e.g., "USA"
  numeric_code: string;
  phone_code: string; // e.g., "1"
  capital: string;
  currency: string; // e.g., "USD"
  currency_symbol: string; // e.g., "$"
  tld: string; // e.g., ".us"
  region: string;
  subregion: string;
  timezones: Timezone[];
  latitude: string;
  longitude: string;
  emoji: string;
  // ...and more
}
```

## Performance

This package is designed with performance in mind:
1. **Countries & States**: Indexed in memory upon first access.
2. **Cities**: The largest dataset (~35MB) is **not** loaded until you explicitely call `getCitiesOfState`. This allows your service to start up instantly if you only need country/state level data.

## License

MIT © [Bloxoft](https://github.com/bloxoft)
