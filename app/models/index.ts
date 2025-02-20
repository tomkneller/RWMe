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
    hostName: string;
    distFromUser: number;
}