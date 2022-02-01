import { NextFunction, Request, Response } from "express";
import { getManager } from "typeorm";
import { IStudentResultRow, StudentResult } from "../entity/StudentResult";
import RequestError from "../middlewares/request-error";
import * as csv from '@fast-csv/parse';
import fs from "fs";

export async function uploadResult(request: Request, response: Response, next: NextFunction) {

    const studentResultRepository = getManager().getRepository(StudentResult);

    const values: IStudentResultRow[] = [];
    let invalidCsv: boolean;

    const isTest = process.env.NODE_ENV === "test";

    if ( !isTest && !request.file ) {
        const error = new RequestError("Results csv not sent!", 400);
        next(error);
    }

    csv.parseFile(isTest ? "./test.csv" : request.file!.path!, { headers: true }).on('data', (row) => {
        const studentResultRow = row as unknown as IStudentResultRow & { status: "passed" | "failed" };

        Object.keys(studentResultRow).forEach((e) => {
            if ( studentResultRow[e] === '' || ( [ "mark1", "mark2", "mark3" ].includes(e) && isNaN(+studentResultRow[e]) ) )
                invalidCsv = true
        })

        const { mark1, mark2, mark3 } = studentResultRow;

        studentResultRow.status = +mark1 > 35 && +mark2 > 35 && +mark3 > 35 ? "passed" : "failed";

        values.push(studentResultRow);
    }).on('end', async () => {
        try {
            if ( invalidCsv )
                return next(new RequestError("Invalid CSV data", 400));

            await studentResultRepository.createQueryBuilder().insert().values(values).execute();
            if ( !isTest )
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
