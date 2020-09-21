import { Errback } from "express";

export interface ICustomError extends Errback {
  status: number;
  message: string;
}
