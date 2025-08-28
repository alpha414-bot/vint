// ProductItem: Components containing a visual display of the product metadata

import { useAuthUser, useAwsImage } from "@/Services/Hook";
import {
  addToCartQuery,
  removeCartProduct,
  updateCartQuantity
} from "@/Services/Query";
import { price, short } from "@/System/function";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProductItem: React.FC<{
  product: ProductItemType;
  type: ListingProductType;
}> = ({ product, type }) => {
  const { data: image } = useAwsImage(product.image);
  const { data: authUser, isLoading: authLoading } = useAuthUser();
  const QuantityInputRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState<number>(product.cartQuantity || 1);
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardStyles = type === "carts_listing"
    ? "flex-col md:flex-row items-stretch gap-4"
    : type === "similar_listing"
      ? "flex-col items-stretch gap-2 md:flex-row"
      : "flex-col";

  const cardClasses = `
    relative overflow-hidden
    ${cardStyles}
    ${type === "order_listing" ? "pb-0" : "pb-6"}
    bg-gradient-to-br from-white via-main-50/40 to-main-100/60
    backdrop-blur-xl
    border border-main-200/40
    rounded-3xl
    shadow-xl hover:shadow-2xl
    transition-all duration-500
    group
  `;

  return (
    <motion.div
      transition={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cardClasses}
    >
      {/* Floating gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-main-400/20 via-transparent to-main-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Product Image Section */}
      <Link to={`/products/${product.id}`} className="relative block">
        <motion.div
          transition={imageVariants}
          whileHover="hover"
          className={`
            relative overflow-hidden
            ${type === "carts_listing"
              ? "w-full h-64 rounded-t-3xl md: md:rounded-t-3xl md:w-full md:min-h-64"
              : type === "similar_listing"
                ? "w-full h-36 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl md:w-36 md:h-28"
                : type === "order_listing"
                  ? "hidden"
                  : "w-full h-72 rounded-t-3xl"
            }
            bg-gradient-to-br from-main-100 to-main-200"
          `}
        >
          {/* Image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
            style={{
              backgroundImage: `url('${image || "/favicon.svg"}')`,
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Category badge */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-4 left-4"
          >
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-main-600/90 text-white backdrop-blur-sm border border-white/20 shadow-md">
              {_.startCase(product.category)}
            </span>
          </motion.div>

          {/* Star rating */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute top-4 right-4"
          >
            <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-sm font-semibold text-gray-800">{product.star || 5}</span>
            </div>
          </motion.div>

          {/* Hover overlay with quick actions */}
          <AnimatePresence>
            {isHovered && type !== "order_listing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-main-500 text-main-600 hover:bg-main-50 shadow-lg border border-main-200"
                  >
                    Quick View
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
      {/* Product Content Section */}
      <div
        className={`
          ${type === "carts_listing"
            ? "px-8 py-4 flex-1"
            : type === "similar_listing"
              ? "px-4 py-3"
              : type === "order_listing"
                ? "px-4 py-3"
                : "px-8 py-4 flex-1"
          }
          flex flex-col justify-between
        `}
      >
        <div className="space-y-4">
          {/* Product Title and Description */}
          <Link to={`/products/${product.id}`} className="block group">
            <motion.h3
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
              className={`
                font-bold text-gray-900 group-hover:text-main-600 transition-colors duration-300
                ${type === "similar_listing"
                  ? "text-lg"
                  : type === "order_listing"
                    ? "text-xl"
                    : "text-2xl"
                }
              `}
            >
              {product.name}
            </motion.h3>

            {/* Description */}
            {type !== "order_listing" && (
              <motion.p
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                className={`
                  text-gray-600 leading-relaxed mt-2
                  ${type === "similar_listing" ? "text-sm" : "text-base"}
                `}
              >
                {type === "similar_listing"
                  ? short(product.description, _.random(50, 80))
                  : type === "carts_listing"
                    ? product.description
                    : short(product.description, 120)
                }
              </motion.p>
            )}
          </Link>

          {/* Pricing Section */}
          {type !== "similar_listing" && (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <motion.p
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className={`
                    font-bold text-main-600
                    ${type === "order_listing" ? "text-2xl" : "text-3xl"}
                  `}
                >
                  {price(
                    product.price * (product.cartQuantity || 1),
                    "currency",
                    0
                  )}
                </motion.p>
                {product.salePrice && (
                  <p className="text-lg text-gray-400 font-medium line-through">
                    {price(product.salePrice, "currency", 0)}
                  </p>
                )}
              </div>

              {/* Download button for orders */}
              {type === "order_listing" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={product.downloadable}
                    download
                    onClick={(e) => {
                      e.preventDefault();
                      fetch(product.downloadable)
                        .then(res => res.blob())
                        .then(blob => {
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${product.name}.pdf`;
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                          window.URL.revokeObjectURL(url);
                        });
                    }}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download PDF</span>
                  </Link>
                </motion.div>
              )}
            </div>
          )}

          {/* Similar listing price */}
          {type === "similar_listing" && (
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-main-600"
            >
              {price(
                product.price * (product.cartQuantity || 1),
                "currency",
                0
              )}
            </motion.p>
          )}
        </div>
        {/* Action Section */}
        {(type === "carts_listing" || type === "product_listing") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`
                mt-3 pt-4 border-t border-main-200/50
                ${type === "carts_listing"
                ? "flex items-center justify-between space-x-4"
                : "flex justify-end"
              }
              `}
          >
            {/* Quantity Controls for Cart */}
            {type === "carts_listing" && (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                  <span className="text-lg font-bold text-main-600">{quantity || 1}</span>
                </div>

                <div className="flex items-center bg-white rounded-xl border border-main-200/50 shadow-sm overflow-hidden">
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      if (quantity > 1) {
                        if (QuantityInputRef.current) {
                          QuantityInputRef.current.value = "";
                        }
                        updateCartQuantity(product, -1);
                        setQuantity((count) => count - 1);
                      }
                    }}
                    className="p-3 text-main-600 hover:text-main-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                  </motion.button>

                  <input
                    type="text"
                    min={0}
                    ref={QuantityInputRef}
                    placeholder={product?.cartQuantity?.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numericValue = Number(value);

                      if (!isNaN(numericValue)) {
                        updateCartQuantity(product, numericValue, "insert");
                        setQuantity(numericValue);
                      }
                    }}
                    className="w-16 px-2 py-3 text-center text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 font-semibold"
                  />

                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      if (QuantityInputRef.current) {
                        QuantityInputRef.current.value = "";
                      }
                      updateCartQuantity(product, 1);
                      setQuantity((count) => count + 1);
                    }}
                    className="p-3 text-main-600 hover:text-main-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            )}

            {/* Action Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0"
            >
              <Button
                variant={type === "carts_listing" ? "outline" : "primary"}
                size="lg"
                className={`
                  min-w-[140px] font-semibold shadow-lg
                  ${type === "carts_listing"
                    ? "border-main-300 text-main-600 hover:bg-main-50 hover:border-main-400"
                    : "bg-gradient-to-r from-main-600 to-main-700 hover:from-main-700 hover:to-main-800"
                  }
                `}
                onClick={() => {
                  console.log("Click me ...")
                  if (type === "carts_listing") {
                    removeCartProduct(product).then(() => { });
                  } else {
                    // Ensure user is authenticated before adding to cart
                    if (authLoading) {
                      // Still loading auth state, show loading message
                      console.log("Auth still loading...");
                      return;
                    }

                    if (!authUser) {
                      // No user found, should not happen due to useAuthUser hook
                      console.log("No authenticated user found");
                      return;
                    }

                    console.log("Adding to cart for user:", authUser.uid);
                    console.log("Product:", product);

                    addToCartQuery(product)
                      .then(() => {
                        console.log("Successfully added to cart");
                      })
                      .catch((error) => {
                        console.error("Error adding to cart:", error);
                      });
                  }
                }}
              >
                {type !== "carts_listing" ? (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    <span>{authLoading ? "Loading..." : "Add to Cart"}</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove</span>
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductItem;
