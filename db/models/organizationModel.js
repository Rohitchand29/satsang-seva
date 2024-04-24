import connectDB from "../connect/connector";
import mongoose from "mongoose";
connectDB();

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [
        {
          type: String,
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    removedBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    },
});

export const Notes = mongoose.models["Notes"] || mongoose.model("Notes",NoteSchema);