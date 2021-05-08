import mongoose from 'mongoose';

const Ticket = new mongoose.Schema(
  {
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "authorId is required."]
    },

    authorName: {
        type: String,
        required: [true, "authorName is required."]
    },

    title: {
        type: String,
        required: [true, "title is required."]
    },

    description: {
        type: String
    },

    comments: {
      type: [ String ]
    },

    isClosed: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true },
);

export default mongoose.model('Ticket', Ticket);
