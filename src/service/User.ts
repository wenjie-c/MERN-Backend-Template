import User, { IUser } from "../models/user";
import mongoose from "mongoose";

async function createUser(data: Partial<IUser>) : Promise<IUser | null>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });

    return await user.save();
}

async function readUserById(id: string) : Promise<IUser |null> {
    return await User.findById(id);
}

async function readUserByEmail(theEmail: string) : Promise<IUser |null> {
    return await User.findOne({email: theEmail});
}

async function readUser(data: any) : Promise<IUser[] | []> {
    return await User.find(data);
}

async function readAllUsers() : Promise<IUser[] | []> {
    return await User.find();
}

async function updateUser(id:string, data: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data);
}

async function deleteUser(id: string) : Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
}

export default {createUser, readUserById, readUser, readUserByEmail, readAllUsers, updateUser, deleteUser};