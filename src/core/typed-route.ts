import { Request, Response, NextFunction } from "express-serve-static-core";
import { z } from 'zod';
import { BaseResponse } from './base-response.js';
import { MaybePromise, RequestHandler } from './types.js';
import { BadRequestException, InternalServerErrorException } from './errors.js';

export class TypedRoute {
    static instance: TypedRoute | undefined;
    constructor() {
        if (TypedRoute.instance) {
            return TypedRoute.instance;
        }
        TypedRoute.instance = this;
    }

    get(path: string) {
        return new TypedRouteHandler(path, 'get');
    }
    post(path: string) {
        return new TypedRouteHandler(path, 'post');
    }
    put(path: string) {
        return new TypedRouteHandler(path, 'put');
    }
    delete(path: string) {
        return new TypedRouteHandler(path, 'delete');
    }
}

export type HandlerMetadata = {
    method: string;
    path: string;
    handler: RequestHandler;
    __handlerMetadata: boolean;
}

export type TypedHandler<
    TQuery extends z.ZodTypeAny,
    TParams extends z.ZodTypeAny,
    TBody extends z.ZodTypeAny,
    TResponse extends BaseResponse = BaseResponse>
    = (context: {
        query: z.infer<TQuery>,
        params: z.infer<TParams>,
        body: z.infer<TBody>,
        req: Request<z.infer<TQuery>, any, z.infer<TBody>, z.infer<TParams>>,
        res: Response<TResponse>
    }) => MaybePromise<TResponse>;

export class TypedRouteHandler<
    TQuery extends z.ZodTypeAny = z.ZodTypeAny,
    TBody extends z.ZodTypeAny = z.ZodTypeAny,
    TParams extends z.ZodTypeAny = z.ZodTypeAny
> {

    private schema: {
        query?: z.ZodTypeAny;
        body?: z.ZodTypeAny;
        params?: z.ZodTypeAny;
    } = {};

    constructor(private readonly path: string, private readonly method: string) { }

    static catchAsync = (fn: (...args: any[]) => any) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
    static preRequest = (handler: RequestHandler) => {
        const invokeHandler = async (req: Request, res: Response, next: NextFunction) => {
            const result = await handler(req, res, next);
            return res.send({
                success: true,
                message: "Request successful",
                ...result,
            } satisfies BaseResponse);
        };
        return this.catchAsync(invokeHandler);
    }

    body<Body extends z.ZodTypeAny>(schema: Body) {
        this.schema.body = schema;
        return this as unknown as TypedRouteHandler<TQuery, Body, TParams>;
    }

    query<Query extends z.ZodTypeAny>(schema: Query) {
        this.schema.query = schema;
        return this as unknown as TypedRouteHandler<Query, TBody, TParams>;
    }

    params<Params extends z.ZodTypeAny>(schema: Params) {
        this.schema.params = schema;
        return this as unknown as TypedRouteHandler<TQuery, TBody, Params>;
    }

    handler(handler: TypedHandler<TQuery, TParams, TBody>) {
        const invokeHandler = async (req: Request, res: Response) => {
            let message, body, params, query;
            try {
                message = "Query";
                query = this.schema.query ? this.schema.query.parse(req.query) : undefined;
                message = "Params";
                params = this.schema.params ? this.schema.params.parse(req.params) : undefined;
                message = "Body";
                body = this.schema.body ? this.schema.body.parse(req.body) : undefined;
            } catch (err: unknown) {
                if (err instanceof z.ZodError) {
                    console.log("ZodError", err.errors);
                    const errs = err.errors.map(e => e.message).join(", ");
                    throw new BadRequestException(`${message} validation error ${errs}`);
                } else if (err instanceof Error) {
                    console.log("Error", err.message);
                    throw new InternalServerErrorException(`${err.message}`);
                } else {
                    console.log("Unknown error", err);
                    throw new InternalServerErrorException(`${err}`);
                }
            }
            return handler({ query, params, body, req, res });
        }
        return TypedRouteHandler.preRequest(invokeHandler);
    }
}