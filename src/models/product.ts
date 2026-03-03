import { Schema, model, Types, Document}  from 'mongoose';

export interface IProduct{
    _id?:string;
    name: string;
    price: number;
    description: string;
};

const ProductSchema = new Schema<IProduct>({
    name:{
        type:String,
        unique:true,
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    description:String
});

export const ProductModel = model<IProduct>('product',ProductSchema);