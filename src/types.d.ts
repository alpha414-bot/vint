type MiddlewareItems = "auth" | "guest" | "checkout";
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
type DropdownOptionsType = {
  key: string;
  value: string;
  description?: string;
};

interface RouteErrorInterface {
  status: string | number;
  statusText: string;
  internal: boolean;
  data: string;
  error?: Object;
}

interface ProtectedRouteProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
  middlewares?: MiddlewareItems[];
}

interface ProductListInterface {
  products: ProductItemType[];
  type?: "carts_listing" | "order_listing" | "product_listing";
}

interface VantaEffectOptions {
  el: HTMLDivElement;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  scale?: number;
  scaleMobile?: number;
  color1: number;
  backgroundColor: number;
  amplitudeFactor?: number;
  xOffset?: number;
  yOffset?: number;
  size: number;
  baseColor?: number;
}

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

interface UserSignUpFormInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
}

interface UserSignInFormInput {
  email?: string;
  password?: string;
}

interface PaymentOnSuccessProps {
  message: string;
  redirecturl: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
  amount: any;
}

interface BillingInputInterface {
  first_name?: string;
  last_name?: string;
  street_address?: string;
  postal_code?: string;
  town?: string;
  phone_number?: string;
  state?: DropdownOptionsType;
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

interface OrderDataInterface {
  payment_instance: PaymentOnSuccessProps;
  products: CartMetaItem[];
  billing_info: BillingInputInterface;
  user_uid: string;
}
