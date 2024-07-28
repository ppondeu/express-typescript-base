// --- packages imports
import { Router } from "express";
// --- locals imports
import { userController } from "./user.bootstrap.js";
// ---

const router = Router();
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;