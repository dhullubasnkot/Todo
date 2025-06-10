import { SqlTodoList } from "../model/sql/Todolist";

import { Request, Response } from "express";
import { SqluserModel } from "../model/sql/usermodel";

export const CreateTodoList = async (req: Request, res: Response) => {
  try {
    const { title, descrition, completed, userId } = req.body;
    if (!title || !descrition || userId === undefined) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const todo = await SqlTodoList.createTodoList(title, descrition, userId);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo list", error });
  }
};
export const getTodosByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "Missing userId parameter" });
      return;
    }
    const todos = await SqlTodoList.getTodosByUserId(Number(userId));
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
};
export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, descrition, completed, userId } = req.body;

    const data = await SqlTodoList.updateTaskPrisma({
      id,
      title,
      descrition,
      completed,
      userId,
    });
    res.status(200).json(data);
  } catch {
    res.status(404).json("Unable to update");
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id parameter" });
      return;
    }
    const todo = await SqlTodoList.getTodoListById(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todo", error });
  }
};
export const deletetaskController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await SqlTodoList.deleteTaskPrisma(id);
    res.status(200).json("Task is deletd");
  } catch {
    res.status(404).json("Unable to delete task");
  }
};
