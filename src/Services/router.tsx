import AuthPage from "@/Pages/AuthPage";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import { auth } from "@/firebase-config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { createBrowserRouter, redirect, useLocation, useNavigate } from "react-router-dom";

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
  const user = useMiddleware(middlewares || []);
  const navigate = useNavigate();
  const loading = true;
  const middleware = false;
  if (!loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  if (middlewares?.includes("guest")) {
    if (user.user?.uid || user.user?.isAnonymous) {
      // user is authenticated or user is anonymous
      // redirect to home page
      navigate("/alpha");
    }
  }

  return children;
};

// The useMiddleware hook is used to access the middleware state
export const useMiddleware = (middleware: MiddlewareItems[]) => {
  const [state, setState] = useState<{
    loading: boolean;
    user?: User;
    middleware: MiddlewareItems[];
  }>({
    loading: true,
    middleware: [],
  });
  useEffect(() => {
    // Step 3: Perform your middleware tasks here, e.g., checking authentication status
    const fetchUser = async () => {
      // Fetch user data from an API
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setState({
            loading: false,
            user: user,
            middleware: middleware,
          });
          // ...
        } else {
          // User is signed out
          setState({
            loading: false,
            user: undefined,
            middleware: middleware,
          });
        }
      });

      // Update the state
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
  {
    path: "/login",
    element: (
      <ProtectedRoute middlewares={["guest"]}>
        <AuthPage />
      </ProtectedRoute>
    ),
    loader: () => <p>create a spinner</p>,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(withScrollToTop(routes));
export default router;
