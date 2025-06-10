import { PrismaClient, users_role } from "../../generated/prisma";

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
      where: { id },
    });
  },
};
