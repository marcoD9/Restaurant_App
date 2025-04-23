import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Container, Text } from "@chakra-ui/react";
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
      {/*Image and Name*/}
      <Flex
        className="center-col bg-no-repeat bg-cover min-h-[80vh] text-center text-white"
        mb={12}
        style={{ backgroundImage: "url('/img/LittleItaly.jpg')" }}
      ></Flex>
      {/*About Us*/}
      <Box className="bg-gray-100 relative overflow-hidden min-h-[30vh]">
        <Heading
          className="text-color-primary text-center"
          fontSize={["xl", "2xl", "3xl"]}
          fontWeight={"bold"}
        >
          ABOUT US
        </Heading>
        <Box className="absolute left-0 top-0 bottom-0 bg-green-500 w-[20px] md:w-[40px] lg:w-[60px]" />
        <Box className="absolute right-0 top-0 bottom-0 bg-red-500 w-[20px] md:w-[40px] lg:w-[60px]" />
        <Container className="max-w-7xl ">
          <Box className="text-left text-color-primary">
            <Text fontWeight={"thin"} my={20}>
              Step into Little Italy, your authentic neighborhood trattoria.
              We're passionate about bringing the true flavors of Italy to your
              table, using fresh, high-quality ingredients and time-honored
              recipes passed down through generations. From classic pasta dishes
              to wood-fired pizzas and delectable desserts, experience the
              warmth and joy of Italian dining with us.
            </Text>
          </Box>
        </Container>
      </Box>
      {/*Dish*/}

      <Flex className="center-col" my={12}>
        <Heading
          className="text-color-primary text-center"
          fontSize={["xl", "2xl", "3xl"]}
          fontWeight={"bold"}
        >
          DISHES
        </Heading>
        {error && (
          <Text className="text-red-500" mt={8}>
            {error}
          </Text>
        )}
        <Flex className="flex-wrap justify-center " mt={8}>
          {dishes.map((dish) => (
            <Link key={dish.id} to={`/dishes/${dish.id}`}>
              <Box
                key={dish.id}
                className="hover:scale-103 transition-transform duration-200 ease-in-out"
              >
                <DishCard dish={dish} />
              </Box>
            </Link>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
