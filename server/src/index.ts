import express from "express";
import usersRouter from "./routes/users.ts";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler.ts";
import log from "./middlewares/logMiddleware.ts";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(log);

app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
