import { Inject, Service } from "typedi";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { IUserCreateDTO, IUser } from "../interfaces/IUser";
import { CustomError } from "../common/error";
import config from "../config";

@Service()
export default class AuthService {
    constructor(@Inject("userModel") private userModel: Models.UserModel) { }

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

    private generateOTP(): number {
        return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    }

    public async SignUp(userDTO: IUserCreateDTO): Promise<object> {
        if (await this.userModel.findOne({ email: userDTO.email })) {
            throw new CustomError(
                "A user with that email already exists.",
                400
            );
        }
        let hashedPassword: string = await argon2.hash(userDTO.password);
        let otp = this.generateOTP();
        let userData = await this.userModel.create({
            ...userDTO,
            password: hashedPassword,
            otp
        });
        /**
         * @TODO Send welcome email
         */
        return this.tokenize(userData);
    }

    public async SignIn(userDTO: { email: string; password: string; }): Promise<object> {
        let user: IUser = await this.userModel.findOne({ email: userDTO.email });
        if (!user) throw new CustomError("This user does not exist.", 400);
        if (await argon2.verify(user.password, userDTO.password)) {
            return this.tokenize(user);
        }
        throw new CustomError("Invalid login credentials.", 400);
    }

    public async ChangePassword(userDTO: { email: string; otp: number; newPassword: string }): Promise<void> {
        let user = await this.userModel.findOne({ email: userDTO.email });
        if (!user) throw new CustomError("This user does not exist.", 400);
        if(userDTO.otp == user.otp) {
            let hashedPassword: string = await argon2.hash(userDTO.newPassword);
            user.password = hashedPassword;
            return await user.save();
        }
        throw new CustomError("Invalid OTP!", 400);
    }

    public async SendRecoveryEmail(email: string): Promise<void> {
        let user = await this.userModel.findOne({ email });
        if (!user) throw new CustomError("This user does not exist.", 400);
        /**
         * @TODO Send user's OTP to their email address with
         * whichever mailing service is adopted.
         */
    }
}
