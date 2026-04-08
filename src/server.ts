import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import path from 'path';
import { equal } from 'joi';
import swaggerUi, {specs} from './swagger/swagger';
import productRoutes from './routes/Product';
import userRoutes from './routes/User';
import groupRoutes from './routes/Group';
import cnx from './connection';

const router = express();


function startServer() : void{
    router.use(express.urlencoded({extended: true}));
    router.use(express.json());
    //router.use(express.static('static'));
    router.use('/static', express.static(path.join(__dirname, 'static'))); // temporal
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs)); // swagger

    router.use((req, res, next) => {
        Logging.info(`Incoming -> Method: [${req.method}] - Url [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);

        res.on('finish', () => {
             Logging.info(`Outcoming -> Method: [${req.method}] - Url [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use((req, res, next) => {
        /**
         * Api rules
         */

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers','Origin, X-Requested-Width, Content-Type, Accept, Authorization');

        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    

    /**
     * Rutas
     */

    router.use('/v1',productRoutes);
    router.use('/user',userRoutes);
    router.use('/group', groupRoutes);

    http.createServer(router).listen(config.server.port, ()=> {
        Logging.log(`Sever is running in http://localhost:${config.server.port}`);
    });
    /*
    router.listen(8080, function()
    {
    console.log(`El servidor esta funcionando`)
    });
    */
}

startServer();

// La forma de cerrar un programa sin dejar el driver colgado es Ctrl+C
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
    cnx.disconnect();
    process.exit(0);
});