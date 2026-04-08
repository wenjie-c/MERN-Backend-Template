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
 *     CreateUpdateUser:
 *       type: object
 *       properties:
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
 *             $ref: '#/components/schemas/CreateUpdateUser'
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

/**
 * @openapi
 * /user/{userId}:
 *   get:
 *     summary: Get the user with that id.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User's object id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found.
 *       500:
 *         description: Something went wrong
 * 
 */
router.get('/:userId', controller.readUser);

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Something went wrong
 */
router.get('/', controller.readAllUsers);

/**
 * @openapi
 * /user/{userId}:
 *   put:
 *     summary: Update the user with that id.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User's object id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateUser'
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found.
 *       500:
 *         description: Something went wrong
 */
router.put('/:userId', controller.updateUser);

/**
 * @openapi
 * /user/{userId}:
 *   delete:
 *     summary: Delete the user with that id.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User's object id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found.
 *       500:
 *         description: Something went wrong
 * 
 */
router.delete('/:userId', controller.deleteUser);

export default router;