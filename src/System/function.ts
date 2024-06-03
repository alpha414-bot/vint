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
  product_data: (product_id?: string) => ["product_data", product_id || "all"],
  cart_data: (user_id?: string, cart_id?: string) => [
    "cart_data",
    user_id || "no_user",
    cart_id || "all",
  ],
  amazon_media: (key: string) => ["image_gallery_from_amazon", key],
};

export const DummyData: ProductItemType[] = [
  {
    name: "Super Laptop 3000",
    description: "A high-performance laptop with the latest features.",
    category: "laptop",
    sku: "LAP12345",
    price: 1500,
    salePrice: 1299.99,
    available: true,
    stock: 25,
    variants: [
      {
        color: "Black",
        size: "15 inch",
        material: "Aluminum",
        additionalPrice: 0,
        stock: 10,
      },
      {
        color: "Silver",
        size: "13 inch",
        material: "Aluminum",
        additionalPrice: -50,
        stock: 15,
      },
    ],
    weight: 1.5,
    dimensions: { length: 35, width: 25, height: 2, unit: "cm" },
  },
  {
    name: "Smartphone Pro X",
    description: "A flagship smartphone with cutting-edge technology.",
    category: "mobile",
    sku: "MOB67890",
    price: 999.99,
    salePrice: 899.99,
    available: true,
    stock: 100,
    variants: [
      { color: "Blue", size: "6.5 inch", stock: 50 },
      { color: "Black", size: "6.5 inch", stock: 50 },
    ],
    weight: 0.2,
    dimensions: { length: 16, width: 7, height: 0.8, unit: "cm" },
  },
  {
    name: "Wireless Earbuds",
    description: "Compact and powerful wireless earbuds.",
    category: "gadgets",
    sku: "GAD54321",
    price: 199.99,
    available: true,
    stock: 200,
    variants: [
      { color: "White", stock: 100 },
      { color: "Black", stock: 100 },
    ],
    weight: 0.05,
    dimensions: { length: 2, width: 2, height: 3, unit: "cm" },
  },
  {
    name: "Gaming Laptop XT",
    description: "A laptop designed for gaming with high-end specifications.",
    category: "laptop",
    sku: "LAP09876",
    price: 2000,
    available: false,
    stock: 0,
    variants: [
      {
        color: "Red",
        size: "17 inch",
        material: "Carbon Fiber",
        additionalPrice: 200,
        stock: 0,
      },
    ],
    weight: 2.5,
    dimensions: { length: 40, width: 28, height: 3, unit: "cm" },
  },
  {
    name: "Fitness Tracker",
    description:
      "A sleek fitness tracker with multiple health monitoring features.",
    category: "gadgets",
    sku: "GAD65432",
    price: 149.99,
    available: true,
    stock: 500,
    variants: [
      { color: "Black", size: "Standard", stock: 300 },
      { color: "Pink", size: "Standard", stock: 200 },
    ],
    weight: 0.1,
    dimensions: { length: 22, width: 2, height: 0.5, unit: "cm" },
  },
];

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
