export type UserAccount = {
    id: number;
    name: string;
    email: string;
    phoneNo: number;
};

export type Route = {
    id: number;
    name: string;
    lat: number;
    long: number;
    distance: number;
    pace: string;
    hostname: string;
}