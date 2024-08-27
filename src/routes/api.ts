import { Router } from "express";
import { prisma } from "../Libs/prisma";
import { createUser, createUsers, getAllUsers, getUserByEmail } from "../Services/User";
import { count, error } from "console";

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
    name: "will2",
    email: "will2@gmail.com",
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
    { name: "will", email: "jeferçon@gmail.com" },
    { name: "jeferson", email: "on@gmail.com" },
    { name: "joana", email: "joaninha@gmail.com" },
  ]);
  res.json({ result: result });
});

router.get("/users", async (req, res) => {
  const result = await getAllUsers();
  res.json({ result: result });
});

router.get("/user", async(req, res) => {
  const result = await getUserByEmail('william@gmail.com');
  res.json(result);
})