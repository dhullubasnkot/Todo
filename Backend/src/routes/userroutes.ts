import express from "express";
const router = express.Router();
import {
  createuserController,
  GetAllUserController,
  GetUserByIdController,
} from "../controller/userController";

router.post("/", createuserController);
router.get("/:id", GetUserByIdController);
router.get("/", GetAllUserController);
export default router;
