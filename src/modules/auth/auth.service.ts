import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { IUserCreateDTO } from "../../interfaces/IUser";
import { CustomError } from "../../common/error";
import config from "../../config";
import { User } from "../../models";
import logger from "../../loaders/logger";

export default class AuthService {

    private static tokenize(userData: any): { user: object; token: string } {
        userData = userData.toObject();
        let token: string = jwt.sign(
            userData,
            config.jwtSecret!,
            { expiresIn: "2h" }
        );
        delete userData.password;
        return { user: userData, token };
    }

    private static generateOTP(): number {
        return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    }

    public static async SignUp(userDTO: IUserCreateDTO): Promise<object> {
        if (await User.findOne({ email: userDTO.email })) {
            throw new CustomError(
                "A user with that email already exists.",
                400
            );
        }
        let hashedPassword: string = await argon2.hash(userDTO.password);
        let otp = this.generateOTP();
        let userData = await User.create({
            ...userDTO,
            password: hashedPassword,
            otp
        });
        /**
         * @TODO Send welcome email
         */
        return this.tokenize(userData);
    }

    public static async SignIn(userDTO: { email: string; password: string; }): Promise<object> {
        let user: any = await User.findOne({ email: userDTO.email });
        if (!user) throw new CustomError("This user does not exist.", 400);
        if (await argon2.verify(user.password, userDTO.password)) {
            return this.tokenize(user);
        }
        throw new CustomError("Invalid login credentials.", 400);
    }

    public static async ChangePassword(userDTO: { email: string; otp: number; newPassword: string }): Promise<void> {
        let user = await User.findOne({ email: userDTO.email });
        if (!user) throw new CustomError("This user does not exist.", 400);
        if(userDTO.otp == user.otp) {
            let hashedPassword: string = await argon2.hash(userDTO.newPassword);
            user.password = hashedPassword;
            logger.debug("Password changed successfully.");
            return await user.save();
        }
        throw new CustomError("Invalid OTP!", 400);
    }

    public static async SendRecoveryEmail(email: string): Promise<void> {
        let user = await User.findOne({ email });
        if (!user) throw new CustomError("This user does not exist.", 400);
        /**
         * @TODO Send user's OTP to their email address with
         * whichever mailing service is adopted.
         */
    }
}
