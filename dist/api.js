"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryLocalesMap = void 0;
const loader_1 = require("./loader");
// Indices for O(1) lookups
const Indices = {
    countriesByIso2: new Map(),
    countriesById: new Map(),
    statesByCountryId: new Map(),
    statesById: new Map(),
    citiesByStateId: new Map(),
    initialized: false,
};
function ensureIndices() {
    if (Indices.initialized)
        return;
    const countries = loader_1.DataLoader.getCountries();
    for (const c of countries) {
        Indices.countriesByIso2.set(c.iso2, c);
        Indices.countriesById.set(c.id, c);
    }
    // Lazy indexing for states/cities?
    // If we want "lightning fast", we should index.
    // But strictly, indexing EVERYTHING might take memory/time on startup.
    // However, iterating once is better than filtering every time.
    const states = loader_1.DataLoader.getStates();
    for (const s of states) {
        if (!Indices.statesByCountryId.has(s.country_id)) {
            Indices.statesByCountryId.set(s.country_id, []);
        }
        Indices.statesByCountryId.get(s.country_id).push(s);
        Indices.statesById.set(s.id, s);
    }
    // Cities might be too large to eager-load for some use cases?
    // Let's lazy load cities index on first City request?
    // For now, let's keep it simple and consistent. 
    // If user calls getCities, we load cities.
    Indices.initialized = true;
}
function ensureCityIndices() {
    // Separate ensure because loading cities is expensive
    if (Indices.citiesByStateId.size > 0)
        return; // already done
    const cities = loader_1.DataLoader.getCities();
    for (const c of cities) {
        if (!Indices.citiesByStateId.has(c.state_id)) {
            Indices.citiesByStateId.set(c.state_id, []);
        }
        Indices.citiesByStateId.get(c.state_id).push(c);
    }
}
class CountryLocalesMap {
    static getAllCountries() {
        ensureIndices();
        return loader_1.DataLoader.getCountries().map(c => ({
            ...c,
        }));
    }
    static getCountryByIso(iso2) {
        ensureIndices();
        const c = Indices.countriesByIso2.get(iso2.toUpperCase());
        if (c) {
            return { ...c, };
        }
        return undefined;
    }
    static getStatesOfCountry(countryId) {
        ensureIndices();
        return Indices.statesByCountryId.get(countryId) || [];
    }
    static getStateById(stateId) {
        ensureIndices();
        return Indices.statesById.get(stateId);
    }
    static getCitiesOfState(stateId) {
        ensureIndices();
        ensureCityIndices();
        return Indices.citiesByStateId.get(stateId) || [];
    }
}
exports.CountryLocalesMap = CountryLocalesMap;
