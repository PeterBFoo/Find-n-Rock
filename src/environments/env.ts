import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

export const env = {
    COUNTRIES_SERVICE_API_KEY: process.env["COUNTRIES_SERVICE_API_KEY"],
    COUNTRIES_SERVICE_API_HOST: process.env["COUNTRIES_SERVICE_API_HOST"]
}