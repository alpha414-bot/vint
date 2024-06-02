// ProductItem: Components containing a visual display of the product metadata

import { useAuthUser } from "@/Services/Hook";
import { addToCartQuery } from "@/Services/Query";
import { price } from "@/System/function";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProductItem: React.FC<{ product: ProductItemType }> = ({ product }) => {
  const { data: AuthUser } = useAuthUser();
  const [quantity, setQuantity] = useState<number>(1);
  return (
    // TailwindCSS styles in ProductItem Component
    <div className="pb-4 flex flex-col justify-start leading-normal rounded-lg shadow-sm shadow-gray-600">
      <Link to={`/products/${product.id}`} className="mb-4">
        <div className="bg-no-repeat bg-contain bg-center w-full h-80 bg-white/95 rounded-t-lg bg-[url('/favicon.svg')]"></div>
      </Link>
      {/* Product metadata */}
      <div className="px-2">
        <div className="">
          <div className="flex items-start justify-between gap-1.5 mb-1">
            <h3 className="font-bold text-xl">{product.name}</h3>
            <div>
              <p className="text-2xl text-right text-rose-600 font-bold">
                {price(product.price, "currency", 0)}
              </p>
              {product.salePrice && (
                <p className="text-sm text-right text-rose-600 font-semibold line-through">
                  {price(product.salePrice, "currency", 0)}
                </p>
              )}
            </div>
          </div>
          <p className="text-gray-200 text-sm">{product.description}</p>
        </div>
        <div className="mt-3 flex items-center flex-wrap justify-between gap-y-2">
          {/* Product Quantity */}
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() =>
                setQuantity((count) => (count < 2 ? 1 : count - 1))
              }
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              <svg
                className="w-5 h-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <input
              type="text"
              min={0}
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = Number(value);

                if (!isNaN(numericValue)) {
                  setQuantity(numericValue);
                }
              }}
              className="inline text-white text-base bg-transparent max-w-12 text-center border border-white focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={() => setQuantity((count) => count + 1)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              <svg
                className="w-5 h-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </button>
          </div>
          <Button
            text="Add to cart"
            onClick={() => {
              addToCartQuery(AuthUser, product).then(() => {});
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
