import { Prisma } from "@prisma/client";
import { prisma } from "../Libs/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Email already exists" };
      }
    }
  }
};

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
  try {
    return await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Email already exists" };
      }
    }
  }
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
    },
  });
  return users;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};
