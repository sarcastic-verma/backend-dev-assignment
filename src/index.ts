import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import express, { NextFunction, Request, Response } from "express";
import config from "../ormconfig";
import entities from "../src/entity";
import studentResultRoutes from './routes/studentResultRoutes';
import RequestError from "./middlewares/requestError";
import { ErrorWithCode } from "./interfaces/errorWithCode";

// create express app
const app = express();

app.use(express.json());

app.use('/api/', studentResultRoutes);

//Unsupported Routes
app.use(() => {
    throw new RequestError('Cannot find this Route!', 404);
})

//Error Handling for any other error
app.use((error: ErrorWithCode, req: Request, res: Response, next: NextFunction) => {
    if ( res.headersSent ) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        "status": "failed",
        "message": error.message || 'An unknown error occurred!'
    });
});

// run app
app.listen(3000, () => {
    // @ts-ignore
    config.entities = entities;
    createConnection(config as ConnectionOptions).catch(error => console.log("TypeORM connection error: ", error));
});

console.log("Express application is up and running on port 3000");


