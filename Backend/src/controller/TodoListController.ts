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
