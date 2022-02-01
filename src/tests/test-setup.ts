import getConnection from "../utils/get-connection";
import { Application } from "express";
import app from "../app";
import { StudentResult } from "../entity/StudentResult";

jest.setTimeout(20_000);

export const describeWithApp = (
    name: string,
    tests: (
        app: Application
    ) => void,
) => describe(name, () => {
    const conn = getConnection();

    beforeAll(async() => {
        await conn;
        await (await conn).getRepository(StudentResult).clear();
    });

    afterAll(async() => {
        await (await conn).close();
    });

    tests(app);
});
