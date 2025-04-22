import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Box w="full" bg="white" p={4} position="sticky" top={0} zIndex={10}>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => navigate("/")}
          style={{
            backgroundImage:
              "linear-gradient(to right, green 33%, white 33% 66%, red 66%)",
            padding: "8px",
          }}
        >
          <Box padding={{ base: 2, md: 8 }}>
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl", lg: "4xl" }}
              fontWeight="bold"
              mb={0}
              textShadow="2px 2px rgba(255, 255, 255, 1.0)"
              className="text-black"
            >
              LITTLE ITALY
            </Heading>
          </Box>
        </Button>

        {/* Button for mobile menu */}
        <Button
          display={{ base: "block", md: "none" }}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Open Menu" : "Close Menu"}
          bg="black"
          color="white"
        >
          {isMobileMenuOpen ? "CLOSE" : "MENU"}
        </Button>

        {/* Nav links */}
        <Stack
          direction="row"
          align="center"
          display={{ base: "none", md: "flex" }}
          ml={4}
        >
          <Button bg="black" color="white" onClick={() => navigate("/account")}>
            ACCOUNT
          </Button>
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/checkout")}
          >
            CART
          </Button>
          <Button bg="black" color="white" onClick={() => navigate("/contact")}>
            CONTACT
          </Button>
        </Stack>
      </Flex>

      {/* Menu */}
      {isMobileMenuOpen && (
        <Stack
          mt={4}
          align="center"
          display={{ base: "flex", md: "none" }}
          direction="column"
        >
          <Button bg="black" color="white" onClick={() => navigate("/account")}>
            ACCOUNT
          </Button>
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/checkout")}
          >
            CART
          </Button>
          <Button bg="black" color="white" onClick={() => navigate("/contact")}>
            CONTACT
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Navigation;
