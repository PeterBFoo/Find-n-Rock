import { env } from './env';

export const environment = {
    production: true,
    apiUrl: 'https://findnrock.tech/api/api',
    countriesUrl: env.COUNTRIES_SERVICE_API_HOST,
    apiKey: env.COUNTRIES_SERVICE_API_KEY
};
