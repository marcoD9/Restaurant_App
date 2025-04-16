import React, { useState, useEffect } from "react";

import { fetchOrdersByUserId } from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Order } from "@/types";
//import { OrderDish } from "@/types";

const UserOrders: React.FC = () => {
  const { token, user } = useAuth();
  const loggedInUserId = user?.id;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserOrders = async () => {
      if (loggedInUserId && token) {
        setLoading(true);
        setError(null);
        try {
          const fetchedOrders = await fetchOrdersByUserId(
            loggedInUserId,
            token
          );
          setOrders([fetchedOrders].flat());
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
          // ... gestione dell'errore ...
        } finally {
          setLoading(false);
        }
      }
    };
    loadUserOrders();
  }, [loggedInUserId, token]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error loading orders: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found for this user.</div>;
  }

  return (
    <Box>
      <Heading color="black">Your Orders</Heading>
      <Flex>
        {orders.map((order) => (
          <Box
            color="black"
            key={order.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            m={2}
          >
            <Text>Order ID: {order.id}</Text>
            <Text>Order Time: {new Date(order.time).toLocaleString()}</Text>
            <Text>Total Price: ${order.totalPrice}</Text>
            <Text>Status: {order.orderStatus}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default UserOrders;
