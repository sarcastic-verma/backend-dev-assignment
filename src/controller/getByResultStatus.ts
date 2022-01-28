import { NextFunction, Request, Response } from "express";
import { FindManyOptions, getManager } from "typeorm";
import { StudentResult } from "../entity/StudentResult";
import RequestError from "../middlewares/requestError";

export async function getByResultStatus(request: Request, response: Response, next: NextFunction) {
    try {
        const studentResultRepository = getManager().getRepository(StudentResult);
        const status = request.query?.resultStatus;

        let options: FindManyOptions<StudentResult> = {};

        if ( !status ) options = {};
        // todo
        else if ( status === "passed" ) options = { where: {} };
        else if ( status === "failed" ) options = { where: {} };
        else next(new RequestError("Invalid resultStatus", 401));

        const studentResults = await studentResultRepository.find(options);

        response.json({ studentResults: studentResults });
    } catch ( e ) {
        const error = new RequestError(e.message || "Error in finding result by status!", 400, e);
        next(error);
    }

}
