import { type Request,type Response,type NextFunction } from 'express';

export const Middleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
  
  // Important: next() tells Express to move to the next function/route
  next();
};