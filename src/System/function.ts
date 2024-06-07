import { AuthError } from "firebase/auth";
import { useEffect } from "react";

export const getErrorMessageViaStatus = (error: RouteErrorInterface) => {
  switch (error.status) {
    case 404:
      return {
        status: 404,
        shortMessage: "404 Not Found | We can't find that page!",
        longMessage:
          "Sorry, the page you're looking for does not exist anymore, or we've moved it somewhere else. Try selecting a link from the navigation at the top of the page. ",
      };
    default:
      return {
        ...error,
        shortMessage: error.statusText || "Error Encountered",
        longMessage:
          error.data ||
          "There was a problem with this page. Try refreshing the page, if issue persists, contact administrator.",
      };
  }
};
/**
 * Function to convert value to human readable output
 *
 * @param value the number to convert valid displayable price
 * @returns string
 */
export const price = (
  value: any,
  style: "currency" | "decimal" | "percent" | "unit" = "currency",
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string => {
  let format = new Intl.NumberFormat("en-NG", {
    style: style,
    currency: "NGN",
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value);
  return isNaN(value) ? "0" : format;
};

/**
 *
 * Percentage calculation and refixing...
 *
 * @param value the actual value of number undergoing calculation
 * @param percentage the percentage of calculation
 * @param operation the type of operation being done in percentage calculation either substraction or addition
 * @returns number
 */
export const priceInPerct = (
  value: number,
  percentage: number,
  operation: "-" | "+"
) => {
  let percentagePrice = (percentage / 100) * value;
  switch (operation) {
    case "+":
      return (value + percentagePrice).toFixed(2);
    case "-":
      return (value - percentagePrice).toFixed(2);
    default:
      return value - percentagePrice;
  }
};

/**
 * react query keys for identifying queries
 */
export const keys = {
  auth_user_profile: (auth_uid?: string) => [
    "auth_user_profile",
    auth_uid || "",
  ],
  product_data: (product_id?: string, page_id?: any) => [
    "product_data",
    product_id || "all",
    page_id || "single_query",
  ],
  similar_product_data: (except_product_id?: string) => [
    "product_data",
    except_product_id || "all",
  ],
  cart_data: (user_id?: string, cart_id?: string) => [
    "cart_data",
    user_id || "no_user",
    cart_id || "all",
  ],
  order_data: (user_id?: string, order_id?: string) => [
    "order_data",
    user_id || "no_user",
    order_id || "all",
  ],
  amazon_media: (key: string) => ["image_gallery_from_amazon", key],
};

export const DummyData: ProductItemType[] = [
  {
    name: "Super 30",
    description: "A high-performance laptop with the latest features.",
    category: "laptop",
    price: 20000,
    salePrice: 25000,
    image: "products/laptop1.jpeg",
    variants: [
      {
        color: "Black",
        size: "15 inch",
        material: "Aluminum",
      },
      {
        color: "Silver",
        size: "13 inch",
        material: "Aluminum",
      },
    ],
    weight: 1.5,
    star: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Type X",
    description:
      "Ultra-thin laptop with a stunning display, fast performance, and all-day battery life. Ideal for on-the-go productivity.",
    category: "laptop",
    price: 90000,
    salePrice: 100000,
    image: "products/laptop2.jpeg",
    variants: [
      {
        color: "Black",
        size: "10 inch",
        material: "Carbon Fiber",
      },
      {
        color: "Silver",
        size: "13 inch",
        material: "Aluminum",
      },
    ],
    weight: 1.2,
    star: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Power FX",
    description:
      "Compact, powerful laptop with vibrant display and long battery life. Perfect for everyday use.",
    category: "laptop",
    price: 75000,
    salePrice: 80000,
    image: "products/laptop3.jpeg",
    variants: [
      {
        color: "White",
        size: "10 inch",
        material: "Carbon Fiber",
      },
      {
        color: "Blue",
        size: "13 inch",
        material: "Aluminum",
      },
    ],
    weight: 1.0,
    star: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "XR 3546",
    description:
      "Lightweight laptop with sharp display and speedy performance. Ideal for work and travel.",
    category: "laptop",
    price: 90000,
    salePrice: 100000,
    image: "products/laptop4.jpeg",
    variants: [
      {
        color: "Black",
        size: "10 inch",
        material: "Carbon Fiber",
      },
    ],
    weight: 1.2,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "DK PC",
    description:
      "Sleek and powerful laptop with a crisp display and extended battery life. Perfect for all your needs.",
    category: "laptop",
    price: 12000,
    salePrice: 10000,
    image: "products/laptop5.jpeg",
    variants: [
      {
        color: "Black",
        size: "10 inch",
        material: "Carbon Fiber",
      },
    ],
    weight: 1.2,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Man KX",
    description:
      "High-performance laptop with a vivid display and long-lasting battery. Ideal for productivity and entertainment.",
    category: "laptop",
    price: 70000,
    salePrice: 80000,
    image: "products/laptop6.jpeg",
    variants: [
      {
        color: "Yellow",
        size: "11 inch",
        material: "Carbon Fiber",
      },
    ],
    weight: 1.1,
    star: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "XR S282",
    description:
      "Slim, fast laptop with brilliant display and enduring battery. Perfect for work and play.",
    category: "laptop",
    price: 12000,
    salePrice: 8000,
    image: "products/laptop7.jpeg",
    variants: [
      {
        color: "Yellow",
        size: "12 inch",
        material: "Aluminum",
      },
    ],
    weight: 1.25,
    star: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Cax Py",
    description:
      "Lightweight laptop with fast performance, clear display, and long battery life. Ideal for on-the-go use.",
    category: "laptop",
    price: 8000,
    salePrice: 5000,
    image: "products/laptop8.jpeg",
    variants: [
      {
        color: "Black",
        size: "11 inch",
        material: "Abrasion",
      },
    ],
    weight: 1.5,
    star: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "iPhone AF",
    description:
      "Sleek iPhone with stunning display, powerful performance, and advanced camera technology. Redefining mobile excellence.",
    category: "mobile",
    price: 10000,
    salePrice: 5000,
    image: "products/mobilei1.jpeg",
    variants: [
      {
        color: "Black",
        size: "8 inch",
        material: "Aluminum",
      },
    ],
    weight: 0.7,
    star: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "iPhone 55",
    description:
      "Cutting-edge iPhone with vibrant display, lightning-fast performance, and exceptional camera capabilities. Elevating your mobile experience.",
    category: "mobile",
    price: 7000,
    image: "products/mobilei2.jpeg",
    variants: [
      {
        color: "Black",
        size: "10 inch",
        material: "Sulphur Lining",
      },
    ],
    weight: 1,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "iPhone AL",
    description:
      "Stylish iPhone with top-notch display, blazing speed, and unmatched camera quality. Redefining mobile innovation.",
    category: "mobile",
    price: 12000,
    image: "products/mobilei3.jpeg",
    weight: 0.9,
    star: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "iPhone KB",
    description:
      "Premium iPhone with stunning display, lightning-fast performance, and unmatched camera prowess. Setting the standard for mobile excellence.",
    category: "mobile",
    price: 7000,
    image: "products/mobilei4.jpeg",
    weight: 1.2,
    star: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sam JK",
    description:
      "Stunning display, lightning-fast performance, and exceptional camera. Unleash your potential.",
    category: "mobile",
    price: 5000,
    image: "products/mobiles1.jpeg",
    variants: [
      {
        color: "Blue",
        size: "10 inch",
        material: "Aluminum",
      },
      {
        color: "Black",
        size: "10 inch",
        material: "Carbon Fiber",
      },
    ],
    weight: 1.2,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sam XR",
    description:
      "Samsung Galaxy: A fusion of style and power, boasting a stunning display and lightning-fast performance.",
    category: "mobile",
    price: 10000,
    image: "products/mobiles2.jpeg",
    variants: [
      {
        color: "Green",
        size: "11 inch",
        material: "Aluminum",
      },
      {
        color: "Black",
        size: "10 inch",
        material: "Sulphur Lining",
      },
    ],
    weight: 1.2,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "XR Galaxy",
    description:
      "Samsung Galaxy: Sleek design, powerful performance, and vibrant display, all in one pocket-friendly device.",
    category: "mobile",
    price: 9500,
    image: "products/mobiles3.jpeg",
    variants: [
      {
        color: "Green",
        size: "11 inch",
        material: "Aluminum",
      },
    ],
    weight: 1.2,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sam XR",
    description:
      "Samsung Galaxy: Sleek design, powerful performance, and vibrant display, setting new standards in mobile excellence.",
    category: "mobile",
    price: 8000,
    image: "products/mobiles4.jpeg",
    weight: 1.2,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "XR TabA",
    description:
      "Tablet: A portable powerhouse with a stunning display, fast performance, and all-day battery life. Redefining versatility.",
    category: "gadget",
    price: 10000,
    image: "products/gadget1.jpeg",
    weight: 1.4,
    star: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "TAB GF",
    description:
      "Cutting-edge tablet with vibrant display, powerful performance, and long-lasting battery. Redefining portable productivity.",
    category: "gadget",
    price: 12000,
    image: "products/gadget2.jpeg",
    weight: 1.8,
    star: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "XR shn",
    description:
      "Sleek tablet with stunning display, fast performance, and all-day battery life. Perfect for work and entertainment on the go.",
    category: "gadget",
    price: 6700,
    image: "products/gadget3.jpeg",
    weight: 1.4,
    star: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Tab KH",
    description:
      "Versatile tablet with vibrant display, fast performance, and long battery life. Ideal for productivity and entertainment.",
    category: "gadget",
    price: 24000,
    salePrice: 22000,
    image: "products/gadget4.jpeg",
    weight: 1.1,
    star: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const date = (date: FirestoreDate): Date => {
  return new Date((date.seconds as any) * 1000);
};

export const importScript = (resourceUrl: string) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [resourceUrl]);
};

/**
 * function to check if a pass string is valid and absolute URL address
 *
 * @param url the string to cross check if it is valid url
 * @returns boolean true/false
 */
export const isURL = (url: string): boolean => {
  const pattern = new RegExp("^(?:[a-z]+:)?//", "i");
  return pattern.test(url);
};

export const NumberPattern = /^[0-9]*$/;
export const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
export const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NOAUTOCOMPLETE =
  "no-quicks" + Math.random() * 299 * Math.random() + " countries randon";

export const short = (
  description: string,
  maxLength: number,
  show_short: boolean = true
) => {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.slice(0, maxLength)}${show_short ? "..." : ""}`;
};

export const NigeriaState = [
  { key: "abia", value: "Abia" },
  { key: "adamawa", value: "Adamawa" },
  { key: "akwa_ibom", value: "Akwa Ibom" },
  { key: "anambra", value: "Anambra" },
  { key: "bauchi", value: "Bauchi" },
  { key: "bayelsa", value: "Bayelsa" },
  { key: "benue", value: "Benue" },
  { key: "borno", value: "Borno" },
  { key: "cross_river", value: "Cross River" },
  { key: "delta", value: "Delta" },
  { key: "ebonyi", value: "Ebonyi" },
  { key: "edo", value: "Edo" },
  { key: "ekiti", value: "Ekiti" },
  { key: "enugu", value: "Enugu" },
  { key: "gombe", value: "Gombe" },
  { key: "imo", value: "Imo" },
  { key: "jigawa", value: "Jigawa" },
  { key: "kaduna", value: "Kaduna" },
  { key: "kano", value: "Kano" },
  { key: "katsina", value: "Katsina" },
  { key: "kebbi", value: "Kebbi" },
  { key: "kogi", value: "Kogi" },
  { key: "kwara", value: "Kwara" },
  { key: "lagos", value: "Lagos" },
  { key: "nasarawa", value: "Nasarawa" },
  { key: "niger", value: "Niger" },
  { key: "ogun", value: "Ogun" },
  { key: "ondo", value: "Ondo" },
  { key: "osun", value: "Osun" },
  { key: "oyo", value: "Oyo" },
  { key: "plateau", value: "Plateau" },
  { key: "rivers", value: "Rivers" },
  { key: "sokoto", value: "Sokoto" },
  { key: "taraba", value: "Taraba" },
  { key: "yobe", value: "Yobe" },
  { key: "zamfara", value: "Zamfara" },
  { key: "fct", value: "Federal Capital Territory" },
] as DropdownOptionsType[];

export const ErrorFilter = (
  error: AuthError,
  operation: "forgot-password" | "sign-in" = "sign-in"
) => {
  switch (true) {
    case error.code == "auth/invalid-email":
      return "Email is an invalid format. Please try another.";
    case error.code == "auth/user-disabled":
      return "Your account has been disabled and unable login.";
    case (error as unknown) == "Problem sign in" ||
      error.code == "auth/user-not-found":
      return operation == "sign-in"
        ? "User does not exists in our records. Please crosscheck your credentials."
        : "No registered user with this email.";
    case error.code == "auth/wrong-password" ||
      error.code == "auth/invalid-credential":
      return "The provided credentials are incorrect, Retry with a correct credential or reset your password.";
    case error.code == "auth/email-already-in-use":
      return "The email address is already in use. Please try another.";
    case (error as unknown) == "auth/operation-not-allowed" ||
      error.code == "auth/operation-not-allowed":
      return "Failed to sign in due to restriction. Pleast try again later or contact administrator.";
    case error.code == "auth/weak-password":
      return "Password is too weak to complete sign up. Try again with a stronger password.";
    default:
      return "Failed to complete operation. Pleast try again later, if issue persist, please contact administrator.";
  }
};
