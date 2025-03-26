import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import { Dish } from "../types";
import { fetchDish } from "../api";

const Home: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const [error, setError] = useState<string | null>(null);

  //Fetch Dishes
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

  return (
    <div>
      {error && <Text color="red">{error}</Text>}

      <Box className="center-col">
        <Heading
          className="text-4xl text-black font-bold mb-8"
          as="h1"
          size="2xl"
        >
          Restaurant
        </Heading>
        {/*Dish*/}
        <Flex className="center-col">
          {dishes.map((dish) => (
            <Link key={dish.id} to={`/dishes/${dish.id}`}>
              <DishCard key={dish.id} dish={dish} />
            </Link>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
