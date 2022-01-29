import getConnection from "../utils/get-connection";
import { Application } from "express";
import app from "../app";

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
    });

    afterAll(async() => {
        await (await conn).close();
    });

    tests(app);
});