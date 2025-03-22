import { Dish } from "./types";
import { User } from "./types";
// Fetch Dish
export const fetchDish = async (): Promise<Dish[]> => {
  try {
    const dishResponse = await fetch("http://localhost:3000/dishes");
    if (!dishResponse.ok) {
      throw new Error(`HTTP error! status: ${dishResponse.status}`);
    }
    const dishData: Dish[] = await dishResponse.json();
    return dishData;
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
    const userResponse = await fetch("http://localhost:3000/users");
    if (!userResponse.ok) {
      throw new Error(`HTTP error! status: ${userResponse.status}`);
    }
    const userData: User[] = await userResponse.json();
    return userData;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
