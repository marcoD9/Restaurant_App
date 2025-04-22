import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Container, Text } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import { Dish } from "../types";
import { fetchDish } from "../api";

const Home: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/*Image and Name*/}
      <Flex
        direction="column"
        align="center"
        justify="center"
        bgImage="url('/LittleItaly.jpg')"
        bgRepeat="no-repeat"
        bgSize="cover"
        minH="80vh"
        textAlign="center"
        color="white"
        padding={8}
        mb={20}
      ></Flex>
      {/*About Us*/}
      {/*About Us*/}
      <Box className="py-16 bg-gray-100 relative overflow-hidden" minH="500px">
        <Heading
          mt={{ base: 20, md: 24 }}
          mb={{ base: 8, md: 10 }}
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign="center"
          color="gray.800"
        >
          ABOUT US
        </Heading>
        <Box
          className="absolute left-0 top-0 bottom-0 bg-green-500"
          width={{ base: "20px", md: "40px", lg: "60px" }}
        />
        <Box
          className="absolute right-0 top-0 bottom-0 bg-red-500"
          width={{ base: "20px", md: "40px", lg: "60px" }}
        />
        <Container maxW="container.xl" px={{ base: 4, md: 6, lg: 8 }}>
          <Box mt={8} textAlign="left" className="text-color-primary">
            <Text fontSize="lg" m={20} fontStyle="serif">
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

      <Flex direction="column" align="center" mt={20} mb={8}>
        <Heading
          className="text-color-primary transition duration-300 ease-in-out hover:scale-105"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign="center"
          onClick={toggleMenu}
          cursor="pointer"
        >
          DISHES
        </Heading>
        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}

        {isMenuOpen && (
          <Flex className="center-row" wrap="wrap" justify="center" mt={4}>
            {dishes.map((dish) => (
              <Link key={dish.id} to={`/dishes/${dish.id}`}>
                <Box
                  key={dish.id}
                  _hover={{
                    transform: "scale(1.03)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <DishCard dish={dish} />
                </Box>
              </Link>
            ))}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Home;
