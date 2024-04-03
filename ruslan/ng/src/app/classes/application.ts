import { UserDTO } from "./user";

export class ApplicationDTO{
    id: number | null;
    status: string | null;
    bookingDate: string | null;
    carId: number | null;
    carName: string | null;
    constructor(item?: ApplicationDTO) {
        this.id = item?.id || null
        this.status = item?.status  || null
        this.bookingDate = item?.bookingDate  || null
        this.carId = item?.carId  || null
        this.carName = item?.carName  || null
    }
}
export class ApplicationRDTO{
    id: number | null;
    status: string | null;
    bookingDate: string | null;
    carId: number | null;
    constructor(item?: ApplicationDTO) {
        this.id = item?.id || null
        this.status = item?.status  || null
        this.bookingDate = item?.bookingDate  || null
        this.carId = item?.carId  || null
    }
}