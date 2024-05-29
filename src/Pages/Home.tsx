import AwsImage from "@/Components/AwsImage";
import ProductList from "@/Components/ProductList";
import MainLayout from "@/Layouts/MainLayout";
import { useProductsData } from "@/Services/Hook";
import { auth } from "@/firebase-config";
import { signInAnonymously } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
  const { data } = useProductsData() as { data: ProductItemType[] };
  useEffect(() => {
    signInAnonymously(auth)
      .then((data) => {
        console.log("user is sign in", data);
      })
      .catch(() => {
        console.log("throw an error page");
      });
  }, []);
  return (
    <MainLayout
      title="Vint - Gadget Enterprise"
      description="The enterprise with the latest in laptops, mobile and gadgets"
    >
      <div className="px-10 py-10 space-y-5">
        <div className="relative flex items-center justify-between py-28 gap-8">
          <div className="relative z-50 space-y-5 w-3/4">
            <div className="space-y-6">
              <p className="text-8xl font-extrabold">Laptop . Mobile .</p>
              <p className="text-8xl font-extrabold whitespace-nowrap">
                Gadgets . Software .
              </p>
              {/* <p className="text-8xl font-extrabold">Software .</p> */}
            </div>
            <p className="text-base font-semibold">
              Power Up Your Life: The Latest in Laptops, Gadgets, and Software
            </p>
          </div>
          <div className="absolute z-30 right-0">
            <AwsImage path="hero.svg" className="w-full h-[30rem]" />
          </div>
        </div>
        <hr />
        <div>
          <p className="text-lg font-medium">Best Selling Products</p>
          <div className="mt-4">
            {/* {JSON.str} */}
            <ProductList products={data || []} />
          </div>
        </div>
        {/* <Button
          onClick={() =>
            addCollectionDoc("Products", DummyData).then((data) => {
              console.log("data is added", data);
            })
          }
        >
          Add product data
        </Button> */}
        <hr />
        <div>
          <p className="text-lg font-medium">You Might Like This</p>
          <div className="mt-4"></div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Home;
