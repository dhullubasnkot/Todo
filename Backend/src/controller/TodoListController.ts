import { SqlTodoList } from "../model/sql/Todolist";

import { Request, Response } from "express";

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
