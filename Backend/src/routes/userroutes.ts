import express from "express";
const router = express.Router();
import {
  createuserController,
  GetAllUserController,
  GetUserByIdController,
  DeleteUserById,
  CheckUserCredentialsController,
  GetAllUsersLoggedConroller,
} from "../controller/userController";

router.post("/", createuserController);
router.get("/alll", GetAllUsersLoggedConroller);
router.get("/:id", GetUserByIdController);
router.get("/", GetAllUserController);
router.delete("/:id", DeleteUserById);
router.post("/check-credentials", CheckUserCredentialsController);

export default router;
