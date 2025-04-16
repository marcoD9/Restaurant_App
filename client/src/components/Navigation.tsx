import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Box w="100%" bg="gray.100" p={4} position="relative">
      <Flex justifyContent="space-around" alignItems="center">
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/account")}>Account</Button>
        <Button onClick={() => navigate("/checkout")}>Cart</Button>
        <Button onClick={() => navigate("/contact")}>Contact</Button>
      </Flex>
    </Box>
  );
};

export default Navigation;
