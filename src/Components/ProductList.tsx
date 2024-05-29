// ProductList: Components displaying a category of product based on different section of the web app
import React from "react";
import ProductItem from "./ProductItem";

const ProductList: React.FC<ProductListInterface> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 items-start md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductItem key={product.id || index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
