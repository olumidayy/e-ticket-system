import { Inject, Service } from "typedi";
import { ITicket, ITicketCreateDTO, ITicketUpdateDTO } from "../interfaces/ITicket";
import { CustomError } from "../common/error";
import { IUser, IUserCreateDTO, IUserUpdateDTO } from "../interfaces/IUser";

@Service()
export default class UserService {
    constructor(
        @Inject("userModel") private userModel: Models.UserModel,
        @Inject("commentModel") private commentModel: Models.UserModel,
        @Inject("ticketModel") private ticketModel: Models.UserModel,
    ) { }
    
    public async GetAllUsers(): Promise<IUser[]> {
        return this.userModel.find({});
    }
    
    public async GetUser(userId: string): Promise<IUser> {
        let user: IUser = await this.userModel.findById(userId);
        if(!user) throw new CustomError("User does not exist.", 400);
        return user;
    }
    
    public async UpdateUser(userDTO: IUserUpdateDTO, userId: string): Promise<IUser> {
        /**
         * @todo add owner status check
        */
        let user: IUser = await this.ticketModel.findById(userId);
        if (!user) {
            throw new CustomError("User does not exist.", 400);
        }
        user = await this.userModel.findByIdAndUpdate(userId, userDTO);
        //if(userDTO.firstname || userDTO.lastname)
        let authorName = `${user.firstname} ${user.lastname}`;
        await this.ticketModel.updateMany({ authorId: userId }, { authorName });
        await this.commentModel.updateMany({ authorId: userId }, { authorName });
        return user;
    }

    public async DeleteUser(userId: string): Promise<IUser> {
        let user: IUser = await this.ticketModel.findById(userId);
        if (!user) {
            throw new CustomError("User does not exist.", 400);
        }
        return await this.userModel.findByIdAndDelete(userId);
    }
}
