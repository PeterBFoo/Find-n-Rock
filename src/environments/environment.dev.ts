import { env } from './env';

export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api',
    countriesUrl: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
    apiKey: env.COUNTRIES_SERVICE_API_KEY,
    apiHost: env.COUNTRIES_SERVICE_API_HOST
};
