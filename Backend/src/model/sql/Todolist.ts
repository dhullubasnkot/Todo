import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const SqlTodoList = {
  async getAllTodoList() {
    return await prisma.todolist.findMany();
  },

  async getTodoListById(id: number) {
    return await prisma.todolist.findUnique({
      where: { id },
    });
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
  async updateTaskPrisma(data: {
    id: number;
    title: string;
    descrition: string;
    completed: boolean;
    userId: number;
  }) {
    return await prisma.todolist.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        descrition: data.descrition,
        completed: data.completed,
        userId: data.userId,
      },
    });
  },

  async deleteTaskPrisma(id: number) {
    return await prisma.todolist.delete({
      where: {
        id: id,
      },
    });
  },
};
