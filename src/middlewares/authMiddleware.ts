import { Request, Response, NextFunction } from 'express';
import { checkJwt, handleAuthError } from '../auth';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  checkJwt(req, res, (err: any) => {
    if (err) {
      handleAuthError(err, req, res, next);
    } else {
      next();
    }
  });
};
