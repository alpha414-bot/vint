import AwsImage from "@/Components/AwsImage";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import ProductList from "@/Components/ProductList";
import MainLayout from "@/Layouts/MainLayout";
import { useProductsData } from "@/Services/Hook";
import { EmailPattern } from "@/System/function";
import { notify } from "@/notify";
import { useForm } from "react-hook-form";

const Home = () => {
  const { data } = useProductsData() as {
    data: ProductItemType[];
  };
  const { control, handleSubmit } = useForm();
  const JoinNewsletter = () => {
    notify.success({
      text: "You have successfully being added to our newsletter",
    });
  };
  return (
    <MainLayout
      title="Gadget Enterprise"
      description="The enterprise with the latest in laptops, mobile and gadgets"
    >
      <div className="space-y-5">
        <div className="relative flex items-center justify-between py-20 gap-8 min-h-[25rem] md:min-h-[30rem] md:py-28">
          <div className="relative z-50 px-2 space-y-2 w-full md:w-3/4 md:px-10">
            {/* Text overlay */}
            <div className="flex flex-col items-start">
              <p className="p-4 inline-block text-4xl font-extrabold md:text-6xl lg:text-8xl rounded-t-xl bg-gray-400/25">
                Laptop .
              </p>
              <p className="p-4 inline-block text-3xl font-extrabold md:text-6xl lg:text-8xl rounded-es-xl rounded-e-xl bg-gray-400/25">
                Mobile . Gadgets .
              </p>
            </div>
            <p className="text-sm font-semibold md:text-base">
              Power Up Your Life: The Latest in Laptops, Mobile, and Gadgets
            </p>
          </div>
          <div className="absolute z-30 w-full top-0 md:right-0">
            <AwsImage
              path="hero.svg"
              height={25}
              className="w-full h-[30rem] md:h-[30rem]"
              displayCanva
            />
          </div>
        </div>
        <div className="py-10 px-3 md:px-10 space-y-10">
          <div id="shop">
            <p className="text-xl font-bold md:text-3xl">
              Best Selling Products
            </p>
            <div className="mt-4">
              <ProductList products={data || []} />
            </div>
          </div>
        </div>
        {/* newsletter */}
        <div className="flex items-center justify-center relative py-24 px-3 md:px-10 space-y-0 bg-transparent h-[25rem] overflow-hidden">
          <div className="relative z-40 md:w-3/4">
            <p className="text-6xl font-extrabold text-center tracking-wide">
              Join Our Newsletter
            </p>
            <form
              onSubmit={handleSubmit(JoinNewsletter)}
              className="mt-8 px-7 flex flex-col items-stretch gap-3 md:flex-row"
            >
              <Input
                control={control}
                name="email"
                className="py-12"
                placeholder="Enter your email address"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: EmailPattern,
                    message: "Ouch, that doesn't look like an email!",
                  },
                }}
              />
              <div className="grow md:min-w-40 flex justify-end">
                <Button type="submit">Join Now</Button>
              </div>
            </form>
          </div>
          <div className="absolute z-30 overflow-hidden w-full top-0 md:right-0 h-[25rem]">
            <AwsImage
              path="hero.svg"
              height={25}
              className="w-full h-[25rem] md:h-[30rem]"
              displayCanva
              typeOfCanva="net"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Home;
