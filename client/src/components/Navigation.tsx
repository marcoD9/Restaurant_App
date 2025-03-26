import { useState } from "react";
import { Box, Icon, Text, Flex } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import UserLogin from "./UserLogin";

const Navigation = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { user } = useAuth();

  return (
    <Box
      bgColor={isClicked ? "gray.300" : "gray.200"}
      p={4}
      width={isClicked ? "auto" : "24"}
      height="auto"
      transition="all 0.3s ease-in-out"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      right="1rem"
      top="1rem"
      borderRadius="md"
      boxShadow="md"
      zIndex={9999}
    >
      {isClicked ? (
        <UserLogin onClose={() => setIsClicked(false)} />
      ) : user ? (
        <Flex align="center">
          <Text mr={2} fontWeight="bold" color="black">
            {user.name}
          </Text>
          <Icon as={FaUser} boxSize={6} onClick={() => setIsClicked(true)} />
        </Flex>
      ) : (
        <Icon as={FaUser} boxSize={6} onClick={() => setIsClicked(true)} />
      )}
    </Box>
  );
};

export default Navigation;
