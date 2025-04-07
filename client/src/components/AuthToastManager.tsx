import { useEffect } from "react";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useAuth } from "../contexts/AuthContext";

const AuthToastManager = () => {
  const { error, success, info, clearError, clearSuccess, clearInfo } =
    useAuth();

  useEffect(() => {
    if (error) {
      toaster.create({
        description: error,
        type: "error",
      });
      setTimeout(() => {
        clearError();
      }, 5000);
    }
  }, [error, clearError]);

  useEffect(() => {
    if (success) {
      toaster.create({
        description: success,
        type: "success",
      });
      setTimeout(() => {
        clearSuccess();
      }, 5000);
    }
  }, [success, clearSuccess]);

  useEffect(() => {
    if (info) {
      toaster.create({
        description: info,
        type: "info",
      });
      setTimeout(() => {
        clearInfo();
      }, 5000);
    }
  }, [info, clearInfo]);

  return <Toaster />;
};

export default AuthToastManager;
