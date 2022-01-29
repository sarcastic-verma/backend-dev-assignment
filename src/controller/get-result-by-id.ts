import { NextFunction, Request, Response } from "express";
import { EntityNotFoundError, getManager } from "typeorm";
import { StudentResult } from "../entity/StudentResult";
import RequestError from "../middlewares/request-error";

export async function getResultById(request: Request, response: Response, next: NextFunction) {
    try {
        const studentResultRepository = getManager().getRepository(StudentResult);

        const studentResult = await studentResultRepository.findOneOrFail({ where: { id: request.params.id } });

        response.json({ studentResult });
    } catch ( e ) {
        if ( e instanceof EntityNotFoundError ) {
            const error = new RequestError("Result with this Id does not exist", 404, e);
            next(error);
        }

        const error = new RequestError(e.message || "Error in finding result!", 400, e);
        next(error);
    }

}
