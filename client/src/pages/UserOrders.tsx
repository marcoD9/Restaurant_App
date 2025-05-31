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
      <Box className="center-col">
        <Text className="text-color-primary" m={4}>
          Error loading orders: {error}
        </Text>
      </Box>
    );
  }

  if (!ordersWithDetails || ordersWithDetails.length === 0) {
    return (
      <Box className="center-col">
        <Text className="text-color-primary" m={4}>
          No orders found for this user.
        </Text>{" "}
      </Box>
    );
  }

  return (
    <Box
      className="center-col"
      mx="auto"
      width={{ base: "90%", md: "70%", lg: "500px" }}
      padding="16px"
      borderRadius="8px"
      borderWidth="2px"
      bg="white"
      shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
    >
      <Heading className="text-color-primary" m={4} fontWeight={"bold"}>
        Your Orders
      </Heading>
      <VStack align="stretch">
        {ordersWithDetails.map((order) => (
          <Box
            key={order.id}
            className="border border-gray-200 rounded-lg text-color-primary"
            p={4}
          >
            <Text>
              <Text fontWeight="bold" as="span">
                Order ID:{" "}
              </Text>{" "}
              {order.id}
            </Text>
            <Text>
              <Text fontWeight="bold" as="span">
                Order Time:
              </Text>{" "}
              {new Date(order.time).toLocaleString()}
            </Text>
            <Text>
              <Text fontWeight="bold" as="span">
                Total Price:
              </Text>{" "}
              <Text as="span" className="text-color-price">
                ${order.totalPrice}
              </Text>
            </Text>
            <Text>
              <Text fontWeight="bold" as="span">
                Status:{" "}
              </Text>
              {order.orderStatus}
            </Text>

            {order.orderDishes && order.orderDishes.length > 0 && (
              <Box mt={2}>
                <Text fontWeight="bold">Dishes:</Text>
                <VStack className="items-start" ml={4}>
                  {order.orderDishes.map((item) => {
                    const dishDetails = order.dishesDetails[item.dishId];
                    return dishDetails ? (
                      <HStack key={item.dishId}>
                        <Image
                          src={dishDetails.image}
                          alt={dishDetails.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <Text className="text-color-price">
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
