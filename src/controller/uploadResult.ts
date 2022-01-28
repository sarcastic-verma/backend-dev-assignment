import { NextFunction, Request, Response } from "express";
import { getManager } from "typeorm";
import { StudentResult } from "../entity/StudentResult";
import RequestError from "../middlewares/requestError";

export async function uploadResult(request: Request, response: Response, next: NextFunction) {
    try {
        const studentResultRepository = getManager().getRepository(StudentResult);

        // todo read from actual csv

        const studentResult = await studentResultRepository.save({
            age: 12,
            mark1: 32,
            mark2: 33,
            mark3: 43,
            name: "Pushpa"
        });

        response.json({ studentResult });
    } catch ( e ) {
        const error = new RequestError(e.message || "Error in creating result!", 500, e);
        next(error);
    }

}
