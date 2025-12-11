import * as fs from 'fs';
import * as path from 'path';
import { Country, State, City } from './types';

// Cache structure
interface DataCache {
    countries: Country[] | null;
    states: State[] | null;
    cities: City[] | null;
}

const cache: DataCache = {
    countries: null,
    states: null,
    cities: null,
};

const DATA_DIR = path.join(__dirname, '../data');

/**
 * Optimized file reader using buffers.
 * @param filename 
 * @returns 
 */
function loadData<T>(filename: string): T[] {
    try {
        const filePath = path.join(DATA_DIR, filename);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Data file not found: ${filePath}`);
        }
        const buffer = fs.readFileSync(filePath);
        return JSON.parse(buffer.toString('utf-8')) as T[];
    } catch (error) {
        console.error(`Failed to load ${filename}:`, error);
        return [];
    }
}

export const DataLoader = {
    getCountries: (): Country[] => {
        if (!cache.countries) {
            cache.countries = loadData<Country>('countries.json');
        }
        return cache.countries!;
    },

    getStates: (): State[] => {
        if (!cache.states) {
            cache.states = loadData<State>('states.json');
        }
        return cache.states!;
    },

    getCities: (): City[] => {
        if (!cache.cities) {
            cache.cities = loadData<City>('cities.json');
        }
        return cache.cities!;
    },

    /**
     * Warm up all caches.
     */
    preloadAll: (): void => {
        DataLoader.getCountries();
        DataLoader.getStates();
        DataLoader.getCities();
    },

    /**
     * Clear memory.
     */
    clearCache: (): void => {
        cache.countries = null;
        cache.states = null;
        cache.cities = null;
    }
};
