import { NextFunction, Request, Response } from "express";
import { FindManyOptions, getManager } from "typeorm";
import { StudentResult } from "../entity/StudentResult";
import RequestError from "../middlewares/request-error";

export async function getByResultStatus(request: Request, response: Response, next: NextFunction) {
    try {
        const studentResultRepository = getManager().getRepository(StudentResult);
        const status = request.query?.resultStatus;

        let options: FindManyOptions<StudentResult> = {};

        if ( !status ) options = {};

        else if ( [ "passed", "failed" ].includes(status.toString()) ) options = { where: { status: status } }

        else return next(new RequestError("Invalid resultStatus", 400));

        const studentResults = await studentResultRepository.find(options);

        response.json({ studentResults: studentResults });
    } catch ( e ) {
        const error = new RequestError(e.message || "Error in finding result by status!", 400, e);
        next(error);
    }
}
