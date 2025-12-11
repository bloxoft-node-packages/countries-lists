import { DataLoader } from './loader';
import { Country, State, City } from './types';

// Indices for O(1) lookups
const Indices = {
    countriesByIso2: new Map<string, Country>(),
    countriesById: new Map<number, Country>(),
    statesByCountryId: new Map<number, State[]>(),
    statesById: new Map<number, State>(),
    citiesByStateId: new Map<number, City[]>(),
    initialized: false,
};

function ensureIndices() {
    if (Indices.initialized) return;

    const countries = DataLoader.getCountries();
    for (const c of countries) {
        Indices.countriesByIso2.set(c.iso2, c);
        Indices.countriesById.set(c.id, c);
    }

    // Lazy indexing for states/cities?
    // If we want "lightning fast", we should index.
    // But strictly, indexing EVERYTHING might take memory/time on startup.
    // However, iterating once is better than filtering every time.
    const states = DataLoader.getStates();
    for (const s of states) {
        if (!Indices.statesByCountryId.has(s.country_id)) {
            Indices.statesByCountryId.set(s.country_id, []);
        }
        Indices.statesByCountryId.get(s.country_id)!.push(s);
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
    if (Indices.citiesByStateId.size > 0) return; // already done

    const cities = DataLoader.getCities();
    for (const c of cities) {
        if (!Indices.citiesByStateId.has(c.state_id)) {
            Indices.citiesByStateId.set(c.state_id, []);
        }
        Indices.citiesByStateId.get(c.state_id)!.push(c);
    }
}

export class CountryLocalesMap {
    static getAllCountries(): Country[] {
        ensureIndices();
        return DataLoader.getCountries().map(c => ({
            ...c,
        }));
    }

    static getCountryByIso(iso2: string): Country | undefined {
        ensureIndices();
        const c = Indices.countriesByIso2.get(iso2.toUpperCase());
        if (c) {
            return { ...c, };
        }
        return undefined;
    }

    static getStatesOfCountry(countryId: number): State[] {
        ensureIndices();
        return Indices.statesByCountryId.get(countryId) || [];
    }

    static getStateById(stateId: number): State | undefined {
        ensureIndices();
        return Indices.statesById.get(stateId);
    }

    static getCitiesOfState(stateId: number): City[] {
        ensureIndices();
        ensureCityIndices();
        return Indices.citiesByStateId.get(stateId) || [];
    }
}
