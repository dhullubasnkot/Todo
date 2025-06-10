import express from "express";
const router = express.Router();
import {
  createuserController,
  GetAllUserController,
  GetUserByIdController,
  DeleteUserById,
} from "../controller/userController";

router.post("/", createuserController);
router.get("/:id", GetUserByIdController);
router.get("/", GetAllUserController);
router.delete("/:id", DeleteUserById);
export default router;
