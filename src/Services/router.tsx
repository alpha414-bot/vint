import Button from "@/Components/Button";
import MainLayout from "@/Layouts/MainLayout";
import AuthPage from "@/Pages/AuthPage";
import Dashboard from "@/Pages/Dashboard";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import Carts from "@/Pages/Subpages/Carts";
import Orders from "@/Pages/Subpages/Orders";
import Profile from "@/Pages/Subpages/Profile";
import { DummyData } from "@/System/function";
import { AuthUserType } from "@/Types/Auth";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  RouteObject,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuthUser } from "./Hook";
import { addCollectionDoc, getUserDataLoader } from "./Query";

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
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  middlewares,
}) => {
  const { user, loading } = useMiddleware(middlewares || []);
  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (middlewares && middlewares?.length > 0) {
    if (middlewares?.includes("guest")) {
      if (user?.uid || user?.isAnonymous) {
        // user is authenticated or user is not anonymous
        // redirect to dashboard
        navigate("/user/orders");
      }
    }

    if (middlewares?.includes("auth")) {
      if (!(user?.uid || user?.isAnonymous)) {
        // user is not authenticated
        // navigate("/login");
      }
    }
  }

  return children;
};

// The useMiddleware hook is used to access the middleware state
export const useMiddleware = (middleware: MiddlewareItems[]) => {
  const { data: user } = useAuthUser();
  const [state, setState] = useState<{
    loading: boolean;
    user?: AuthUserType;
    middleware: MiddlewareItems[];
  }>({
    loading: true,
    middleware: [],
  });
  useEffect(() => {
    // Step 3: Perform your middleware tasks here, e.g., checking authentication status
    const fetchUser = async () => {
      // Fetch user data from an API
      if (user) {
        setState({
          loading: false,
          user: user,
          middleware: middleware,
        });
      } else {
        setState({
          loading: false,
          user: undefined,
          middleware: middleware,
        });
      }
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
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute middlewares={["auth"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    loader: getUserDataLoader,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "carts",
        element: <Carts />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute middlewares={["guest"]}>
        <AuthPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/help",
    element: (
      <MainLayout
        title="Help"
        description="Reach to us for help concerning our site"
      >
        <Button
          onClick={() =>
            addCollectionDoc("Products", DummyData).then((data) => {
              console.log("data is added", data);
            })
          }
        >
          Add product data
        </Button>
      </MainLayout>
    ),
  },
];

// const router = createBrowserRouter(routes);
const router = createBrowserRouter(withScrollToTop(routes));
export default router;
