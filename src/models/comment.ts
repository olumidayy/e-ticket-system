import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
  {
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "authorId is required."],
        ref: 'User'
    },
    
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model('Comment', Comment);
