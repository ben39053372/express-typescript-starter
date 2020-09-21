import { Router, Request, Response, NextFunction } from "express";
import v1Router from "./v1";
import JWT from 'express-jwt'
import config from '../config'
import { ICustomError } from "../interfaces/express";

const api: Router = Router();

// api.use(JWT({
//   secret: config.JWT_SECRET as string,
//   algorithms: ['HS256']
// }).unless({
//   path: [
//     '/api/*/auth/login',
//     '/api/*/user'
//   ],
//   method: 'OPTIONS'
// }))

// error handler
api.use((err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message }).end();
  } else {
    next(err)
  }
}
);

api.use("/v1", v1Router);

export default api;
