import { IComment, ICommentCreateDTO } from "../../../interfaces/IComment";
import { CustomError } from "../../../common/error";
import { User, Comment } from "../../../models";

export default class CommentService {
    
    public static async GetCommentById(commentId: string): Promise<IComment> {
        let comment = await Comment.findById(commentId);
        if (!comment) {
            throw new CustomError("That comment does not exist.", 400);
        }
        return comment;
    }

    public static async GetCommentsByTicketId(ticketId: string): Promise<IComment[]> {
        return await Comment.find({ ticketId });
    }
    
    public static async GetAllComments(): Promise<IComment[]> {
        return await Comment.find({});
    }

    public static async AddComment(commentDTO: ICommentCreateDTO): Promise<IComment> {
        let user: any = await User.findById(commentDTO.authorId);
        if(!user) throw new CustomError("User does not exist.", 400);
        let authorName = `${user.firstname} ${user.lastname}`;
        let newComment: IComment = await Comment.create({
            ...commentDTO,
            authorName
        });
        return newComment;
    }

    public static async UpdateComment(comment: string, commentId: string): Promise<any> {
        /**
         * @todo add owner status check
        */
        let commentToUpdate = await Comment.findById(commentId);
        if (!commentToUpdate) {
            throw new CustomError("Comment does not exist.", 400);
        }
        let updatedComment = await Comment.findByIdAndUpdate(commentId, { comment });
        return updatedComment;
    }

    public static async DeleteComment(commentId: string): Promise<any> {
        /**
         * @todo add admin status check
        */
        let comment = await Comment.findById(commentId);
        if(!comment) throw new CustomError("Ticket does not exist.", 400);
        comment  = await Comment.findByIdAndDelete(commentId);
        return comment;
    }
}
