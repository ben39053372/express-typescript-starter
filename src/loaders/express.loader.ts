import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "../route";
import morgan from "morgan";
import helmet from "helmet";
import { errors } from 'celebrate'
import checkToken from '../middlewares/checkToken'
import rateLimit from '../middlewares/rateLimiter'
import UnAuthorizedError from '../middlewares/errorHandler/UnauthorizedError'
import NotFoundError from '../middlewares/errorHandler/404NotFoundError'
import ServerError from '../middlewares/errorHandler/serverError'

export default async ({ app }: { app: express.Application }): Promise<void> => {

  app.use(cors());

  app.enable("trust proxy");

  app.disable("x-powered-by");

  app.disable("etag");

  app.use(helmet());

  // for health check
  app.get("/status", (req, res) => res.status(200).end());
  app.head("/status", (req, res) => res.status(200).end());

  app.use(rateLimit)

  app.use(checkToken)

  app.use(morgan("dev"));

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  // route
  app.use("/api", router);

  // error handler
  app.use(UnAuthorizedError);

  // valid error
  app.use(errors())

  // handle 404 error
  app.use(NotFoundError);

  // The end error handler
  app.use(ServerError);
};
