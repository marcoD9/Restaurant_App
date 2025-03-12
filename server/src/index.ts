import express, { Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/users", async (res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Esegui il server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
