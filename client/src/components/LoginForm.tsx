import React, { useState } from "react";
import { Input, Button, VStack, Box, Heading } from "@chakra-ui/react";
import { LoginFormProps, LoginResponse } from "@/types";
import { login } from "@/api";

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData: LoginResponse = await login(username, password);
      await onLoginSuccess(userData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError("An unknown error occurred.");
      }
    }
  };

  return (
    <Box p={8} borderWidth="1px" borderRadius="lg" width="400px">
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack>
          <div>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "4px", color: "black" }}
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              color="black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "4px", color: "black" }}
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              color="black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button colorScheme="blackAlpha" width="full" type="submit">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
