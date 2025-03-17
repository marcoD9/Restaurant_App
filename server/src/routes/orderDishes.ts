import { Router, Request, Response, NextFunction } from "express";
import getOrdersDishes from "../services/orderDishes.ts/getOrdersDishes.ts";
import deleteOrderDishesById from "../services/orderDishes.ts/deleteOrderDishesById.ts";
import getOrderDishesById from "../services/orderDishes.ts/getOrderDishesById.ts";
import validateFields from "../middlewares/validationMiddleware.ts";
import createOrderDishes from "../services/orderDishes.ts/createOrderDishes.ts";
import updateOrderDishesById from "../services/orderDishes.ts/updateOrderDishesById.ts";

const router = Router();

//GET all orderDishes
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params);
    const ordersDishes = await getOrdersDishes();
    res.json(ordersDishes);
    return;
  } catch (error) {
    next(error);
  }
});
// GET orderDishes by Id
router.get(
  "/:orderId/dishes/:dishId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, dishId } = req.params;
      const orderDishes = await getOrderDishesById(orderId, dishId);
      if (!orderDishes) {
        res.status(404).json({
          message: `Dish with id ${dishId} of Order ${orderId} not found`,
        });
      }
      res.json(orderDishes);
    } catch (error) {
      next(error);
    }
  }
);

// POST route to create a new orderDishes
router.post(
  "/",
  validateFields(["orderId", "dishId", "quantity"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, dishId, quantity } = req.body;
      const newDish = await createOrderDishes(orderId, dishId, quantity);
      res.status(201).json(newDish);
    } catch (error) {
      next(error);
    }
  }
);

//PUT to update dish by Id
router.put(
  "/:orderId/dishes/:dishId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { quantity } = req.body;
      const { orderId, dishId } = req.params;

      const orderDish = await updateOrderDishesById(orderId, dishId, quantity);

      if (orderDish) {
        res.status(200).send({
          message: `Dish with id ${dishId} of Order ${orderId} has been updated`,
          orderDish,
        });
      } else {
        res.status(404).json({
          message: `Dish with id ${dishId} of Order ${orderId} has not been found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//DELETE dish by Id
router.delete(
  "/:orderId/dishes/:dishId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, dishId } = req.params;
      const orderDishes = await deleteOrderDishesById(orderId, dishId);
      if (orderDishes) {
        res.status(200).send({
          message: `Dish with id ${dishId} of Order ${orderId} successfully deleted!`,
          orderDishes,
        });
      } else {
        res.status(404).json({
          message: `Dish with id ${dishId} of Order ${orderId} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
