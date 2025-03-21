import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.ts";
import dishesRouter from "./routes/dishes.ts";
import ordersRouter from "./routes/orders.ts";
import orderDishesRouter from "./routes/orderDishes.ts";
import loginRouter from "./routes/login.ts";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler.ts";
import log from "./middlewares/logMiddleware.ts";

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(log);

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishesRouter);
app.use("/orders", ordersRouter);
app.use("/orderDishes", orderDishesRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
