import AwsImage from "@/Components/AwsImage";
import ProductList from "@/Components/ProductList";
import MainLayout from "@/Layouts/MainLayout";
import { useProductsData } from "@/Services/Hook";

const Home = () => {
  const { data } = useProductsData() as { data: ProductItemType[] };
  // const [vantaEffect, setVantaEffect] = useState<{ destroy: any } | null>(null);
  // const myRef = useRef(null);
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       RIPPLE({
  //         el: myRef.current,
  //         THREE,
  //         mouseControl: false,
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect?.destroy();
  //   };
  // }, [vantaEffect]);
  return (
    <MainLayout
      title="Vint - Gadget Enterprise"
      description="The enterprise with the latest in laptops, mobile and gadgets"
    >
      {/* {JSON.stringify(CartProducts)} */}
      <div className="px-5 py-10 space-y-5 md:px-10">
        <div className="relative flex items-center justify-between py-10 gap-8 md:py-28">
          <div className="relative z-50 space-y-2 w-full md:w-3/4">
            <div className="hidden md:block space-y-6">
              <p className="text-8xl font-extrabold">Laptop .</p>
              <p className="text-8xl font-extrabold whitespace-nowrap">
                Mobile . Gadgets .
              </p>
            </div>

            <div className="block md:hidden ml-2 space-y-6">
              <p className="text-5xl font-extrabold whitespace-nowrap">
                Laptop{" "}
              </p>
              <p className="text-5xl ml-4 font-extrabold whitespace-nowrap">
                . Mobile .
              </p>
              <p className="text-5xl ml-10 font-extrabold whitespace-nowrap">
                Gadgets .
              </p>
            </div>
            <p className="text-sm font-semibold md:text-base">
              Power Up Your Life: The Latest in Laptops, Mobile, and Gadgets
            </p>
          </div>
          <div className="absolute z-30 -right-4 top-0 md:right-0">
            <AwsImage
              path="hero.svg"
              className="w-full h-[16rem] md:h-[30rem]"
            />
          </div>
        </div>
        <hr />
        <div>
          <p className="text-lg font-medium">Best Selling Products</p>
          <div className="mt-4">
            <ProductList products={data || []} />
          </div>
        </div>
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
