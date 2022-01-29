import { describeWithApp } from "./test-setup";
import request from "supertest";

describeWithApp("StudentResult", (app) => {
    it('should upload csv', async () => {
        await request(app)
            .post("/api/upload")
            .send({})
            .expect("Content-Type", /json/)
            .expect(200)
            .then(() => {
            });
    });

    it('should get result by id', async () => {
        await request(app)
            .get("/api/student/stud1/result")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body.studentResult.id).toBe("stud1")
            });
    });

    it('should get result by status', async () => {
        await request(app)
            .get("/api/student?resultStatus=passed")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body.studentResults[0].name).toBeDefined()
            });
    });

    ////
    //
    it('should fail with id not found', async () => {
        await request(app)
            .get("/api/student/idNotInDB/result")
            .expect("Content-Type", /json/)
            .expect(404)
            .then(() => {
            });
    });


    it('should fail with invalid value for resultStatus', async () => {
        await request(app)
            .get("/api/student?resultStatus=opopopo")
            .expect("Content-Type", /json/)
            .expect(400)
            .then(() => {
            });
    });
});
