// ProductItem: Components containing a visual display of the product metadata

const ProductItem: React.FC<{ product: ProductItemType }> = ({ product }) => {
  return (
    // TailwindCSS styles in ProductItem Component
    <div className="border p-4 flex flex-col justify-between leading-normal">
      <h3 className="text-gray-900 font-bold text-xl mb-2">{product.name}</h3>
      <p className="text-gray-700 text-base">{product.description}</p>
      <div className="mt-3 flex items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
