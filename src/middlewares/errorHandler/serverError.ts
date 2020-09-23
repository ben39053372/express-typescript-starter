import { NextFunction, Request, Response, Errback } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
  next(err);
}