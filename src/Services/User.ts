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
    where: {
      Posts: {
        none: {
          title: {
            startsWith: "titulo",
          }
        }
      }
    },
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
  const user = await prisma.user.findFirst({
    where: { email },
  });
  return user;
};

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return post;
};

export const createPost = async (data: Prisma.PostUncheckedCreateInput) => {
  try {
    const post = await prisma.post.create({ data });
    return post;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1002") {
        return {
          error: "Algo de errado aconteceu, tente novamente mais tarde",
        };
      }
    }
  }
};

export const createPosts = async (posts: Prisma.PostUncheckedCreateInput[]) => {
  try {
    return await prisma.post.createMany({
      data: posts,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1002") {
        return {
          error: "Algo de errado aconteceu, tente novamente mais tarde",
        };
      }
    }
  }
};
