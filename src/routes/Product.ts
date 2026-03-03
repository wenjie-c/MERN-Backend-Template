import express, { Router } from "express";
import controller from "../controllers/Products";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import { Schema } from "mongoose";

const router = express.Router();

/**
 * @swagger
 * /v1/hello:
 *   get:
 *     summary: Example.
 *     description: Example get request.
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello world!
 */
router.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" }).status(200);
});

/**
 * @swagger
 * /v1/product:
 *   get:
 *     summary: Retrieve all available products.
 *     description: Retrieve all available products.
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      name:
 *                          type: string
 *                          example: A toothbrush
 *                      description:
 *                          type: string
 *                          example: An affordable toothbrush
 *                      price:
 *                          type: number
 *                          example: 0.99
 *       500:
 *          description: Server's controller error.
 */
router.get("/product", controller.readAllProducts);

/**
 * @swagger
 * /v1/product/{id}:
 *  get:
 *    summary: Read a specific a product
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Product's id.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: the product with this id.
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The product's uuid.
 *                name:
 *                  type: string
 *                  description: Product's name.
 *                  example: A toothbrush
 *                description:
 *                  type: string
 *                  description: Product's description.
 *                  example: An affordable toothbrush.
 *                price:
 *                  type: number
 *                  description: Product's price.
 *                  example: 0.99
 *        500:
 *          description: Server's controller error.
 */
router.get("/product/:id",controller.readProduct);


/**
 * @swagger
 * /v1/product:
 *   post:
 *      summary: Creates a product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The product name
 *                              example: John Doe
 *                          description:
 *                              type: string
 *                              example: Lorem Ipsum
 *                          price:
 *                              type: number
 *                              example: 0.0
 *      responses:
 *          201:
 *              descripion: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          name:
 *                              type: string
 *                              description: The product name
 *                              example: John Doe
 *                          description:
 *                              type: string
 *                              example: Lorem Ipsum
 *                          price:
 *                              type: number
 *                              example: 0.0
 *          500:
 *              description: Server's controller error.
 *          404:
 *              description: The product with that id was not find.
 */
router.post("/product",ValidateSchema(Schemas.product.create), controller.createProduct);

/**
 * @swagger
 * /v1/product/{id}:
 *  put:
 *    summary: Read a specific a product
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Product's id.
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The product name
 *                example: John Doe
 *              description:
 *                type: string
 *                example: Lorem Ipsum
 *              price:
 *                type: number
 *                example: 0.0
 *        
 *    responses:
 *      200:
 *        description: the product with this id.
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The product's uuid.
 *                name:
 *                  type: string
 *                  description: Product's name.
 *                  example: A toothbrush
 *                description:
 *                  type: string
 *                  description: Product's description.
 *                  example: An affordable toothbrush.
 *                price:
 *                  type: number
 *                  description: Product's price.
 *                  example: 0.99
 *        500:
 *          description: Server's controller error.
 *        404:
 *          description: The product with that id was not find.
 */
router.put("/product/:id", ValidateSchema(Schemas.product.update) ,controller.updateProduct);

/**
 * @swagger
 * /v1/product/{id}:
 *  delete:
 *    summary: Read a specific a product
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Product's id.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The object has been successfully deleted.
 *      500:
 *        description: Server's controller error.
 *      404:
 *          description: The product with that id was not find.
 */
router.delete("/product/:id", controller.deleteProduct);

export = router;
