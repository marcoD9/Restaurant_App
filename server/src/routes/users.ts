import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import validateResource from "../middlewares/validationMiddleware.ts";
import getUsers from "../services/users/getUsers.ts";
import notFoundErrorHandler from "../middlewares/notFoundErrorHandler.ts";
import getUserById from "../services/users/getUserById.ts";
import createUser from "../services/users/createUser.ts";
import updateUserById from "../services/users/updateUserById.ts";

const router = Router();

// Define type for "User"
interface User {
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
}

// GET all users
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query); // Use req for debug purpose
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
// GET users by Id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: `User with ${id} not found!` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

// POST route to create a new user
router.post(
  "/",
  validateResource<User>({
    username: [body("username").notEmpty().withMessage("Username is required")],
    password: [
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ],
    email: [body("email").isEmail().withMessage("Invalid email address")],
    name: [body("name").notEmpty().withMessage("Name is required")],
    phoneNumber: [
      body("phoneNumber")
        .isMobilePhone("any")
        .withMessage("Invalid phone number"),
    ],
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, name, email, phoneNumber } = req.body;
      const newUser = await createUser(
        username,
        password,
        name,
        email,
        phoneNumber
      );
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//PUT to update user by Id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, name, email, phoneNumber } = req.body;
    const { id } = req.params;
    /* Verifica se i dati richiesti sono validi
    if (!username || !password || !name || !email || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }*/
    const user = await updateUserById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
    });
    if (user) {
      res
        .status(200)
        .send({ message: `User with id ${id} has been updated`, user });
    } else {
      res
        .status(404)
        .json({ message: `User with id ${id} has not been found` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
