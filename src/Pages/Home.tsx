import ProductList from "@/Components/ProductList";
import MainLayout from "@/Layouts/MainLayout";

const Home = () => {
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
            <img
              src="/hero.svg"
              alt="hero laptop image"
              className="w-full h-[30rem]"
            />
          </div>
        </div>
        <hr />
        <div>
          <p className="text-lg font-medium">Best Selling Products</p>
          <div className="mt-4">
            <ProductList
              products={[
                {
                  name: "Dell Latitude",
                  description: "Nothing",
                },
                {
                  name: "HP 456",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum expedita exercitationem rerum architecto aspernatur nulla deserunt. Optio eum, numquam sit quidem quasi ipsa, sapiente cum quod sequi repellat dolor?",
                },
                {
                  name: "HP 456",
                  description: "Nothing",
                },
              ]}
            />
          </div>
        </div>
        <hr />
        <div>
          <p className="text-lg font-medium">You Might Like This</p>
        </div>
      </div>
    </MainLayout>
  );
};
export default Home;
