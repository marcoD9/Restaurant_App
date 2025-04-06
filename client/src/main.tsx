import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "./contexts/AuthContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      {" "}
      <AuthProvider>
        <CartProvider>
          {" "}
          <App />
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
