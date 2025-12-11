import { CountryLocalesMap } from './index';

async function main() {
    console.log('Loading data...');
    const start = Date.now();

    const countries = CountryLocalesMap.getAllCountries();
    console.log(`Loaded ${countries.length} countries in ${Date.now() - start}ms`);

    const us = CountryLocalesMap.getCountryByIso('US');
    console.log('US Data:', us?.name);

    if (us) {
        const states = CountryLocalesMap.getStatesOfCountry(us.id);
        console.log(`US has ${states.length} states.`);

        const ny = states.find(s => s.state_code === 'NY');
        if (ny) {
            console.log('Fetching cities for NY...');
            const citiesStart = Date.now();
            const cities = CountryLocalesMap.getCitiesOfState(ny.id);
            console.log(`NY has ${cities.length} cities (Fetched in ${Date.now() - citiesStart}ms)`);
            console.log('First 3 cities:', cities.slice(0, 3).map(c => c.name));
        }
    }
}

main().catch(console.error);
