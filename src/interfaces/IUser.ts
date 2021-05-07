export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserCreateDTO {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IUserLoginDTO {
    email: string;
    password: string;
}
