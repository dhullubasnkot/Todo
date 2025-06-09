import express from "express";
const router = express.Router();
import { CreateTodoList } from "../controller/TodoListController";
import { getTodosByUserId } from "../controller/TodoListController";

router.post("/", CreateTodoList);
router.get("/:userId", getTodosByUserId);
export default router;
