"use client";

import AuthProvider from "@/context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const Provider = ({ children }) => {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            // success: {
            //   duration: 3000,
            // },
            // error: {
            //   duration: 3000,
            // },
            // loading: {
            //   duration: 3000,
            // },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fdf4e5",
              color: "black",
            },
          }}
        />
    </AuthProvider>
      </QueryClientProvider>
  );
};

export default Provider;
