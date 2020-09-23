import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  res.status(404).json({
    error: "HTTP 404",
    message: {
      route: req.url,
      detail: `route undefined, please check the api doc`,
    },
  });
}