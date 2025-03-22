import { Box, Stack, Heading, Text, Image } from "@chakra-ui/react";
import { Dish } from "../types";

interface DishCardProps {
  dish: Dish;
}

function DishCard({ dish }: DishCardProps) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Image src={dish.image} alt={dish.name} borderRadius="lg" />
      <Stack mt="6">
        <Heading size="md">{dish.name}</Heading>
        <Text>{dish.description}</Text>
        <Text color="blue.600" fontSize="2xl">
          {dish.price}€
        </Text>
      </Stack>
    </Box>
  );
}

export default DishCard;
