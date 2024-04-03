export class UserDTO {
    id: number| null;
    email: string | null;
    password: string | null;
    fio: string | null;
    phoneNumber: string | null;
    email: string| null;
    constructor(item?: UserDTO) {
        this.id = item?.id || null
        this.email = item?.email || null
        this.password = item?.password  || null
        this.fio = item?.fio || null
        this.phoneNumber = item?.phoneNumber || null
        this.email = item?.email || null
    }
}

export class RegisterRDTO {
    email: string = '';
    password: string = '';
    fio: string = '';
    phoneNumber: string = '';
    email: string = '';
    constructor(item?: RegisterRDTO) {
        this.email = item?.email || ''
        this.password = item?.password  || ''
        this.fio = item?.fio || ''
        this.phoneNumber = item?.phoneNumber || ''
        this.email = item?.email || ''
    }
}