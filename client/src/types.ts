export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface LoginResponse {
  user: {
    id: string;
  };
  token: string;
}

export interface NewUser {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  price: number;
  time: Date;
  orderStatus: string;
  userId: string;
  orderDishes: string;
}
