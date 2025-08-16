// ProductItem: Components containing a visual display of the product metadata

import { useAwsImage } from "@/Services/Hook";
import {
  addToCartQuery,
  removeCartProduct,
  updateCartQuantity
} from "@/Services/Query";
import { price, short } from "@/System/function";
import _ from "lodash";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProductItem: React.FC<{
  product: ProductItemType;
  type: ListingProductType;
}> = ({ product, type }) => {
  // const [, setImage] = useState(null);
  const { data: image } = useAwsImage(product.image);
  const QuantityInputRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState<number>(product.cartQuantity || 1);
  // const image = getAwsMedia(product.image).then((url: any) => {console.log("") setImage(url)});
  return (
    // TailwindCSS styles in ProductItem Component
    <div
      className={`flex ${type === "carts_listing" || type === "similar_listing"
        ? "flex-col items-stretch gap-2 md:flex-row"
        : "pb-4 flex-col"
        } justify-start leading-normal rounded-xl ${type === "order_listing" ? "pb-0" : "shadow-sm shadow-gray-600"
        }`}
    >
      <Link to={`/products/${product.id}`}>
        <div
          className={`bg-no-repeat bg-cover bg-center ${type === "carts_listing"
            ? "w-full h-60 rounded-t-xl md:rounded-t-none md:rounded-ss-xl md:rounded-es-xl md:w-52 md:min-h-52"
            : type === "similar_listing"
              ? "w-full h-32 min-h-full max-h-full rounded-t-xl md:rounded-t-none md:rounded-ss-xl md:rounded-es-xl md:w-32 md:h-24"
              : type === "order_listing"
                ? "hidden"
                : "w-full h-80 rounded-t-xl"
            } bg-white/95`}
          style={{
            backgroundImage: `url('${image || "/favicon.svg"}')`,
          }}
        ></div>
      </Link>
      {/* Product metadata */}
      <div
        className={`${type === "carts_listing"
          ? "px-3 py-4 grow"
          : type === "similar_listing"
            ? "px-2 py-1"
            : type === "order_listing"
              ? "p-0"
              : "px-2 mt-4 grow"
          } flex flex-col justify-between`}
      >
        <div>
          <div className="flex flex-col items-start justify-between gap-1.5 mb-1 lg:flex-row">
            {/* Product name-description and quantity */}
            <Link to={`/products/${product.id}`}>
              {/* Product name/ <description> */}
              <div>
                <h3
                  className={`${type === "similar_listing"
                    ? "text-base font-bold"
                    : type === "order_listing"
                      ? "text-base font-medium"
                      : "text-xl font-bold"
                    }`}
                >
                  {product.name}
                </h3>
                <div className="mt-0.5 flex items-center justify-start gap-2">
                  <p className="bg-emerald-700 px-2 py-0.5 rounded font-medium text-xs">
                    Category:
                  </p>
                  <p className="text-xs font-medium underline underline-offset-4 decoration-double">
                    {_.startCase(product.category)}
                  </p>
                </div>
              </div>
              {type === "carts_listing" && (
                <p className={"text-gray-200 text-sm"}>{product.description}</p>
              )}
            </Link>
            {type !== "similar_listing" && (
              <div >
                <p
                  className={`${type === "order_listing" ? "text-lg" : "text-2xl"
                    } text-left text-emerald-600 font-bold lg:text-right`}
                >
                  {price(
                    product.price * (product.cartQuantity || 1),
                    "currency",
                    0
                  )}
                </p>
                {product.salePrice && (
                  <p className="text-sm text-left text-emerald-600 font-semibold line-through lg:text-right">
                    {price(product.salePrice, "currency", 0)}
                  </p>
                )}
                {
                  type == "order_listing" && (
                    <Link
                      to={product.downloadable}
                      download
                      onClick={e => {
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
                      className="text-sm bg-blue-600 px-2 py-1 text-white rounded hover:underline"
                    >
                      Download PDF
                    </Link>
                  )
                }
              </div>
            )}
          </div>
          {type !== "carts_listing" && type !== "order_listing" && (
            <Link to={`/products/${product.id}`}>
              <p className="hidden lg:block text-gray-200 text-sm">
                {type === "similar_listing"
                  ? short(product.description, _.random(24, 37))
                  : product.description}
              </p>
              <p className="block lg:hidden text-gray-200 text-sm">
                {product.description}
              </p>
            </Link>
          )}
          {type == "similar_listing" && (
            <p className={`text-lg text-emerald-600 font-bold`}>
              {price(
                product.price * (product.cartQuantity || 1),
                "currency",
                0
              )}
            </p>
          )}
        </div>
        {(type === "carts_listing" || type === "product_listing") && (
          <div
            className={`mt-3 flex ${type === "carts_listing" ? "justify-between" : "justify-end"
              } flex-wrap items-start gap-y-2`}
          >
            {/* Product Quantity reading */}
            {type === "carts_listing" && (
              <div className="flex flex-col gap-2 invisible">
                <div className="flex items-center gap-x-1.5">
                  <p className="text-base font-bold underline underline-offset-2 decoration-dotted">
                    Quantity:
                  </p>
                  <p>{quantity || 1}</p>
                </div>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  {/* decrement */}
                  <button
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
                    className="inline-flex items-center px-2 py-1 text-sm font-medium bg-transparent border rounded-s-md  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:text-white border-white text-white hover:text-white hover:bg-gray-700 focus:bg-gray-700"
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
                    className="inline text-white placeholder:text-gray-400 text-base bg-transparent max-w-12 text-center border border-white focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (QuantityInputRef.current) {
                        QuantityInputRef.current.value = "";
                      }
                      updateCartQuantity(product, 1);
                      setQuantity((count) => count + 1);
                    }}
                    className="inline-flex items-center px-2 py-1 text-sm font-medium bg-transparent border rounded-e-md  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:text-white border-white text-white hover:text-white hover:bg-gray-700 focus:bg-gray-700"
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
              </div>
            )}
            <Button
              text={type !== "carts_listing" ? "Add to cart" : "Remove"}
              onClick={() => {
                if (type === "carts_listing") {
                  // remove products from cart
                  removeCartProduct(product).then(() => { });
                } else {
                  addToCartQuery(product).then(() => { });
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
