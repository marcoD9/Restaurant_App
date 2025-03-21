import React, { useState, useEffect } from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";

interface Dish {
  name: string;
}

const Home: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/dishes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Dish[] = await response.json();
        setNames(data.map((dish) => dish.name));
      } catch (e: unknown) {
        if (e instanceof Error) {
          return <Text color="red.500">Error: {e.message}</Text>;
        } else {
          return <Text color="red.500">An unknown error occurred.</Text>;
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
        p={4}
      >
        <Heading as="h1" size="2xl" mb={8}>
          Dishes:
        </Heading>
        <Flex direction="column" className="w-64">
          {names.map((name, index) => (
            <Flex
              key={index}
              className="bg-white rounded-md shadow-md p-4 mb-2"
              alignItems="center"
            >
              {name}
            </Flex>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
