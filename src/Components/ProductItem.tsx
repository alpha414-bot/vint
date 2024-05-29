// ProductItem: Components containing a visual display of the product metadata

import Button from "./Button";

const ProductItem: React.FC<{ product: ProductItemType }> = ({ product }) => {
  return (
    // TailwindCSS styles in ProductItem Component
    <div className="border p-4 flex flex-col justify-start leading-normal rounded-md shadow-sm shadow-gray-600">
      <div className="mb-4">
        <div className="bg-no-repeat bg-contain bg-center w-full h-80 bg-white/95 rounded bg-[url('/favicon.svg')]"></div>
        <img
          // src="https://www.pcworld.com/wp-content/uploads/2023/08/dscf0453_final-100797561-orig-100915025-orig.jpg?quality=50&strip=all"
          src="/favicon.svg"
          alt=""
          className="w-full h-56 hidden"
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-xl">{product.name}</h3>
          <p className="text-gray-200 text-sm">{product.description}</p>
        </div>
        <div>
          <p className="text-2xl text-right text-rose-500 font-bold">$15</p>
          <p className="text-sm text-right text-rose-500 font-semibold line-through">$15</p>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <Button
          text="Add to cart"
          onClick={() => {
            console.log("add to cart", product);
          }}
        />
      </div>
    </div>
  );
};

export default ProductItem;
