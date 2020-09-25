import { Router } from "express";
import v1Router from "./v1";

const api: Router = Router();

api.use("/v1", v1Router);

export default api;
