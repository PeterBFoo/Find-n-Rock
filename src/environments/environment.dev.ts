import { env } from './env';

export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api',
    countriesUrl: env.COUNTRIES_SERVICE_API_HOST,
    apiKey: env.COUNTRIES_SERVICE_API_KEY
};
