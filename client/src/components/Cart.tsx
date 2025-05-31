import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Box, Button, Input } from "@chakra-ui/react";

interface CartProps {
  dishId: string;
}

const Cart: React.FC<CartProps> = ({ dishId }) => {
  const { addToCart, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(1); // State for quantity

  const handleAddToCart = () => {
    addToCart(dishId, quantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(dishId);
  };

  return (
    <Box className="center-row" p={4} gap={4}>
      <Input
        className="text-color-primary"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min={1}
        max={100}
        width="80px"
      />
      <Button
        className="button"
        onClick={handleAddToCart} //Style for hover
        _hover={{
          transform: "scale(1.05)",
          cursor: "pointer",
        }}
        transition="all 0.2s ease-in-out"
      >
        Add
      </Button>
      <Button
        className="button"
        onClick={handleRemoveFromCart} //Style for hover
        _hover={{
          transform: "scale(1.05)",
          cursor: "pointer",
        }}
        transition="all 0.2s ease-in-out"
      >
        Remove Item
      </Button>
    </Box>
  );
};

export default Cart;
