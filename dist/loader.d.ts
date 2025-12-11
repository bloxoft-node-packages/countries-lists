import { Country, State, City } from './types';
export declare const DataLoader: {
    getCountries: () => Country[];
    getStates: () => State[];
    getCities: () => City[];
    /**
     * Warm up all caches.
     */
    preloadAll: () => void;
    /**
     * Clear memory.
     */
    clearCache: () => void;
};
