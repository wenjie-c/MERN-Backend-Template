import Joi, {ObjectSchema} from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IProduct } from '../models/product';
import { IUser } from '../models/user';
import { IGroup } from '../models/group';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        }
        catch(error){
            Logging.error(error);
            return res.status(422).json({error});
        }
    }
}

export const Schemas = {
    product: {
        create: Joi.object<IProduct>({
            name: Joi.string().required(),
            description: Joi.string(),
            price: Joi.number().required(),
        }),

        update: Joi.object<IProduct>({
            name: Joi.string().optional(),
            description: Joi.string(),
            price: Joi.number().optional(),
        }),
    },
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            group: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
            role: Joi.string().valid('user','admin').required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().optional(),
            group: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
            role: Joi.string().valid('user','admin').optional()
        })
    },
    group: {
        create: Joi.object<IGroup>({
            name: Joi.string().required(),
            score: Joi.number().required()
        }),
        update: Joi.object<IGroup>({
            name: Joi.string().optional(),
            score: Joi.number().optional()
        })
    }
}