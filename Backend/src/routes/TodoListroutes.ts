import express from "express";
const router = express.Router();
import {
  CreateTodoList,
  updateTaskController,
  getTodoById,
  deletetaskController,
} from "../controller/TodoListController";
import { getTodosByUserId } from "../controller/TodoListController";

router.post("/", CreateTodoList);
router.get("/task/:id", getTodoById);
router.get("/:userId", getTodosByUserId);
router.put("/task/:id", updateTaskController);
router.delete("/:id", deletetaskController);
export default router;
