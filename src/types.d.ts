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

type QueryUseType = {
  data: any;
  isError: boolean;
  isLoading: boolean;
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
  createdAt?: string;
  updatedAt?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
  weight?: number;
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
