import { Country, State, City } from './types';
export declare class CountryLocalesMap {
    static getAllCountries(): Country[];
    static getCountryByIso(iso2: string): Country | undefined;
    static getStatesOfCountry(countryId: number): State[];
    static getStateById(stateId: number): State | undefined;
    static getCitiesOfState(stateId: number): City[];
}
