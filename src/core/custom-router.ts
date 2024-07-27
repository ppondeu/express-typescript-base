// --- package imports ---
import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
// --- local imports ---
import { BaseResponse } from "./base-response.js";
import { HttpMethod, MaybePromise } from "./types.js";
import { HandlerMetadata } from "./typed-route.js";
import { isHttpMethod } from "./utils.js";
// ---

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => MaybePromise<BaseResponse>;

export const catchAsync = (fn: (...args: any[]) => any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export class CustomRouter {
    constructor(readonly instance: Router = Router()) { }

    private static extractHandlers(handlers: RequestHandler[]) {
        const handler = handlers[handlers.length - 1];
        const middlewares = handlers.slice(0, handlers.length - 1);
        return { handler, middlewares };
    }

    private static preRequest(handler: RequestHandler) {
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

    private route(method: HttpMethod, path: string, handlers: RequestHandler[]) {
        const { handler, middlewares } = CustomRouter.extractHandlers(handlers);
        console.log(method, path, middlewares, handler.toString());
        this.instance[method](path, ...middlewares, CustomRouter.preRequest(handler));
    }

    registerClassRoutes(instance: object) {
        const fileds = Object.values(instance);
        for (const field of fileds) {
            const route = field as HandlerMetadata;
            if (route?.__handlerMetadata) {
                const { method, path, handler } = route satisfies HandlerMetadata;
                if (isHttpMethod(method)) {
                    this.instance[method](path, CustomRouter.preRequest(handler));
                }
            }
        }
        return this;
    }
}