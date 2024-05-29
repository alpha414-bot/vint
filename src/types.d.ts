type ProductItemType = {
  id?: string;
  name: string;
  description?: string;
};

interface RouteErrorInterface {
  status: string | number;
  statusText: string;
  internal: boolean;
  data: string;
  error?: Object;
}

type MiddlewareItems = "admin" | "guest_admin" | "auth" | "guest";

interface ProtectedRouteProps {
  children?: ReactNode | undefined;
  middlewares?: MiddlewareItems[];
}

interface ProductListInterface {
  products: ProductItemType[];
}
