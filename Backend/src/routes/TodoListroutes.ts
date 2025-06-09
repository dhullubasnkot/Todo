import express from "express";
const router = express.Router();
import { CreateTodoList } from "../controller/TodoListController";

router.post("/", CreateTodoList);
export default router;
