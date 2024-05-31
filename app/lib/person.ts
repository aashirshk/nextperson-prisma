import { Dayjs } from "dayjs";

export interface Person {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    date_of_birth: Dayjs | null
}

export interface PersonResponse {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    date_of_birth: string
}