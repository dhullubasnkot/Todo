import { SqluserModel } from "../model/sql/usermodel";
import { Request, Response } from "express";

export const createuserController = async (req: Request, res: Response) => {
  const { username, email, password, Role } = req.body;
  const newUser = await SqluserModel.CreateUsers({
    username,
    email,
    password,
    Role,
  });
  console.log(newUser);
  res.status(200).json(newUser);
};
export const GetAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await SqluserModel.GetAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const GetUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const user = await SqluserModel.GetUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const DeleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const result = await SqluserModel.deleteUserAndTodos(userId);
    if (!result) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user and todos" });
  }
};

export const CheckUserCredentialsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await SqluserModel.checkUserCredentials(email, password);
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to check credentials" });
  }
};
