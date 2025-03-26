import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import { fetchDishById } from "../api";
import { Dish, DishDetailsProps } from "../types";

import { useParams } from "react-router-dom";

const DishDetails: React.FC<DishDetailsProps> = () => {
  const { id } = useParams(); // Get the dish ID from the URL parameters
  const [dish, setDish] = useState<Dish | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDishById(id ?? "");
        setDish(data);
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
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dish) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/*Dish*/}
      <Box className="center-col">
        <Flex className="center-row">
          <DishCard key={dish.id} dish={dish} showDescription={true} />
        </Flex>
      </Box>
    </div>
  );
};

export default DishDetails;
