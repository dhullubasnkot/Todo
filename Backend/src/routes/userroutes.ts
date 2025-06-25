import express from "express";
const router = express.Router();
import {
  createuserController,
  GetAllUserController,
  GetUserByIdController,
  DeleteUserById,
  CheckUserCredentialsController,
  GetAllUsersLoggedConroller,
  LogoutUserController,
  // GetCurrentUserSessionController,
} from "../controller/userController";

router.post("/", createuserController);
router.get("/alll", GetAllUsersLoggedConroller);
router.get("/:id", GetUserByIdController);
router.get("/", GetAllUserController);
router.delete("/:id", DeleteUserById);
router.post("/check-credentials", CheckUserCredentialsController);
router.delete("/logout", LogoutUserController);
// router.get("/session/current", GetCurrentUserSessionController);
// router.get("/session/current", GetCurrentUserSessionController);


export default router;
