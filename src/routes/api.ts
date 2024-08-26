import { Router } from "express";
import { prisma } from "../Libs/prisma";
import { createUser, createUsers } from "../Services/User";
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
    name: "will",
    email: "will@gmail.com",
  });
  res.status(201).json({ user });
});

router.post("/users", async (req, res) => {
  const result = await createUsers([
    { name: "will", email: "jeferçon@gmail.com" },
    { name: "jeferson", email: "jeferçon@gmail.com" },
    { name: "joana", email: "joaninha@gmail.com" },
  ]);
  res.json({ result: result });
});
