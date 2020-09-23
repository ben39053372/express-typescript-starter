import { Router, Request, Response, NextFunction } from "express";
import v1Router from "./v1";
import JWT from 'express-jwt'
import config from '../config'

const api: Router = Router();

api.use("/v1", v1Router);

api.use((err, req: Request, res: Response, next: NextFunction) => next(err));

export default api;
