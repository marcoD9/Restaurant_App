import { Dish, LoginResponse, NewUser, User } from "./types";
// GET Dish
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

// GET Dish BY Id
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

//GET User By Id
export const fetchUserById = async (
  id: string,
  token: string
): Promise<User> => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch User");
    }

    const data: User = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//Login
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

//Logout
export const logout = () => {
  // Remove the token from localStorage
  localStorage.removeItem("authToken");
};

//POST User
export const createAccount = async (
  username: string,
  password: string,
  name: string,
  email: string,
  phoneNumber: string
): Promise<NewUser> => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name, email, phoneNumber }),
    });
    if (!response.ok) {
      throw new Error("Failed creating user.");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
