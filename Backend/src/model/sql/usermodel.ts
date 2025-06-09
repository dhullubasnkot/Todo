import { Role } from "../../generated/prisma";
import pool from "./mysqlclients";

export const SqluserModel = {
  async GetAllUser() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  async CreateUsers(user: {
    username: string;
    email: string;
    password: string;
    Role: String;
  }) {
    const { username, email, password, Role } = user;
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password, Role) VALUES (?, ?, ?, ?)",
      [username, email, password, Role]
    );
    return result;
  },

  async GetUserById(id: number) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return (rows as any[])[0];
  },
};
