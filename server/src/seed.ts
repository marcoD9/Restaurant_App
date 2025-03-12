import { PrismaClient } from "@prisma/client";
import * as fs from "fs/promises";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed Users
    const users = JSON.parse(await fs.readFile("./data/users.json", "utf8"));
    for (const user of users) {
      await prisma.user.create({ data: user });
    }

    // Seed Dishes
    const dishes = JSON.parse(await fs.readFile("./data/dishes.json", "utf8"));
    for (const dish of dishes) {
      await prisma.dish.create({ data: dish });
    }

    // Seed Orders
    const orders = JSON.parse(await fs.readFile("./data/orders.json", "utf8"));
    for (const order of orders) {
      await prisma.order.create({ data: order });
    }

    //Seed OrderDishes
    const orderDishes = JSON.parse(
      await fs.readFile("./data/orderDishes.json", "utf8")
    );
    for (const orderDish of orderDishes) {
      await prisma.orderDish.create({ data: orderDish });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
