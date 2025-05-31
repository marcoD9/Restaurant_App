import { Box, Stack, Heading, Text, Image } from "@chakra-ui/react";
import { Dish } from "../types";

interface DishCardProps {
  dish: Dish;
  showDescription?: boolean; //  Optional prop to toggle description rendering
}

function DishCard({ dish, showDescription = false }: DishCardProps) {
  return (
    <Box
      m={8}
      p={8}
      className="bg-white center-col rounded-lg  max-w-2xl"
      shadow="2px 2px 2px 1px rgba(0, 0, 0, 0.4)"
    >
      <Image
        src={dish.image}
        alt={dish.name}
        boxSize="300px"
        objectFit="cover"
        borderRadius="lg"
        shadow="md" // Aggiunge un'ombra all'immagine
      />
      <Stack mt="6">
        <Heading className="text-color-primary" fontSize="2xl">
          {dish.name}
        </Heading>
        {showDescription ? (
          <Text className="text-color-primary" fontSize="m">
            {dish.description}
          </Text>
        ) : null}{" "}
        {/*Render description only if the prop is true*/}
        <Text className="text-color-primary" fontSize="lg">
          {dish.price}€
        </Text>
      </Stack>
    </Box>
  );
}

export default DishCard;
