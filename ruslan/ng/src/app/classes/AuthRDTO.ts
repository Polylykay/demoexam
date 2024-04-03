export class AuthRDTO {
    email: string = '';
    password: string = '';
    constructor(item?: AuthRDTO) {
        this.email = item?.email || ''
        this.password = item?.password  || ''
    }
}