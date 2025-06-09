import express from "express";
const router = express.Router();
import { createuserController } from "../controller/userController";

router.post("/", createuserController);
export default router;
