import { PrismaClient, users_role, login } from "../../generated/prisma";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export const SqluserModel = {
  async GetAllUser() {
    return await prisma.users.findMany();
  },

  async CreateUsers(user: {
    username: string;
    email: string;
    password: string;
    Role: users_role;
  }) {
    return await prisma.users.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.Role,
      },
    });
  },

  async GetUserById(id: number) {
    return await prisma.users.findUnique({
      where: { id: id.toString() },
    });
  },

  async deleteUserAndTodos(userId: number) {
    return await prisma.$transaction(async (prisma) => {
      // Delete todos first
      await prisma.todolist.deleteMany({
        where: { userId: userId.toString() },
      });

      // Then delete the user
      await prisma.users.delete({
        where: { id: userId.toString() },
      });

      return {
        message: `User ${userId} and their todos deleted successfully.`,
      };
    });
  },

  async checkUserCredentials(email: string, password: string) {
    const user = await prisma.users.findFirst({
      where: { email, password },
    });

    if (!user) return null;

    await prisma.login.deleteMany({
      where: { id: user.id },
    });

    const token = randomUUID();

    await prisma.login.create({
      data: {
        id: user.id,
        email,
        password,
        token,
        userId: user.id,
      },
    });

    return { user, token };
  },

  async GetAllLoggedInUsers() {
    return await prisma.login.findMany();
  },

  async logoutUserByToken(token: string) {
    await prisma.login.deleteMany({
      where: { token },
    });
    return { message: "User logged out successfully." };
  },
};
