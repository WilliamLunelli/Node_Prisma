import { Prisma } from "@prisma/client";
import { prisma } from "../Libs/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
  const result = await prisma.user.upsert({
    where: { email: data.email },
    update: {},
    create: data
  })

  return result;
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
  let page = 1;
  let perPage = 2
  let skip = (page - 1) * perPage

  const users = await prisma.user.findMany({
    skip: skip,
    take: 2,
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

export const updateUser = async () => {
  const updatedUser = await prisma.user.update({
    where: {
      id: 1
    },
    data: {
      name: 'William Lunelli',
      role: 'Admin'
    }
  });
  return updatedUser
}

export const updateUsers = async () => {
  const updatedUsers = await prisma.user.updateMany({
    data: {
      status: true
    }
  });
  return updatedUsers
}

export const deleteUser = async () => {
  const deletedUser = await prisma.user.delete({
    where:{
      id: 36,
    }
  });
  
  return deletedUser;
}