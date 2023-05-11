export interface Role {
    name: string,
    canManagePosts: boolean,
    canSubscribe: boolean,
    canCreateRolesAndGenres: boolean,
    id: number
}