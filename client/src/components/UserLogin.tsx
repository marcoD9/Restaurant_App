import { Box, Button, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import { useAuth } from "../AuthContext";
import { LoginResponse, UserLoginProps } from "@/types";
import { fetchUserById } from "@/api";

const UserLogin: React.FC<UserLoginProps> = ({ onClose }) => {
  const { user, setUser, logout } = useAuth();

  const handleLoginSuccess = async (userData: LoginResponse) => {
    try {
      const fetchedUser = await fetchUserById(userData.user.id, userData.token);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleLoginError = (errorMessage: string) => {
    console.error(errorMessage);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="full"
      >
        <Button size="sm" onClick={onClose} ml={2}>
          Close
        </Button>
        {user && (
          <Button colorScheme="red" size="sm" onClick={logout} ml={2}>
            Logout
          </Button>
        )}
      </Box>
      {user ? (
        <Box mt={4} textAlign="center">
          <Text fontWeight="bold" color="black">
            {user.name}
          </Text>
        </Box>
      ) : (
        <Box mt={4}>
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </Box>
      )}
    </>
  );
};

export default UserLogin;
