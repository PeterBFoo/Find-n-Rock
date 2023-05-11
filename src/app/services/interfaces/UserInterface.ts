import { Role } from "./RoleInterface";

export interface User {
    username: string,
    password: string,
    name: string,
    description: string,
    email: string,
    country: string,
    image: string,
    role: Role,
    address: string,
    phone: string,
    integrants: number | null,
    musicalGenres: null,
    id: number
}