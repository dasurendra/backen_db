import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const uploadDocument = (req: Request, res: Response) => {
    const documentType = req.body.type; // Type of document uploaded (license, passport, birth certificate)
    const documentFile = req.file; // Uploaded document file

    // Perform validation based on document type
    if (documentType !== 'license' && documentType !== 'passport' && documentType !== 'birth_certificate') {
        return res.status(400).json({ message: 'Invalid document type' });
    }

    // Check if documentFile is undefined
    if (!documentFile?.originalname || !documentFile?.buffer) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save the document to a local storage location
    const fileName = `${documentType}_${Date.now()}_${documentFile.originalname}`;
    const filePath = path.join(__dirname, '../../uploads', fileName);
    fs.writeFileSync(filePath, documentFile.buffer);

    // Update user's KYC status in the database to 'pending_verification'

    res.json({ message: 'KYC document uploaded successfully' });
};

export default { uploadDocument };
