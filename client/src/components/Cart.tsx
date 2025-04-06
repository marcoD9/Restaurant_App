import React from "react";
import { useCart } from "../contexts/CartContext";
import { Box, Button } from "@chakra-ui/react";

interface CartProps {
  dishId: string;
}

const Cart: React.FC<CartProps> = ({ dishId }) => {
  const { addToCart, removeFromCart, decreaseQuantity } = useCart();

  const handleAddToCart = () => {
    addToCart(dishId, 1);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(dishId);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(dishId);
  };

  return (
    <Box display="flex" flexDirection="row" p={4} gap={4}>
      <Button onClick={handleAddToCart}>Add</Button>
      <Button onClick={handleDecreaseQuantity}>Decrease</Button>
      <Button onClick={handleRemoveFromCart}>Remove</Button>
    </Box>
  );
};

export default Cart;
