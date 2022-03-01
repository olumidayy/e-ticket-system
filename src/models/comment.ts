import { Schema, model } from 'mongoose';
import { IComment } from '../interfaces/IComment';

const Comment = new Schema<IComment>(
  {
    authorId: {
        type: Schema.Types.ObjectId,
        required: [true, "authorId is required."],
        ref: 'User'
    },
    
    ticketId: {
        type: Schema.Types.ObjectId,
        required: [true, "ticketId is required."],
        ref: 'Ticket'
    },

    authorName: {
        type: String,
        required: [true, "authorName is required."]
    },

    comment: {
        type: String,
        required: [true, "authorName is required."]
    }

  },
  { timestamps: true },
);

const commentSchema = model<IComment>('Comment', Comment);

export { commentSchema as Comment };
