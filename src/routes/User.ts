import express, { Router } from "express";
import controller from "../controllers/User";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import { Schema } from "mongoose";
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: User
 *     description: User Endpoints
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User's id
 *           example: ueu2812231hhug2a
 *         name:
 *           type: string
 *           description: User's name
 *           example: Michael
 *         email:
 *           type: string
 *           description: User's email
 *           example: michael@gmail.com
 *         password:
 *           type: string
 *           description: User's password
 *           example: Example123
 *         group:
 *           type: string
 *           description: User's group
 *           example: USA
 *         role:
 *           type: string
 *           description: User's role
 *           example: user/admin
 */

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */
router.post('/',ValidateSchema(Schemas.user.create), controller.createUser);

export default router;