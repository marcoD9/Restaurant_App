import { Router, Request, Response, NextFunction } from "express";
import validateFields from "../middlewares/validationMiddleware.ts";
import getOrders from "../services/orders/getOrders.ts";
import getOrderById from "../services/orders/getOrderById.ts";
import createOrder from "../services/orders/createOrder.ts";
import deleteOrderById from "../services/orders/deleteOrderById.ts";
import updateOrderById from "../services/orders/updateOrderById.ts";

const router = Router();

// GET all orders
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query); // Use req for debug purpose
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});
// GET orders by Id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      res.status(404).json({ message: `Order with ${id} not found!` });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    next(error);
  }
});

// POST route to create a new order
router.post(
  "/",
  validateFields(["time", "orderStatus", "userId", "orderDishes"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { time, orderStatus, userId, orderDishes } = req.body;
      const newOrder = await createOrder(
        time,
        orderStatus,
        userId,
        orderDishes
      );
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

//PUT to update order by Id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { time, orderStatus, orderDishes } = req.body;
    const { id } = req.params;

    const order = await updateOrderById(id, {
      time,
      orderStatus,
      orderDishes,
    });
    if (order) {
      res
        .status(200)
        .send({ message: `Order with id ${id} has been updated`, order });
    } else {
      res
        .status(404)
        .json({ message: `Order with id ${id} has not been found` });
    }
  } catch (error) {
    next(error);
  }
});

//DELETE order by Id
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = await deleteOrderById(id);
      if (order) {
        res.status(200).send({
          message: `Order with id ${id} successfully deleted!`,
          order,
        });
      } else {
        res.status(404).json({ message: `Order with id ${id} not found` });
      }
    } catch (error) {
      next(error);
    }
  }
);
export default router;
