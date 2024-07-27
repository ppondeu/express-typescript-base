import { Request, Response } from 'express-serve-static-core';
import { BaseResponse } from '../base-response.js';
export const routeNotFoundHandler = (_req: Request, res: Response<BaseResponse<undefined>>) => {
    res.status(404).send({ success: false, message: "404 Route Not Found" });
}
