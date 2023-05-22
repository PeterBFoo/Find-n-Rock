import { Country } from "./CountryInterface";
import { Link } from "./LinkInterface";
import { Metadata } from "./MetadataInterface";

export interface CountriesData {
    data: Country[];
    links: Link[];
    metadata: Metadata;
}