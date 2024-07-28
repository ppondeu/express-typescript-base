// --- locals imports
import { users } from "../../../core/index.js";
import { UserController } from "./user.controller.js";
import { UserRepositoryMock } from "./user.repository.js";
// ---
const userRepo = new UserRepositoryMock(users);

export const userController = new UserController(userRepo);