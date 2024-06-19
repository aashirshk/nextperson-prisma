import { Dayjs } from "dayjs";

export interface Person {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    date_of_birth: Date // Change the type to Date.
}

// export interface PersonResponse {
//     id: number;
//     firstname: string;
//     lastname: string;
//     phone: string;
//     date_of_birth: string
// }