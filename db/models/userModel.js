import connectDB from "../connect/connector";
import mongoose from "mongoose";
connectDB();

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    firebase_uid: {
      type: String,
      required: true
    }
});

export const USER = mongoose.models["users"] || mongoose.model("users",UserSchema);