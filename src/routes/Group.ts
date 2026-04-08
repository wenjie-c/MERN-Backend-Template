import express, { Router } from "express";
import controller from "../controllers/Group";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import { Schema } from "mongoose";
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Group
 *     description: Group Endpoints
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Group's id
 *           example: ueu2812231hhug2a
 *         name:
 *           type: string
 *           description: Group's name
 *           example: USA
 *         score:
 *           type: number
 *           description: Group's score
 *           example: 67
 *     CreateUpdateGroup:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Group's name
 *           example: USA
 *         score:
 *           type: number
 *           description: Group's score
 *           example: 67
 */

/**
 * @openapi
 * /group:
 *   post:
 *     summary: Create a new Group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateGroup'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Something went wrong
 */
router.post('/',ValidateSchema(Schemas.group.create), controller.createGroup);

/**
 * @openapi
 * /group/{groupId}:
 *   get:
 *     summary: Get the group with that id.
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group's object id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Not found.
 *       500:
 *         description: Something went wrong
 * 
 */
router.get('/:groupId', controller.readGroup);

/**
 * @openapi
 * /group:
 *   get:
 *     summary: Get all groups.
 *     tags: [Group]
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Something went wrong
 */
router.get('/', controller.readAllGroups);

/**
 * @openapi
 * /group/{groupId}:
 *   put:
 *     summary: Update the group with that id.
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group's object id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateGroup'
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Not found.
 *       500:
 *         description: Something went wrong
 */
router.put('/:groupId',ValidateSchema(Schemas.group.update), controller.updateGroup);

/**
 * @openapi
 * /group/{groupId}:
 *   delete:
 *     summary: Delete the group with that id.
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group's object id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Not found.
 *       500:
 *         description: Something went wrong
 * 
 */
router.delete('/:groupId', controller.deleteGroup);

export default router;