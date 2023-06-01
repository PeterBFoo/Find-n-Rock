import { env } from './env';

export const environment = {
    production: true,
    apiUrl: 'https://findnrock.tech/api/api',
    countriesUrl: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
    apiKey: env.COUNTRIES_SERVICE_API_KEY || process.env['COUNTRIES_SERVICE_API_KEY'],
    apiHost: env.COUNTRIES_SERVICE_API_HOST || process.env['COUNTRIES_SERVICE_API_HOST']
};
