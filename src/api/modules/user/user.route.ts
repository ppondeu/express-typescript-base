import { CustomRouter } from "../../../core/custom-router.js";
import { userController } from "./user.bootstrap.js";

export default new CustomRouter().registerClassRoutes(userController).instance;