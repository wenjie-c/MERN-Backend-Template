import { NextFunction, Request, Response } from "express";
import cnx from "../connection";
import { IProduct, ProductModel } from "../models/product";
import mongoose from "mongoose";
import Logging from "../library/Logging";

const createProduct = (req: Request, res: Response, next: NextFunction) => {
  //const input : IProduct = req.body.product;

  const output = new ProductModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  Logging.info(`Saving the product: ${output}`);
  return output
    .save()
    .then((product) => res.status(201).json({ product }))
    .catch((error) => {
      Logging.error(error);
      res.status(500).json({ error });
    });
};

const readAllProducts = (req: Request, res: Response, next: NextFunction) => {
  Logging.log("Reading all products...");
  return ProductModel.find()
  .select('-__v') // excluye este campo
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(500).json({ error });
    });
};

const readProduct = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;
  return ProductModel.findById(productId).select('-__v')
    .then( product => product ? res.status(200).json({product}) :
  res.status(404).json({message: 'Not found'}))
    .catch(error => res.status(500).json({error}));
}

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;
  let newProduct : IProduct = {name: req.body.name, price: req.body.price, description: req.body.description};
  return ProductModel.findByIdAndUpdate(productId, newProduct).select('-__v')
    .then( product =>  product ? res.status(200).json({product}) :
        res.status(404).json({message: 'Not found'}))
    .catch(error => res.status(500).json({error}));
}

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;
  return ProductModel.findByIdAndDelete(productId)
    .then((product) => product ? res.status(200).json({message : 'The product has been successfully deleted'}) : 
  res.status(404).json({message: 'Not found'}))
    .catch(error => res.status(500).json({error}));
}

export default { createProduct , readAllProducts, readProduct, updateProduct, deleteProduct};
