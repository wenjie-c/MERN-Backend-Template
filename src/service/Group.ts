import Group, { IGroup } from "../models/group";
import mongoose from "mongoose";

async function createGroup(data: Partial<IGroup>) : Promise<IGroup | null>{
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });

    return await group.save();
}

async function createGroupQ(name: string, score = 0) : Promise<IGroup | null>{
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        score: score
    });

    return await group.save();
}

async function readGroupById(id: string) : Promise<IGroup |null> {
    return await Group.findById(id);
}

async function readGroup(data: any) : Promise<IGroup[] | []> {
    return await Group.find(data);
}

async function readAllGroups() : Promise<IGroup[] | []> {
    return await Group.find();
}

async function updateGroup(id:string, data: IGroup): Promise<IGroup | null> {
    return await Group.findByIdAndUpdate(id, data);
}

async function deleteGroup(id: string) : Promise<IGroup | null> {
    return await Group.findByIdAndDelete(id);
}

export default {createGroup,createGroupQ, readGroupById, readGroup, readAllGroups, updateGroup, deleteGroup};