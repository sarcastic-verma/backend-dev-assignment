import * as express from 'express';
import { uploadResult } from "../controller/uploadResult";
import { getResultById } from "../controller/getResultById";
import { getByResultStatus } from "../controller/getByResultStatus";

const router = express.Router();

router.post('/upload', uploadResult);

router.get('/student', getByResultStatus);

router.get('/student/:id/result', getResultById);

export default router;
