export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    otp: number;
}

export interface IUserCreateDTO {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IUserUpdateDTO {
    firstname?: string;
    lastname?: string;
}

