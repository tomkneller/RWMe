export type UserAccount = {
    // id: number;
    name: string;
    // email: string;
    // phoneNo: number;
    password: string;
};

export type Route = {
    idroutes: number;
    routeName: string;
    lat: string;
    longi: string;
    routeDateTime: string;
    distance: number;
    pace: string;
    host_id: number;
    distFromUser: number;
    terrainType: string;
}

// Placeholder
export type Request = {
    id: number;
    routeName: string;
    usersname: string;
    date: string;
}