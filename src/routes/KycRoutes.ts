import express from 'express';
import multer from 'multer';
import { verifyDocument } from '../middlewares/kycMiddleware';
import { uploadDocument } from '../controllers/kycController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('document'), verifyDocument, uploadDocument);

export default router;
