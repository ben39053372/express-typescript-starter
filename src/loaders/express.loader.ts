import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "../route";
import morgan from "morgan";
import helmet from "helmet";
import { ICustomError } from "../interfaces/express";

export default async ({ app }: { app: express.Application }): Promise<void> => {

  // for health check
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(morgan("dev"));

  app.enable("trust proxy");

  app.disable("etag");

  app.disable("x-powered-by");

  app.use(cors());

  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  // route
  app.use("/api", router);

  // handle 404 error
  app.use(function (req, res) {
    res.status(404).json({
      error: "HTTP 404",
      message: {
        route: req.url,
        detail: `This route not found`,
      },
    });
  });

  // The end error handler
  app.use(
    (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
      next(err);
    }
  );
};
