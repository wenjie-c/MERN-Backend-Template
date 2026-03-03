/*
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
*/

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Express API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
  },
  apis: ['dist/routes/*.js'], // tiene que ser una ruta relativa desde donde ejecutas el comando https://stackoverflow.com/questions/77715212/why-do-i-get-the-no-operations-defined-in-spec-message-when-accessing-swagger
};

export const specs = swaggerJsdoc(options);

export default swaggerUi;