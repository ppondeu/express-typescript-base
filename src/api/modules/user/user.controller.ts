import { z } from "zod";

import { BaseResponse, BaseController } from "../../../core/index.js";
import { route, UserCreateSchema, UserRepository, UserResponse } from "./index.js";

export class UserController extends BaseController {
    constructor(private readonly userRepo: UserRepository) {
        super();
    }

    getUsers = route.get("/").handler(async () => {
        const users = await this.userRepo.getUsers();
        const usersResponse = users.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
            };
        });
        return {
            data: usersResponse,
        } satisfies BaseResponse<Array<UserResponse>>;
    });

    getUser = route.get("/:id").params(z.object({
        id: z.string().uuid(),
    })).handler(async (req) => {
        const user = await this.userRepo.getUser(req.params.id);
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return {
            data: userResponse,
        };
    });

    createUser = route.post("/").body(UserCreateSchema).handler(async ({ body }) => {
        const createdUser = await this.userRepo.createUser(body);
        const userResponse = {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
        };
        return {
            data: userResponse,
        } satisfies BaseResponse<UserResponse>;
    });
}