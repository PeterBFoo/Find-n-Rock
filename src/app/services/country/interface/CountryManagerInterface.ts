import { City } from "src/app/shared/countries/interfaces/CitiesInterface";
import { Country } from "src/app/shared/countries/interfaces/CountryInterface";
import { Region } from "src/app/shared/countries/interfaces/RegionsInterface";

export interface CountryManagerInterface {
    selectedCountry: string;
    selectedCountryCode: string;
    selectedRegion: string;
    selectedCity: string;
    countryData: string;
    regionData: string;
    regionsLoaded: boolean;
    citiesLoaded: boolean;
    countries: Country[];
    regions: Region[];
    cities: City[];
}