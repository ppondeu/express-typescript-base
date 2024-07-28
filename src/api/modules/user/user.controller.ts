// --- packages imports
import { z } from "zod";
// --- locals imports
import { BaseResponse, BaseController } from "../../../core/index.js";
import { UserCreateSchema, UserRepository, UserResponse } from "./index.js";
import { TypedRoute } from "../../../core/typed-route.js";
// ---

export class UserController extends BaseController {
    private route = new TypedRoute();
    constructor(private readonly userRepo: UserRepository) {
        super();
    }

    getUsers = this.route.get("/").handler(async () => {
        const users = await this.userRepo.find();
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

    getUser = this.route.get("/:id").params(z.object({
        id: z.string().uuid(),
    })).handler(async ({ params }) => {
        const user = await this.userRepo.findOne(params.id);
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return {
            data: userResponse,
        };
    });

    createUser = this.route.post("/").body(UserCreateSchema).handler(async ({ body }) => {
        const createdUser = await this.userRepo.save(body);
        const userResponse = {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
        };
        return {
            data: userResponse,
        } satisfies BaseResponse<UserResponse>;
    });

    updateUser = this.route.put("/:id").params(z.object({
        id: z.string().uuid(),
    })).body(UserCreateSchema).handler(async ({ params, body }) => {
        const updatedUser = await this.userRepo.update(params.id, body);
        const userResponse = {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
        };
        return {
            data: userResponse,
        } satisfies BaseResponse<UserResponse>;
    });

    deleteUser = this.route.delete("/:id").params(z.object({
        id: z.string().uuid(),
    })).handler(async ({ params }) => {
        await this.userRepo.delete(params.id);
        return {
            data: true,
        } satisfies BaseResponse<boolean>;
    });
}
