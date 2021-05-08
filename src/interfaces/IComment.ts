import { Schema } from "mongoose";

export interface IComment {
    _id: Schema.Types.ObjectId;
    authorId: string;
    authorName: string;
    comment: string;
}

export interface ICommentCreateDTO {
    authorId: string;
    comment: string;
}

