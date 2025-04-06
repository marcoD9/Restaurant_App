import { useState, useRef, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserLogin from "./UserLogin";

const Navigation = () => {
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const accountButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (showAccountOptions && accountButtonRef.current) {
      const rect = accountButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 200,
      });
    }
  }, [showAccountOptions]);

  return (
    <Box w="100%" bg="gray.100" p={4} position="relative">
      <Flex justifyContent="space-around" alignItems="center">
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button
          ref={accountButtonRef}
          onClick={() => setShowAccountOptions(!showAccountOptions)}
        >
          Account
        </Button>
        <Button onClick={() => navigate("/checkout")}>Cart</Button>
        <Button>Contacts</Button>
      </Flex>
      {showAccountOptions && (
        <div
          style={{
            position: "absolute",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            backgroundColor: "white",
            padding: "1rem",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            zIndex: 10,
          }}
        >
          <Flex direction={"column"} alignItems="center">
            <Flex justifyContent={"space-around"} width={"100%"}>
              <Button onClick={() => setShowLogin(true)}>Login</Button>
              <Button onClick={() => navigate("/register")}>
                Create Account
              </Button>
            </Flex>
            {showLogin && <UserLogin />}
          </Flex>
        </div>
      )}
    </Box>
  );
};

export default Navigation;
