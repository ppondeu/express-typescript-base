// --- package imports ---
import { Request, Response, NextFunction } from "express-serve-static-core";
// --- locals imports ---
import { BaseResponse } from "./base-response.js";
import { HttpMethod, RequestHandler } from "./types.js";
// ---

export const isHttpMethod = (method: any): method is HttpMethod => {
    return ['get', 'post', 'put', 'delete'].includes(method);
}

export const catchAsync = (fn: (...args: any[]) => any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export const preRequest = (handler: RequestHandler) => {
    const invokeHandler = async (req: Request, res: Response, next: NextFunction) => {
        const result = await handler(req, res, next);
        return res.send({
            success: true,
            message: "Request successful",
            ...result,
        } satisfies BaseResponse);
    };
    return catchAsync(invokeHandler);
}