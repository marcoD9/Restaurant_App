import { Outlet } from "react-router-dom";
import Navigation from "./Navigation.tsx";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box>
      <Navigation />
      <Outlet />
    </Box>
  );
};
