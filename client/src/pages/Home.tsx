import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import UserCard from "../components/UserCard.tsx";
import { Dish, LoginResponse, User } from "../types";
import { fetchDish, fetchUserById } from "../api";
import LoginForm from "@/components/LoginForm.tsx";

const Home: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  //Fetch Dishes
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDish();
        setDishes(data);
        setError(null);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    loadData();
  }, []);
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
      {error && <Text color="red">{error}</Text>}
      {loginError && <Text color="red">{loginError}</Text>}
      <Box className="center-col">
        <Heading
          className="text-4xl text-black font-bold mb-8"
          as="h1"
          size="2xl"
        >
          Restaurant
        </Heading>
        {/*Dish*/}
        <Flex className="center-col">
          {dishes.map((dish) => (
            <Link key={dish.id} to={`/dishes/${dish.id}`}>
              <DishCard key={dish.id} dish={dish} />
            </Link>
          ))}
        </Flex>
      </Box>
      {/*User*/}
      <Box position="absolute" top="1rem" right="1rem">
        {user ? ( // Render user name if logged in
          <Text color="black">Welcome, {user.name}!</Text>
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

      <Box className="center-col">
        {user && (
          <Box>
            <Heading className="text-xl" size="sm">
              User:
            </Heading>
            <Flex className="center-row">
              <UserCard user={user} />
            </Flex>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Home;
