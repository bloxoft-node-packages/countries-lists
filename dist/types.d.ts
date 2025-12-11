export interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}
export interface Translations {
    [key: string]: string;
}
export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: string;
    subregion: string;
    subregion_id: string;
    nationality: string;
    timezones: Timezone[];
    translations: Translations;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
}
export interface State {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    state_code: string;
    type: string | null;
    latitude: string;
    longitude: string;
}
export interface City {
    id: number;
    name: string;
    state_id: number;
    state_code: string;
    state_name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    latitude: string;
    longitude: string;
    wikiDataId?: string;
}
