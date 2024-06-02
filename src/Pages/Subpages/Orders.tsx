import React from "react";

const Orders: React.FC<UserDataLoaderInterface> = ({ orders }) => {
  return (
    <>
      <h3 className="text-4xl font-bold tracking-wider">My Orders</h3>
      <div className="mt-6 w-1/2">{JSON.stringify(orders)}</div>
    </>
  );
};

export default Orders;
