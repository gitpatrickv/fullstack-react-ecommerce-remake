import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./services/routes.tsx";

import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme.ts";

const MINUTE = 1000 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * MINUTE,
      gcTime: 60 * MINUTE,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);
