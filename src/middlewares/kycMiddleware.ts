import { Request, Response, NextFunction } from 'express';

export const verifyDocument = (req: Request, res: Response, next: NextFunction) => {
    const documentFile = req.file; // Uploaded document fil
   if (!documentFile?.mimetype || documentFile.mimetype !== 'application/pdf') {
    return res.status(400).json({ message: 'Invalid document format. Only PDF files are allowed.' });
}
next(); // Continue to the next middleware or route handler

};
