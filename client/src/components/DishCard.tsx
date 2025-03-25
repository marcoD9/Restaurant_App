import { Box, Stack, Heading, Text, Image } from "@chakra-ui/react";
import { Dish } from "../types";

interface DishCardProps {
  dish: Dish;
  showDescription?: boolean; //  Optional prop to toggle description rendering
}

function DishCard({ dish, showDescription = false }: DishCardProps) {
  return (
    <Box
      className=" bg-amber-100"
      maxW="3xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
    >
      <Image src={dish.image} alt={dish.name} borderRadius="lg" />
      <Stack mt="6">
        <Heading color="black" size="md">
          {dish.name}
        </Heading>
        {showDescription ? <Text color="black">{dish.description}</Text> : null}{" "}
        {/*Render description only if the prop is true*/}
        <Text color="blue.400" fontSize="2xl">
          {dish.price}€
        </Text>
      </Stack>
    </Box>
  );
}

export default DishCard;
