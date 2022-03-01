import { CustomError } from "../../common/error";
import { IUser, IUserUpdateDTO } from "../../interfaces/IUser";
import { Comment, Ticket, User } from "../../models";

export default class UserService {
    
    public static async GetAllUsers(): Promise<IUser[]> {
        return User.find({});
    }
    
    public static async GetUserById(userId: string): Promise<IUser> {
        let user: IUser | null = await User.findById(userId);
        if(!user) throw new CustomError("User does not exist.", 400);
        return user;
    }
    
    public static async UpdateUser(userDTO: IUserUpdateDTO, userId: string): Promise<IUser|null> {
        /**
         * @todo add owner status check
        */
        let user: IUser | null = await Ticket.findById(userId);
        if (!user) {
            throw new CustomError("User does not exist.", 400);
        }
        user = await User.findByIdAndUpdate(userId, userDTO);
        //if(userDTO.firstname || userDTO.lastname)
        let authorName = `${user?.firstname} ${user?.lastname}`;
        await Ticket.updateMany({ authorId: userId }, { authorName });
        await Comment.updateMany({ authorId: userId }, { authorName });
        return user;
    }

    public static async DeleteUser(userId: string): Promise<IUser|null> {
        let user: IUser | null = await Ticket.findById(userId);
        if (!user) {
            throw new CustomError("User does not exist.", 400);
        }
        return await User.findByIdAndDelete(userId);
    }
}
