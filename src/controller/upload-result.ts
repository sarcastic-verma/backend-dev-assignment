import { NextFunction, Request, Response } from "express";
import { getManager } from "typeorm";
import { StudentResult } from "../entity/StudentResult";
import RequestError from "../middlewares/request-error";

export async function uploadResult(request: Request, response: Response, next: NextFunction) {
    try {
        const studentResultRepository = getManager().getRepository(StudentResult);

        // todo: read from actual csv

        const values = [ {
            age: 12,
            mark1: 32,
            mark2: 33,
            mark3: 43,
            id: "stud1",
            name: "Pushpa"
        } ];

        await studentResultRepository.createQueryBuilder().insert().values(values).execute();

        response.json({ message: `Successfully inserted ${ values.length } results!` });

    } catch ( e ) {
        const error = new RequestError(e.message || "Error in creating result!", 500, e);
        next(error);
    }

}
