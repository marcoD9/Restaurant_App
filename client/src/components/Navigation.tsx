import { useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaTimes, FaUser } from "react-icons/fa";
import UserLogin from "@/pages/UserLogin";
function Navigation() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Box
      bgColor={isClicked ? "gray.300" : "gray.200"}
      p={isClicked ? 4 : 2}
      width={isClicked ? "98vw" : "16"}
      height={16}
      transition="all 0.3s ease-in-out"
      display="flex"
      alignItems="center"
      justifyContent={isClicked ? "space-between" : "center"}
      position="fixed"
      right="1rem"
      top="1rem"
      borderRadius="md"
      marginLeft={isClicked ? "1rem" : "0"}
    >
      {isClicked ? (
        <>
          <Icon
            as={FaTimes}
            aria-label="Chiudi"
            onClick={() => setIsClicked(false)}
            size="sm"
            mr={4}
          />
          <Box flex="1">
            <UserLogin />
          </Box>
        </>
      ) : (
        <Icon as={FaUser} boxSize={6} onClick={() => setIsClicked(true)} />
      )}
    </Box>
  );
}

export default Navigation;
