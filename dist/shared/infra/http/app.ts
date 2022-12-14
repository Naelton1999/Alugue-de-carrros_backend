import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; 
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';
import '@shared/container';
import { Apperror } from '@shared/erros/Apperror';
import  createConnection  from '@shared/infra/typeorm';
import upload from '@config/upload';

createConnection();
const app= express();

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/avatar", express.static(`${upload.tmpfolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpfolder}/cars`))

app.use(router);

app.use((err: Error, request: Request, response: Response, next:NextFunction)=>{
    if(err instanceof Apperror){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status:"error",
        message:`internal server error - ${err.message}`
    });
})

export {app}