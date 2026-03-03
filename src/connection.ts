import mongoose from "mongoose";
import {config} from './config/config';

mongoose.connect(config.mongo.url);

const cnx = mongoose.connection;
cnx.on('connected',()=>{
    console.log('Conexion correcta a MongoDB');
});
cnx.on('error',()=>{
    console.log('Error en la conexion a MongoDB')
});

export default mongoose;