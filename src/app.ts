import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import studentResultRoutes from './routes/student-result-routes';
import RequestError from "./middlewares/request-error";
import { ErrorWithCode } from "./interfaces/error-with-code";

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
    if ( req.file ) {
        fs.unlink(req.file.path, (err: any) => {
            console.log(err);
        });
    }
    if ( res.headersSent ) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        "status": "failed",
        "message": error.message || 'An unknown error occurred!'
    });
});

export default app;
