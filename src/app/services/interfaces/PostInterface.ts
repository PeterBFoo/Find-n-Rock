import { MusicGenre } from "./MusicGenreInterface";
import { User } from "./UserInterface";

export interface Post {
    id: number;
    title: string;
    subtitle: string;
    body: string;
    date: Date;
    image: string;
    user: User;
    genres: MusicGenre[];
    suscriptions: User[];
    country: string;
    region: string;
    city: string;
    active: boolean;
}
