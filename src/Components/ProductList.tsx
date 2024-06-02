// ProductList: Components displaying a category of product based on different section of the web app
import React from "react";
import ProductItem from "./ProductItem";

const ProductList: React.FC<ProductListInterface> = ({
  products,
  type = "product_listing",
}) => {
  return (
    <div
      className={`grid ${
        type === "carts_listing"
          ? "grid-cols-1"
          : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      } gap-6`}
    >
      {products.map((product, index) => (
        <ProductItem key={product.id || index} product={product} type={type} />
      ))}
    </div>
  );
};

export default ProductList;
