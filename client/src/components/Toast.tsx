import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "!";
      case "info":
        return "ℹ️";
      default:
        return "✓";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
      case "info":
        return "bg-blue-100";
      default:
        return "bg-green-100";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "green.500";
      case "error":
        return "red.500";
      case "info":
        return "blue.500";
      default:
        return "green.500";
    }
  };

  return (
    visible && (
      <Box
        position="fixed"
        bottom="5"
        left="50%"
        transform="translateX(-50%)"
        p="4"
        borderRadius="md"
        shadow="lg"
        color="gray.800"
        className={getBgColor()}
      >
        <Flex align="center">
          <Text mr="2" color={getIconColor()}>
            {getIcon()}
          </Text>
          <Text>{message}</Text>
        </Flex>
      </Box>
    )
  );
};

export default Toast;
