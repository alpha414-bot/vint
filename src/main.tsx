import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Assets/index.css";
import { AppProvider } from "./Services/Module";
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
      <AppProvider>
        <ToastContainer
          position="top-left"
          autoClose={6000}
          limit={3}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
