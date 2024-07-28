// --- package imports ---
import { Request, Response, NextFunction } from "express-serve-static-core";
// --- locals imports ---
import { BaseResponse } from "./base-response.js";
// ---

export type MaybePromise<T> = T | Promise<T>;
export type RequestHandler = (req: Request, res: Response, next: NextFunction) => MaybePromise<BaseResponse>;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export type HandlerMetadata = {
    method: HttpMethod;
    path: string;
    handler: RequestHandler;
    __handlerMetadata: boolean;
}
