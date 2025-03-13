import { Router, Request, Response, NextFunction } from "express";
import getUsers from "../services/users/getUsers.ts";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query); // use req to avoid error for unused variables
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
