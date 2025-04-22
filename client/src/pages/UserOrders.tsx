import React, { useState, useEffect } from "react";
import { fetchOrdersByUserId, fetchDishById } from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Box, Heading, Text, VStack, Image, HStack } from "@chakra-ui/react";
import { Order, Dish } from "@/types";

interface OrderWithDishDetails extends Order {
  dishesDetails: { [dishId: string]: Dish };
}

const UserOrders: React.FC = () => {
  const { token, user } = useAuth();
  const loggedInUserId = user?.id;
  const [ordersWithDetails, setOrdersWithDetails] = useState<
    OrderWithDishDetails[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrdersWithDishDetails = async () => {
      if (loggedInUserId && token) {
        setError(null);
        try {
          const fetchedOrders = await fetchOrdersByUserId(
            loggedInUserId,
            token
          );

          const ordersWithDetailsPromises = (
            fetchedOrders as unknown as Order[]
          ).map(async (order: Order) => {
            const dishesDetails: { [dishId: string]: Dish } = {};
            const dishDetailsPromises = order.orderDishes.map(
              async (orderDish: { dishId: string }) => {
                try {
                  const dish = await fetchDishById(orderDish.dishId);
                  dishesDetails[orderDish.dishId] = dish;
                } catch (error) {
                  console.error(
                    `Failed to fetch details for dish ID ${orderDish.dishId}:`,
                    error
                  );
                }
              }
            );
            await Promise.all(dishDetailsPromises);
            return { ...order, dishesDetails };
          });

          const ordersWithFullDetails: OrderWithDishDetails[] =
            await Promise.all(
              ordersWithDetailsPromises as Promise<OrderWithDishDetails>[]
            );
          setOrdersWithDetails(ordersWithFullDetails);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred.");
          }
        }
      }
    };
    loadOrdersWithDishDetails();
  }, [loggedInUserId, token]);

  if (error) {
    return (
      <Box className="center-rowd">
        <Text color="black" margin={4}>
          Error loading orders: {error}
        </Text>
      </Box>
    );
  }

  if (!ordersWithDetails || ordersWithDetails.length === 0) {
    return (
      <Box className="center-row">
        <Text className="text-color-primary" margin={4}>
          No orders found for this user.
        </Text>{" "}
      </Box>
    );
  }

  return (
    <Box className="center-col">
      <Heading className="text-color-primary" my={4}>
        Your Orders
      </Heading>
      <VStack align="stretch">
        {ordersWithDetails.map((order) => (
          <Box
            key={order.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            className="text-color-primary"
          >
            <Text fontWeight="bold">Order ID: {order.id}</Text>
            <Text>Order Time: {new Date(order.time).toLocaleString()}</Text>
            <Text>Total Price: ${order.totalPrice}</Text>
            <Text>Status: {order.orderStatus}</Text>

            {order.orderDishes && order.orderDishes.length > 0 && (
              <Box mt={2}>
                <Text fontWeight="bold">Dishes:</Text>
                <VStack align="start" ml={4}>
                  {order.orderDishes.map((item) => {
                    const dishDetails = order.dishesDetails[item.dishId];
                    return dishDetails ? (
                      <HStack key={item.dishId}>
                        <Image
                          src={dishDetails.image}
                          alt={dishDetails.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <Text>
                          {dishDetails.name} - Quantity: {item.quantity} -
                          Price: ${dishDetails.price}
                        </Text>
                      </HStack>
                    ) : (
                      <Text key={item.dishId}>Loading dish details...</Text>
                    );
                  })}
                </VStack>
              </Box>
            )}
            {order.orderDishes && order.orderDishes.length === 0 && (
              <Text mt={2}>No dishes in this order.</Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default UserOrders;
