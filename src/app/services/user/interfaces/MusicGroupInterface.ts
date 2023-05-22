import { Entrepreneur } from "./EntrepreneurInterface";

export interface MusicGroup extends Entrepreneur {
    integrants: number,
    musicalGenres: string[]
}