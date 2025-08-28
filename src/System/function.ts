import app from "@/../package.json";
import { AuthError } from "firebase/auth";
import { useEffect } from "react";

export const baseUrl = (path = "") => new URL(path, app.baseUrl);
export const businessNo = app.bn
export const contacts = app.contacts

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

