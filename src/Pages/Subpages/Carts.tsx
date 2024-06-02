import Button from "@/Components/Button";
import { useCartProducts } from "@/Services/Hook";
import React from "react";

const Carts: React.FC<UserDataLoaderInterface> = () => {
  const { data } = useCartProducts() as { data: ProductItemType[] };

  return (
    <>
      <h3 className="text-4xl font-bold tracking-wider">My Carts</h3>
      {JSON.stringify(data)}
      <div>{/* <ProductList products={data} /> */}</div>
      <div>
        <div className="flex flex-col items-end">
          <Button>Checkout</Button>
        </div>
      </div>
    </>
  );
};

export default Carts;
