interface RouteErrorInterface {
  status: string | number;
  statusText: string;
  internal: boolean;
  data: string;
  error?: Object;
}

type MiddlewareItems = "auth" | "guest";

interface ProtectedRouteProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
  middlewares?: MiddlewareItems[];
}

interface ProductListInterface {
  products: ProductItemType[];
  type?: "carts_listing" | "order_listing" | "product_listing";
}

type QueryUseType = {
  data: any;
  isError: boolean;
  isLoading: boolean;
};

type CartMetaItem = {
  productID: string;
  quantity: number;
  discount?: { name: string; value: number };
  createdAt?: Date;
  updatedAt?: Date;
  metadata?: ProductItemType;
};

type CartProductItem = {
  products: CartMetaItem[];
};

interface ProductItemType {
  id?: string;
  name: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  salePrice?: number;
  available: boolean;
  stock: number;
  variants?: ProductVariantType[];
  images?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  weight?: number;
  cartQuantity?: number;
  discount?: { name: "#chameleon" | "#hackathonchameleon"; value: number };
  dimensions?: ProductDimensionsType;
  reviews?: ProductReviewType[];
  specifications?: ProductSpecificationType[];
}

interface ProductVariantType {
  color?: string;
  size?: string;
  material?: string;
  additionalPrice?: number;
  stock: number;
  images?: ProductImageType[];
}

interface ProductImageType {
  url: string;
  altText?: string;
  isPrimary?: boolean;
}

interface ProductDimensionsType {
  length: number;
  width: number;
  height: number;
  unit: string; // e.g., "cm", "inches"
}

interface ProductReviewType {
  userId: string;
  rating: number;
  title: string;
  body: string;
  createdAt: Date;
}

interface ProductSpecificationType {
  specName: string;
  specValue: string;
}

interface UserDataLoaderInterface {
  orders?: any;
  carts?: any;
  profile?: any;
}

interface ToastWrapperProps {
  title?: any;
  text: any;
}

type DropdownOptionsType = {
  key: string;
  value: string;
  description?: string;
};
