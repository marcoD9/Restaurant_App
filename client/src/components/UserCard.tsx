import { Box, Stack, Text } from "@chakra-ui/react";
import { User } from "../types";

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  return (
    <Box>
      <Stack>
        <Text color="black">{user.name}</Text>
      </Stack>
    </Box>
  );
}

export default UserCard;
