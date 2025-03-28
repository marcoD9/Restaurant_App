import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import { fetchDishById } from "../api";
import { Dish } from "../types";
import { Link, useParams } from "react-router-dom";
interface DishDetailsProps {
  id: string;
}
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
      <Button
        className="button-color-primary button"
        _hover={{
          bg: "orange.400",
          color: "white",
        }}
      >
        <Link to="/" aria-label="To the home page">
          <Text fontSize="lg">Back</Text>
        </Link>
      </Button>
      <Box className="center-col">
        <Flex className="center-row">
          <DishCard key={dish.id} dish={dish} showDescription={true} />
        </Flex>
      </Box>
    </div>
  );
};

export default DishDetails;
