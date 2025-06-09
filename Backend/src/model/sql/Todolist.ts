import pool from "./mysqlclients";
export const SqlTodoList = {
  async getAllTodoList() {
    const [rows] = await pool.query("SELECT * FROM todolist");
  },

  async createTodoList(title: string, description: string, userId: number) {
    const [result] = await pool.query(
      "INSERT INTO todolist (title, descrition, completed, userId) VALUES (?, ?, false, ?)",
      [title, description, userId]
    );
    return result;
  },
};
