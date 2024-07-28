// --- packages imports
import { z } from "zod";
// --- locals imports
import { BaseResponse, BaseController, NotFoundException } from "../../../core/index.js";
import { UserCreateSchema, UserResponse } from "./index.js";
import { TypedRoute } from "../../../core/typed-route.js";
import { UserService } from "./user.service.js";
// ---

export class UserController extends BaseController {
    private route = new TypedRoute();
    constructor(private readonly userSrv: UserService) {
        super();
    }

    getUsers = this.route.get("/").handler(async () => {
        const usersResponse = await this.userSrv.getUsers();
        return {
            data: usersResponse,
        } satisfies BaseResponse<UserResponse[]>;
    });

    getUser = this.route.get("/:id").params(z.object({
        id: z.string().uuid(),
    })).handler(async ({ params }) => {
        const userResponse = await this.userSrv.getUser(params.id);
        return {
            data: userResponse,
        } satisfies BaseResponse<UserResponse>;
    });

    createUser = this.route.post("/").body(UserCreateSchema).handler(async ({ body }) => {
        const userResponse = await this.userSrv.createUser(body);
        return {
            data: userResponse,
        } satisfies BaseResponse<UserResponse>;
    });

    updateUser = this.route.put("/:id").params(z.object({
        id: z.string().uuid(),
    })).body(UserCreateSchema).handler(async ({ params, body }) => {
        const userResponse = await this.userSrv.updateUser(params.id, body);
        return {
            data: userResponse,
        } satisfies BaseResponse<UserResponse>;
    });

    deleteUser = this.route.delete("/:id").params(z.object({
        id: z.string().uuid(),
    })).handler(async ({ params }) => {
        await this.userSrv.deleteUser(params.id);
        return {
            data: true,
        } satisfies BaseResponse<boolean>;
    });
}
