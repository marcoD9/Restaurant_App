import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

interface InfoToastProps {
  infoMessage: string;
}

const InfoToast = ({ infoMessage }: InfoToastProps) => {
  useEffect(() => {
    if (infoMessage) {
      toaster.create({
        title: "Info",
        description: infoMessage,
        type: "info",
      });
    }
  }, [infoMessage]);

  return null;
};

export default InfoToast;
