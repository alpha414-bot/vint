import { useOrders } from "@/Services/Hook";

const Orders = () => {
  const { data } = useOrders();

  return (
    <>
      <h3 className="text-4xl font-bold tracking-wider">My Orders</h3>
      <div className="mt-6 w-1/2">{JSON.stringify(data)}</div>
    </>
  );
};

export default Orders;
