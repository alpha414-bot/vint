// ProductItem: Components containing a visual display of the product metadata

import { useAuthUser } from "@/Services/Hook";
import { addToCartQuery } from "@/Services/Query";
import { price } from "@/System/function";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProductItem: React.FC<{ product: ProductItemType }> = ({ product }) => {
  const { data: AuthUser } = useAuthUser();
  return (
    // TailwindCSS styles in ProductItem Component
    <div className="pb-4 flex flex-col justify-start leading-normal rounded-md shadow-sm shadow-gray-600">
      <Link to={`/products/${product.id}`} className="mb-4">
        <div className="bg-no-repeat bg-contain bg-center w-full h-80 bg-white/95 rounded bg-[url('/favicon.svg')]"></div>
      </Link>
      <div className="px-4">
        <div className="">
          <div className="flex items-start justify-between gap-1.5 mb-1">
            <h3 className="font-bold text-xl">{product.name}</h3>
            <div>
              <p className="text-2xl text-right text-rose-500 font-bold">
                {price(product.price, "currency", 0)}
              </p>
              {product.salePrice && (
                <p className="text-sm text-right text-rose-500 font-semibold line-through">
                  {price(product.salePrice, "currency", 0)}
                </p>
              )}
            </div>
          </div>
          <p className="text-gray-200 text-sm">{product.description}</p>
        </div>
        <div className="mt-3 flex items-center">
          <Button
            text="Add to cart"
            onClick={() => {
              addToCartQuery(AuthUser, product);
              console.log("add to cart", product);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
