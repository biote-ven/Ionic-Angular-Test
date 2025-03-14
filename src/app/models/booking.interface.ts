import { IUser } from "./user.interface";

export interface IBooking {
    id: number;
    service_id: number;
    staff_id: number;
    user_id: number;
    date: string;
    start_time: string;
    end_time: string;
    user: IUser;
}