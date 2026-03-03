import Joi, {ObjectSchema} from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IProduct } from '../models/product';

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
            name: Joi.string().required(),
            description: Joi.string(),
            price: Joi.number().required(),
        }),
    }
}