import Button from "@/Components/Button";
import ProductList from "@/Components/ProductList";
import { useCartProducts } from "@/Services/Hook";
import { price } from "@/System/function";
import _ from "lodash";
import React, { useEffect, useState } from "react";

const Carts: React.FC<UserDataLoaderInterface> = () => {
  const { data } = useCartProducts() as { data: CartMetaItem[] };
  const [productData, setProductData] = useState<ProductItemType[]>([]);
  useEffect(() => {
    setProductData(
      data.map((item) => {
        let data = {
          ...{ cartQuantity: item.quantity },
          ...item.metadata,
        } as ProductItemType;
        return data;
      })
    );
  }, [data]);
  return (
    <>
      <h3 className="text-4xl font-bold tracking-wider">
        My Carts [{data.length}]
      </h3>
      {(data.length > 0 && (
        <>
          <div className="mt-9">
            <ProductList type="carts_listing" products={productData} />
          </div>
          <div className="flex mt-2 items-center justify-end gap-2">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-base font-bold underline underline-offset-4 decoration-dotted">
              {price(
                _.sumBy(data, (item): any => {
                  if (item.metadata) {
                    return Number(item.metadata.price * (item.quantity || 1));
                  }
                }),
                "currency"
              )}
            </p>
          </div>
          <div className="flex flex-col items-end mt-8">
            <Button>Checkout</Button>
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
