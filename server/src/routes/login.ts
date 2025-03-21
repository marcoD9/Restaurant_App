import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }

    // Check if the password matches with the one in our database
    if (password !== user.password) {
      res.status(400).json({ message: "Invalid credentials!" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, secretKey);
    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    console.error("An error ha occurred:", error);
    res.status(500).json({ message: "An error ha occurred while logging in" });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
