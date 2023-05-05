export interface Post {
    id: number;
    title: string;
    subtitle: string;
    body: string;
    date: Date;
    image: string;
    postOwner: any;
    genres: any[];
    suscriptions: any[];
    country: string;
    region: string;
    city: string;
    active: boolean;
}
