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
  }) {
    const { username, email, password } = user;
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    return result;
  },
};
