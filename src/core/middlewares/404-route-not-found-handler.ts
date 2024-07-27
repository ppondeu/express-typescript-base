import { BaseResponse } from 'core/base-response.js';
import { Request, Response } from 'express-serve-static-core';
export const routeNotFoundHandler = (_req: Request, res: Response<BaseResponse<undefined>>) => {
    res.status(404).send({ success: false, message: "404 Route Not Found" });
}
