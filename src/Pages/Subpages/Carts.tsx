import ProductList from "@/Components/ProductList";
import { useCartProducts } from "@/Services/Hook";
import { price } from "@/System/function";
import _ from "lodash";
import { Link } from "react-router-dom";

// Require the library
const Carts = () => {
  const { data } = useCartProducts() as { data: CartMetaItem[] };
  return (
    <div className="min-h-[60vh] w-full px-2 md:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-extrabold tracking-tight text-main-700 drop-shadow-sm">
            <span className="inline-block bg-gradient-to-r from-main-500 via-main-400 to-main-600 bg-clip-text text-transparent">My Cart</span>
            <span className="ml-2 text-base font-bold text-main-400">({data?.length})</span>
          </h3>
          <Link to="/" className="font-semibold text-lg text-main-600 hover:underline hover:text-main-800 transition-all duration-200">
            Continue Shopping
          </Link>
        </div>
        {data.length > 0 ? (
          <>
            <div className="mt-2">
              <ProductList
                type="carts_listing"
                products={data.map((item) => ({
                  ...item.metadata,
                  cartQuantity: item.quantity,
                })) as any}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 px-2 py-6 rounded-2xl glass bg-white/60 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-main-700">Total:</span>
                <span className="text-2xl font-extrabold text-main-600 bg-main-100 px-4 py-2 rounded-lg shadow-sm">
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
                </span>
              </div>
              <Link
                to="/checkout"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-main-600 to-main-700 shadow-lg hover:from-main-700 hover:to-main-800 hover:scale-105 transition-all duration-300 border-2 border-main-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center py-16 px-4 rounded-2xl glass bg-white/60 backdrop-blur-md shadow-lg">
            <svg className="w-16 h-16 text-main-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M9 3v18m6-18v18" />
            </svg>
            <p className="text-2xl font-bold text-main-400 mb-2">Your cart is empty</p>
            <p className="text-base text-gray-500 mb-6">Add some lovely courses to your cart and start learning!</p>
            <Link to="/" className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-main-500 to-main-700 text-white font-semibold shadow hover:scale-105 transition-all duration-300">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;
