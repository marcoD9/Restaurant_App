import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { fetchDishById } from "../api";
import { Dish } from "../types";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";

const Checkout: React.FC = () => {
  const { cartItems, createOrderFromCart, removeFromCart, clearCart } =
    useCart();
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

    if (cartItems.length > 0) {
      fetchDishDetails();
    } else {
      setDishDetails([]);
      setTotalPrice(0);
    }
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

  const handleRemoveItem = (dishId: string) => {
    removeFromCart(dishId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Flex direction="column" align="center" minH="100vh">
      <Box maxW="md" p={4}>
        <Heading color="black">Checkout</Heading>
        {dishDetails.length > 0 ? (
          <Stack>
            {dishDetails.map((dish, index) => (
              <Flex key={dish.id} align="center">
                <Image src={dish.image} alt={dish.name} boxSize="50px" mr={4} />
                <Text color="black">
                  {dish.name} - Quantity: {cartItems[index]?.quantity || 0}
                </Text>
                <Button onClick={() => handleRemoveItem(dish.id)} ml="auto">
                  Remove
                </Button>
              </Flex>
            ))}
            <Text color="black">Total: {totalPrice}€</Text>
          </Stack>
        ) : (
          <Box>
            <Text color="black">Your cart is empty.</Text>
          </Box>
        )}
        {dishDetails.length > 0 && (
          <Flex direction="column">
            <Button onClick={handleCheckout}>Place Order</Button>
            <Button onClick={handleClearCart} mt={4}>
              Clear Cart
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Checkout;
