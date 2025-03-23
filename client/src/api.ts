import { Dish } from "./types";
import { User } from "./types";
// Fetch Dish
export const fetchDish = async (): Promise<Dish[]> => {
  try {
    const response = await fetch("http://localhost:3000/dishes");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Dish[] = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//Fetch Dish BY Id
export const fetchDishById = async (id: string): Promise<Dish> => {
  //Fetch the single dish
  try {
    const response = await fetch(`http://localhost:3000/dishes/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Dish = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//Fetch User
export const fetchUser = async (): Promise<User[]> => {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: User[] = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
