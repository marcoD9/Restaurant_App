import express from "express";
import usersRouter from "./routes/users.ts";
const app = express();

app.use(express.json());

app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
app.use(express.json());
