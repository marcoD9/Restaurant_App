import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

interface ErrorToastProps {
  errorMessage: string;
}

const ErrorToast = ({ errorMessage }: ErrorToastProps) => {
  useEffect(() => {
    if (errorMessage) {
      toaster.create({
        title: "Error!",
        description: errorMessage,
        type: "error",
      });
    }
  }, [errorMessage]);

  return null;
};

export default ErrorToast;
