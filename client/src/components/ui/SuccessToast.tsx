import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

interface SuccessToastProps {
  successMessage: string;
}

const SuccessToast = ({ successMessage }: SuccessToastProps) => {
  useEffect(() => {
    if (successMessage) {
      toaster.create({
        title: "Success!",
        description: successMessage,
        type: "success",
      });
    }
  }, [successMessage]);

  return null;
};

export default SuccessToast;
