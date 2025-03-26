import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import UserCard from "../components/UserCard.tsx";
import { LoginResponse, User } from "../types";
import { fetchUserById } from "../api";
import LoginForm from "@/components/LoginForm.tsx";

const UserLogin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  //Fetch User on successfull login
  const handleLoginSuccess = async (userData: LoginResponse) => {
    try {
      const fetchedUser = await fetchUserById(userData.user.id, userData.token);
      setUser(fetchedUser);
      setLoginError(null);
      setIsLoginFormVisible(false); // Hide form after successful login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("An unknown error occurred.");
      }
    }
  };

  const handleLoginError = (error: string) => {
    setLoginError(error);
  };

  return (
    <div>
      {loginError && <Text color="red">{loginError}</Text>}

      {/*User*/}
      <Box position="absolute" top="1rem" right="1rem">
        {user ? ( // Render user name if logged in
          <Box className="center-col">
            {user && (
              <Box>
                <Flex className="center-row">
                  <UserCard user={user} />
                </Flex>
              </Box>
            )}
          </Box>
        ) : (
          // Othwerwise render login form
          <>
            <Button onClick={() => setIsLoginFormVisible(!isLoginFormVisible)}>
              {isLoginFormVisible ? "Close" : "Login"}{" "}
              {/* Toggles the login form's visibility */}
            </Button>
            {isLoginFormVisible && (
              <Box
                p={4}
                mt={4}
                bg="white"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
              >
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default UserLogin;
