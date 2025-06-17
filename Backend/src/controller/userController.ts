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
    console.log("Fetching user with ID:", id);
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

    const result = await SqluserModel.checkUserCredentials(email, password);

    if (!result || !result.user || !result.token) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const { user, token } = result;

    // Set cookie with token
    const EXPIRY_TIME_IN_SECONDS = 3000;
    res.cookie("tokentest", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS * 1000),
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Failed to check credentials" });
  }
};

export const GetAllUsersLoggedConroller = async (
  req: Request,
  res: Response
) => {
  try {
    const userslogged = await SqluserModel.GetAllLoggedInUsers();
    res.status(200).json(userslogged);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const LogoutUserController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(400).json({ error: "No token provided" });
      return;
    }

    const result = await SqluserModel.logoutUserByToken(token);

    res.clearCookie("token", { path: "/" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to logout user" });
  }
};

// export const GetCurrentUserSessionController = (
//   req: Request,
//   res: Response
// ) => {
//   if (req.session.userId && req.session.email) {
//     res.status(200).json({
//       userId: req.session.userId,
//       email: req.session.email,
//     });
//   } else {
//     res.status(401).json({ error: "No active session" });
//   }
// };
