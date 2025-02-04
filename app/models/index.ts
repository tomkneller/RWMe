export type UserAccount = {
    id: number;
    name: string;
    email: string;
    phoneNo: number;
};

export type Route = {
    idroutes: number;
    routeName: string;
    lat: number;
    long: number;
    distance: number;
    pace: string;
    hostName: string;
}