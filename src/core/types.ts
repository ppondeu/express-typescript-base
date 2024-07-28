import { Request, Response, NextFunction } from "express-serve-static-core";
import { BaseResponse } from "./base-response.js";

export type MaybePromise<T> = T | Promise<T>;
export type RequestHandler = (req: Request, res: Response, next: NextFunction) => MaybePromise<BaseResponse>;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';