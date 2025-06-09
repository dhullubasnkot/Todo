import { SqluserModel } from "../model/sql/usermodel";
import { Request, Response } from "express";

export const createuserController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser = await SqluserModel.CreateUsers({
    username,
    email,
    password,
  });
  console.log(newUser);
  res.status(200).json(newUser);
};
