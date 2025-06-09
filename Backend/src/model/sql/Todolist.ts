import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const SqlTodoList = {
  async getAllTodoList() {
    return await prisma.todoList.findMany();
  },

  async createTodoList(title: string, description: string, userId: number) {
    return await prisma.todoList.create({
      data: {
        title,
        descrition: description,
        completed: false,
        userId,
      },
    });
  },

  async getTodosByUserId(userId: number) {
    return await prisma.todoList.findMany({
      where: { userId },
    });
  },
};
