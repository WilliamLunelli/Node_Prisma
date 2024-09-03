import { Router } from "express";
import { prisma } from "../Libs/prisma";
import {
  createPost,
  createPosts,
  createUser,
  createUsers,
  getAllUsers,
  getPostById,
  getUserByEmail,
  updateUser,
  updateUsers,
} from "../Services/User";
import { count, error } from "console";
import { title } from "process";

const router = Router();

export default router;

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

router.get("/test", (req, res) => {
  res.json({ testado: true });
});

router.post("/user", async (req, res) => {
  //Validar dados recebidos
  const user = await createUser({
    name: "testador 1",
    email: "testador1@gmail.com",
    Posts: {
      create: {
        title: "Teste de post",
        body: "Corpo de teste",
      },
    },
  });
  res.status(201).json({ user });
});

router.post("/users", async (req, res) => {
  const result = await createUsers([
    { name: "will", email: "jeferçon@hotmail.com" },
    { name: "jeferson", email: "on@hotmail.com" },
    { name: "joana", email: "joaninha@hotmail.com" },
  ]);
  res.json({ result: result });
});

router.get("/users", async (req, res) => {
  const result = await getAllUsers();
  res.json({ result: result });
});

router.get("/user", async (req, res) => {
  const result = await getUserByEmail("william@gmail.com");
  res.json(result);
});

router.get("/post", async (req, res) => {
  const result = await getPostById(1);
});

router.post("/post", async (req, res) => {
  const result = await createPost({
    userID: 1,
    title: "testezinho de post",
    body: "corpo de post",
  });

  res.json(result);
});

router.post("/posts", async (req, res) => {
  const result = await createPosts([
    { userID: 1, title: "teste denovo", body: "pao de batata e massa" },
    { userID: 1, title: "teste denovo", body: "pao de batata e massa" },
    { userID: 1, title: "teste denovo", body: "pao de batata e massa" },
  ]);
  res.json(result);
});

router.put('/user', async (req, res) => {
  const result = await updateUser();
  res.json( {result} )
})

router.put('/users', async (req, res) => {
  const result = await updateUsers();
  res.json( {result} )
})