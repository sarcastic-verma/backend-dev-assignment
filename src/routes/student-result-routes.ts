import * as express from 'express';
import { uploadResult } from "../controller/upload-result";
import { getResultById } from "../controller/get-result-by-id";
import { getByResultStatus } from "../controller/get-by-result-status";

const router = express.Router();

router.post('/upload', uploadResult);

router.get('/student', getByResultStatus);

router.get('/student/:id/result', getResultById);

export default router;
