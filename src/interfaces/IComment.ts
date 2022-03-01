import { Schema, Document } from "mongoose";

export interface IComment extends Document {
    _id: Schema.Types.ObjectId;
    authorId: Schema.Types.ObjectId;
    ticketId: Schema.Types.ObjectId;
    authorName?: string;
    comment: string;
}

export interface ICommentCreateDTO {
    authorId: string;
    comment: string;
}

