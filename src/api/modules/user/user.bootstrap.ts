import { TypedRoute } from "../../../core/typed-route.js";
import { UserController } from "./user.controller.js";
import { UserRepositoryImpl } from "./user.repository.js";

export const route = new TypedRoute();
const userRepo = new UserRepositoryImpl();

export const userController = new UserController(userRepo);