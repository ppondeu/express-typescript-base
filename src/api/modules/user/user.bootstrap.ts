// --- locals imports
import { users } from "../../../core/index.js";
import { UserController } from "./user.controller.js";
import { UserRepositoryMock } from "./user.repository.js";
import { UserServiceImpl } from "./user.service.js";
// ---
const userRepo = new UserRepositoryMock(users);
const userSrv = new UserServiceImpl(userRepo);
export const userController = new UserController(userSrv);