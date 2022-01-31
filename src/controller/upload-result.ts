import { NextFunction, Request, Response } from "express";
import { getManager } from "typeorm";
import { IStudentResultRow, StudentResult } from "../entity/StudentResult";
import RequestError from "../middlewares/request-error";
import * as csv from '@fast-csv/parse';
import fs from "fs";

export async function uploadResult(request: Request, response: Response, next: NextFunction) {

    const studentResultRepository = getManager().getRepository(StudentResult);

    const values: IStudentResultRow[] = [];

    if ( !request.file ) {
        const error = new RequestError("Results csv not sent!", 400);
        next(error);
    }

    csv.parseFile(request.file!.path!, { headers: true }).on('data', (row) => {
        const studentResultRow = row as unknown as IStudentResultRow & { status: "passed" | "failed" };
        const { mark1, mark2, mark3 } = studentResultRow;

        studentResultRow.status = mark1 > 35 && mark2 > 35 && mark3 > 35 ? "passed" : "failed";

        values.push(studentResultRow);
    }).on('end', async () => {
        try {
            await studentResultRepository.createQueryBuilder().insert().values(values).execute();
            fs.unlink(request.file!.path, (err: any) => {
                console.log(err);
            });
            response.json({ message: `Successfully inserted ${ values.length } results!` });
        } catch ( e ) {
            const error = new RequestError(e.message || "Error in creating result!", 500, e);
            next(error);
        }
    })
}
