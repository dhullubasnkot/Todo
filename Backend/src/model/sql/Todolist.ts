import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const SqlTodoList = {
  async getAllTodoList() {
    return await prisma.todolist.findMany();
  },

  async createTodoList(title: string, description: string, userId: number) {
    return await prisma.todolist.create({
      data: {
        title,
        descrition: description,
        completed: false,
        userId,
      },
    });
  },

  async getTodosByUserId(userId: number) {
    return await prisma.todolist.findMany({
      where: { userId },
    });
  },
};
