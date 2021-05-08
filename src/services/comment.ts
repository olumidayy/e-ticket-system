import { Inject, Service } from "typedi";
import { IComment, ICommentCreateDTO } from "../interfaces/IComment";
import { CustomError } from "../common/error";
import { IUser } from "../interfaces/IUser";

@Service()
export default class CommentService {
    constructor(
        @Inject("userModel") private userModel: Models.UserModel,
        @Inject("commentModel") private commentModel: Models.CommentModel
    ) { }
    
    public async GetComment(commentId: string): Promise<IComment> {
        let comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new CustomError("That comment does not exist.", 400);
        }
        return comment;
    }
    
    public async GetAllComments(): Promise<IComment[]> {
        return await this.commentModel.find({});
    }

    public async AddComment(commentDTO: ICommentCreateDTO): Promise<IComment> {
        let user: IUser = await this.userModel.findById(commentDTO.authorId);
        if(!user) throw new CustomError("User does not exist.", 400);
        let authorName = `${user.firstname} ${user.lastname}`;
        let newTicket: IComment = await this.commentModel.create({
            ...commentDTO,
            authorName
        });
        return newTicket;
    }

    public async UpdateCommentt(comment: string, commentId: string): Promise<any> {
        /**
         * @todo add owner status check
        */
        let commentToUpdate = await this.commentModel.findById(commentId);
        if (!commentToUpdate) {
            throw new CustomError("Comment does not exist.", 400);
        }
        let updatedComment = await this.commentModel.findByIdAndUpdate(commentId, { comment });
        return updatedComment;
    }

    public async DeleteComment(commentId: string): Promise<any> {
        /**
         * @todo add admin status check
        */
        let comment = await this.commentModel.findById(commentId);
        if(!comment) throw new CustomError("Ticket does not exist.", 400);
        comment  = await this.commentModel.findByIdAndDelete(commentId);
        return comment;
    }
}
