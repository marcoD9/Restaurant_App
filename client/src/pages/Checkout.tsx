import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { fetchDishById } from "../api";
import { Dish } from "../types";
import { Box, Heading, Text, Stack, Button, Flex } from "@chakra-ui/react";

const Checkout: React.FC = () => {
  const { cartItems, createOrderFromCart } = useCart();
  const [dishDetails, setDishDetails] = useState<Dish[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const details = await Promise.all(
          cartItems.map((item) => fetchDishById(item.dishId))
        );
        setDishDetails(details);

        const total = details.reduce((acc, dish, index) => {
          return acc + dish.price * cartItems[index].quantity;
        }, 0);
        setTotalPrice(total);
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          throw new Error("Failed to fetch dish details.");
        }
      }
    };

    fetchDishDetails();
  }, [cartItems]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const time = new Date();

    if (token && userId) {
      const order = await createOrderFromCart(token, time, userId);
      if (order) {
        console.log("Order created:", order);
      }
    } else {
      console.error("Token or userId not found");
    }
  };

  return (
    <Flex direction="column" align="center" minH="100vh">
      <Box maxW="md" p={4}>
        <Heading color="black">Checkout</Heading>
        {dishDetails.length > 0 ? (
          <Stack>
            {dishDetails.map((dish, index) => (
              <Box key={dish.id}>
                <Text color="black">
                  {dish.name} - Quantity: {cartItems[index].quantity}
                </Text>
              </Box>
            ))}
            <Text color="black">Total: {totalPrice}€</Text>
          </Stack>
        ) : (
          <Box>
            <Text color="black">Your cart is empty.</Text>
          </Box>
        )}
        {dishDetails.length > 0 && (
          <Button onClick={handleCheckout}>Place Order</Button>
        )}
      </Box>
    </Flex>
  );
};

export default Checkout;
