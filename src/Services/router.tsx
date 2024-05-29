import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import { useEffect, useLayoutEffect, useState } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";

// Creating a higher-order component to wrap the router with scroll-to-top functionality
const withScrollToTop = (routerConfig?: any) => {
  return routerConfig.map((route?: any) => {
    return {
      ...route,
      element: <ScrollToTop>{route.element}</ScrollToTop>,
    };
  });
};

// Implementing a middleware guard in your route component
const ProtectedRoute = ({ children, middlewares }: ProtectedRouteProps) => {
  const { loading, user, middleware } = useMiddleware(middlewares);

  if (loading) {
    return <div>Loading... {middleware}</div>;
  }

  if (!user) {
    // redirect to anywhere
  }
  // ret
  return children;
};

// The useMiddleware hook is used to access the middleware state
export const useMiddleware = (middleware: any | null | undefined) => {
  const [state, setState] = useState({
    loading: true,
    user: null,
    middleware: [],
  });
  useEffect(() => {
    // Step 3: Perform your middleware tasks here, e.g., checking authentication status
    const fetchUser = async () => {
      () => {
        return middleware;
      };
      // Fetch user data from an API
      //   const user = await getUserFromAPI();

      // Update the state
      setState({
        loading: false,
        user: null,
        middleware: [],
        // user,
      });
    };

    fetchUser();
  }, []);
  return state;
};

// Define ScrollToTop component
const ScrollToTop = ({ children }: { children?: any }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

// all pages route
const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    loader: () => <p>create a spinner</p>,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(withScrollToTop(routes));
export default router;
