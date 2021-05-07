import { Inject, Service } from "typedi";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { IUserCreateDTO, IUserLoginDTO, IUser } from "../interfaces/IUser";
import { CustomError } from "../common/error";
import config from "../config";

@Service()
export default class AuthService {
    constructor(@Inject("userModel") private model: Models.UserModel) { }

    private tokenize(userData: any): { user: object; token: string } {
        userData = userData.toObject();
        let token: string = jwt.sign(
            userData,
            config.jwtSecret!,
            { expiresIn: "2h" }
        );
        delete userData.password;
        return { user: userData, token };
    }

    public async signUp(userDTO: IUserCreateDTO): Promise<any> {
        if (await this.model.findOne({ email: userDTO.email })) {
            throw new CustomError(
                "A user with that email already exists.",
                400
            );
        }
        let hashedPassword: string = await argon2.hash(userDTO.password);
        let userData = await this.model.create({
            ...userDTO,
            password: hashedPassword,
        });
        return this.tokenize(userData);
    }

    public async signIn(userDTO: IUserLoginDTO) {
        let user: IUser = await this.model.findOne({ email: userDTO.email });
        if (!user) {
            throw new CustomError("This user does not exist.", 400);
        }
        if (await argon2.verify(user.password, userDTO.password)) {
            return this.tokenize(user);
        }
    }
}
