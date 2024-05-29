import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import "./Assets/index.css";
import router from "./Services/router";
import amplifyconfig from "./amplifyconfiguration.json";

const Client = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});

localStorage.theme = "dark";
Amplify.configure(amplifyconfig);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={Client}>
      <RouterProvider router={router} />
      {/*<ReactQueryDevtools />*/}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
