// --- package imports
import { Request, Response, NextFunction } from 'express-serve-static-core';
// --- locals imports
import { BaseResponse } from '../base-response.js';
import { HttpException } from '../errors.js';
// ---

export const globalErrorHandler = (err: unknown, _req: Request, res: Response<BaseResponse<undefined>>, _next: NextFunction) => {
    if (err instanceof HttpException) {
        console.log(`[${err.name}] ${err.statusCode} ${err.message}`);
        res.status(err.statusCode).send({ success: false, message: err.message });
    } else if (err instanceof Error) {
        console.log(`[Error] ${err.message}`);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    } else {
        console.log("[Error] Unknown error", err);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};