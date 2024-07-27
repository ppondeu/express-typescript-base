import { BaseResponse } from "../../../core/base-response.js";
import { BaseController } from "../../../core/base-controller.js";
import { route } from "./user.bootstrap.js";
import { z } from "zod";
import { UserCreate } from "./user.model.js";

export class UserController extends BaseController {
    constructor() {
        super();
    }
    getUsers = route.get("/").handler(async () => {
        return {
            data: ["1", "3"],
        } satisfies BaseResponse<Array<string>>;
    });

    getUser = route.get("/:id").params(z.object({
        id: z.string().uuid(),
    })).handler(async (req) => {
        console.log("User fetched", req.params.id);
        return {
            data: "User fetched",
        };
    });

    createUser = route.post("/").body(z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
    })).handler(async ({ body }) => {
        console.log("User created", body);
        return {
            data: body,
        } satisfies BaseResponse<UserCreate>;
    });
}