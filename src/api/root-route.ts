// --- package imports
import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
// --- local imports
import { BaseResponse } from "../core/base-response.js";
import { HandlerMetadata, TypedRoute } from "../core/typed-route.js";

const router = Router();
router.get("/", (_req: Request, res: Response<BaseResponse<undefined>>, _next: NextFunction) => {
    res.send({
        success: true,
        message: "Request successful",
    });
});

export default router;