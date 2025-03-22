import React, { useState, useEffect } from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import UserCard from "../components/UserCard.tsx";
import { Dish } from "../types";
import { User } from "../types";
import { fetchDish } from "../api";
import { fetchUser } from "../api";

const Home: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  //Fetch Dish
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDish();
        setDishes(data);
        setError(null);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    loadData();
  }, []);
  //Fetch User
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUser();
        setUsers(data);
        setError(null);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    loadData();
  }, []);

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <div>
      {/*Dishes*/}
      <Box className="flex flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
        <Heading className="text-4xl font-bold mb-8" as="h1" size="2xl">
          Dishes:
        </Heading>
        <Flex className="flex-row flex-wrap justify-center gap-4 w-full">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </Flex>
      </Box>
      {/*Users*/}
      <Box className="flex flex-row items.center justify-center">
        <Heading className="text-xl" size="sm">
          Users:
        </Heading>
        <Flex className="flex-row flex-wrap justify-center">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
