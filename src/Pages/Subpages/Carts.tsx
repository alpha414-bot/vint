import ProductList from "@/Components/ProductList";
import { useCartProducts } from "@/Services/Hook";
import { price } from "@/System/function";
import _ from "lodash";
import { Link } from "react-router-dom";

// Require the library
const Carts = () => {
  const { data } = useCartProducts() as { data: CartMetaItem[] };
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-wider">
          My Carts ({data?.length})
        </h3>
        <Link to="/" className="font-medium text-lg text-red-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
      {(data.length > 0 && (
        <>
          <div className="mt-9">
            <ProductList
              type="carts_listing"
              products={data.map((item) => {
                let data = {
                  ...item.metadata,
                  cartQuantity: item.quantity,
                } as ProductItemType;
                return data;
              })}
            />
          </div>
          <div className="flex mt-2 items-center justify-end gap-2">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-base font-bold underline underline-offset-4 decoration-dotted">
              {price(
                _.sumBy(data, (item): any => {
                  if (item.metadata) {
                    let discountedPrice = item.metadata.price;
                    if (item.discount?.value) {
                      discountedPrice =
                        item.metadata.price *
                        (1 - (item.discount?.value || 1) / 100);
                    }
                    return discountedPrice * item.quantity;
                  }
                })
              )}
            </p>
          </div>
          <div className="flex flex-col items-end mt-8">
            <Link
              to="/checkout"
              className="inline-flex items-center px-4 py-0.5 text-base font-medium text-center rounded-lg bg-red-700 hover:bg-red-800 border-4 border-transparent hover:border-gray-800 hover:ring-2 hover:outline-none hover:ring-red-600"
            >
              Checkout
            </Link>
          </div>
        </>
      )) || (
          <div className="mt-9 bg-gray-200 bg-opacity-50 rounded px-2 py-6">
            <p className="font-bold text-center">No item in cart</p>
          </div>
        )}
    </>
  );
};

export default Carts;
