import express from 'express';
import Auth from '../controllers/Authentication';
import Joi from 'joi';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import { TokenValidation, authenticateRole as authenticateRole } from '../middleware/Authentication';

const router = express.Router();
/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: User authentication
 */

/**
 * @openapi
 * /auth/signin:
 *   post:
 *     summary: Signin
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: carlos@gmail.com
 *               password:
 *                 type: string
 *                 example: el secreto esta en la masa
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Incorrect password
 */
router.post('/signin', ValidateSchema(Schemas.signIn), Auth.signin);

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Registro de usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Register a new user
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: Michael
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: michael@gmail.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Example123
 *               group:
 *                 type: string
 *                 description: User's group
 *                 example: USA
 *               role:
 *                 type: string
 *                 description: User's role
 *                 example: user/admin
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Registered User
 *               properties:
 *                 name:
 *                   type: string
 *                   description: User's name
 *                   example: Michael
 *                 email:
 *                   type: string
 *                   description: User's email
 *                   example: michael@gmail.com
 *                 password:
 *                   type: string
 *                   description: User's password
 *                   example: Example123
 *                 group:
 *                   type: string
 *                   description: User's group
 *                   example: USA
 *                 role:
 *                   type: string
 *                   description: User's role
 *                   example: user/admin
 *       400:
 *         description: Datos inválidos o error en el registro
 */
router.post('/signup', ValidateSchema(Schemas.user.create), Auth.signup);

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Registered User
 *               properties:
 *                 name:
 *                   type: string
 *                   description: User's name
 *                   example: Michael
 *                 email:
 *                   type: string
 *                   description: User's email
 *                   example: michael@gmail.com
 *                 password:
 *                   type: string
 *                   description: User's password
 *                   example: Example123
 *                 group:
 *                   type: string
 *                   description: User's group
 *                   example: USA
 *                 role:
 *                   type: string
 *                   description: User's role
 *                   example: user/admin
 *       401:
 *         description: No autorizado, token inválido o ausente
 */
router.get('/profile',TokenValidation, authenticateRole, Auth.profile);

export default router;