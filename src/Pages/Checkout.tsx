import Button from "@/Components/Button";
import Input from "@/Components/Input";
import SelectDropdown from "@/Components/SelectDropdown";
import TextArea from "@/Components/TextArea";
import MainLayout from "@/Layouts/MainLayout";
import { useCartProducts } from "@/Services/Hook";
import {
  EmailPattern,
  NigeriaState,
  NumberPattern,
  PasswordPattern,
  price,
} from "@/System/function";
import _ from "lodash";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  PaystackButton,
  PaystackConsumer,
  usePaystackPayment,
} from "react-paystack";
import { HookConfig } from "react-paystack/dist/types";
import { Link } from "react-router-dom";
import * as ENV from "../../package.json";

interface CheckoutFormInput {
  first_name?: string;
  last_name?: string;
  street_address?: string;
  postal_code?: string;
  town?: string;
  phone_number?: string;
  state?: DropdownOptionsType;
  email?: string;
  password?: string;
  confirm_password?: string;
}

const Checkout = () => {
  const { data: carts } = useCartProducts() as { data: CartMetaItem[] };

  const [isForm, setIsForm] = useState<number>(0);
  const { control, handleSubmit, watch } = useForm<CheckoutFormInput>({
    mode: "all",
  });
  const formvalue = watch();
  const config = {
    reference: new Date().getTime().toString(),
    email: `AuthUser?.uid@gmail.com`,
    amount: 200 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200, so (amount in naira * 100 kobo)
    publicKey: ENV.PayPublicKey,
    metadata: {
      custom_fields: [
        {
          display_name: "ProductPurchase",
          variable_name: "description",
          value: "Funding Wallet",
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  } as HookConfig;
  const onSubmit: SubmitHandler<CheckoutFormInput> = (data) => {
    if (isForm === 2) {
      // last form, run the necessary operations
    } else if (isForm === 1) {
      // on account form
    } else {
      setIsForm(isForm + 1);
    }
    console.log("form data", data);
  };
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isForm]);

  const CheckoutRoute = [
    { title: "Shipping", icon: "store" },
    { title: "Account", icon: "account" },
    { title: "Payment and Billing", icon: "payment" },
  ];

  // paystack function
  const initializePayment = usePaystackPayment(config);
  // you can call this function anything
  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const TotalProductPrice = _.sumBy(carts, (item): any => {
    if (item.metadata) {
      let discountedPrice = item.metadata.price;
      if (item.discount?.value) {
        discountedPrice =
          item.metadata.price * (1 - (item.discount?.value || 1) / 100);
      }
      return discountedPrice * item.quantity;
    }
  });

  return (
    <MainLayout title="Checkout - Vint" no_footer>
      <div className="relative flex flex-col-reverse md:block">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-4 md:w-[75%] md:px-8 py-12"
        >
          <ol className="flex items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 bg-white shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:space-x-4 rtl:space-x-reverse">
            {CheckoutRoute.map((item, index) => (
              <button
                type="submit"
                key={index}
                className={`flex items-center gap-x-1 ${
                  isForm == index ? "text-rose-600" : ""
                }`}
              >
                <div
                  className={`border p-1 rounded-full ${
                    isForm == index
                      ? "bg-rose-600 border-rose-600 text-white"
                      : "border-gray-200"
                  }`}
                >
                  {item.icon == "store" && (
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                      />
                    </svg>
                  )}
                  {item.icon == "payment" && (
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                      />
                    </svg>
                  )}
                  {item.icon == "account" && (
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="square"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {/* Personal{" "} */}
                  <span className="hidden sm:inline-flex">{item.title}</span>
                  {CheckoutRoute.length - 1 !== index && (
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m7 9 4-4-4-4M1 9l4-4-4-4"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </ol>
          <div className="mt-7">
            {isForm == 0 && (
              <div className="pb-32">
                <h3 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
                  Ship To
                </h3>
                <p className="mt-1 text-xs font-medium italic">
                  All asterik (*) are required to be filled.
                </p>
                {JSON.stringify(formvalue)}

                <div className="mt-6 w-full space-y-8">
                  {/* first name & last name */}
                  <div className="flex flex-col gap-6 md:gap-12 md:flex-row">
                    <Input
                      control={control}
                      name="first_name"
                      placeholder="First Name"
                      rules={{ required: "First name is required" }}
                      defaultValue={formvalue.first_name}
                    />
                    <Input
                      control={control}
                      name="last_name"
                      placeholder="Last Name"
                      rules={{ required: "Last name is required" }}
                      defaultValue={formvalue.last_name}
                    />
                  </div>
                  {/* street address */}
                  <div>
                    <TextArea
                      control={control}
                      name="street_address"
                      placeholder="Street Address"
                      rules={{ required: "Street address is required" }}
                      defaultValue={formvalue.street_address}
                    />
                  </div>
                  {/* postal code & town/city */}
                  <div className="flex flex-col gap-6 md:gap-12 md:flex-row">
                    <Input
                      control={control}
                      name="postal_code"
                      placeholder="Postal Code"
                      rules={{ required: "Postal code is required" }}
                      defaultValue={formvalue.postal_code}
                    />
                    <Input
                      control={control}
                      name="town"
                      placeholder="Town/City"
                      rules={{ required: "Town/City is required" }}
                      defaultValue={formvalue.town}
                    />
                  </div>
                  {/* state/province */}
                  <div>
                    <SelectDropdown
                      control={control}
                      placeholder="State/Province"
                      name="state"
                      disableOptionKeys={["abia"]}
                      defaultValue={formvalue.state}
                      options={NigeriaState}
                      rules={{
                        required:
                          "State is required. <em>Input a correct state or choose from dropdown</em>",
                      }}
                    />
                  </div>
                  {/* phone number */}
                  <div>
                    <Input
                      type="tel"
                      control={control}
                      name="phone_number"
                      placeholder="Phone number"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: NumberPattern,
                          message: "Phone number can't contain letters",
                        },
                      }}
                      defaultValue={formvalue.phone_number}
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <Button type="submit">Next Step: Account</Button>
                </div>
              </div>
            )}
            {isForm == 1 && (
              <div>
                <h3 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
                  Create an account
                </h3>
                <p className="mt-1 text-xs font-medium italic">
                  Create an account with us now to easily place order
                  anytime!anywhere
                </p>
                <div className="mt-6 space-y-8">
                  <div>
                    <Input
                      control={control}
                      rules={{
                        required: "Email field is required",
                        pattern: {
                          value: EmailPattern,
                          message: "Ouch, that doesn't look like an email!",
                        },
                      }}
                      name="email"
                      type="email"
                      defaultValue={formvalue.email}
                      placeholder="Email address"
                    />
                  </div>
                  <div className="flex flex-col gap-6 md:gap-12 md:flex-row">
                    <Input
                      type="password"
                      control={control}
                      name="password"
                      placeholder="Password"
                      defaultValue={formvalue.password}
                      rules={{
                        required: "Password field is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must contain the following: <br/> <em> - a <strong>lowercase</strong> letter <br/> - an <strong>uppercase</strong> letter <br/> - a <strong>number</strong> <br/> - Minimum of 8 characters </em> ",
                        },
                        pattern: {
                          value: PasswordPattern,
                          message:
                            "Password must contain the following: <br/> <em> - a <strong>lowercase</strong> letter <br/> - an <strong>uppercase</strong> letter <br/> - a <strong>number</strong> <br/> - Minimum of 8 characters </em> ",
                        },
                      }}
                    />

                    <Input
                      type="password"
                      control={control}
                      name="confirm_password"
                      placeholder="Confirm Password"
                      defaultValue={formvalue.password}
                      rules={{
                        required: "Password field is required",
                        validate: (value) =>
                          value === formvalue.password
                            ? true
                            : "Password is mismatch. Enter the right password",
                        pattern: {
                          value: PasswordPattern,
                          message:
                            "Password must contain the following: <br/> <em> - a <strong>lowercase</strong> letter <br/> - an <strong>uppercase</strong> letter <br/> - a <strong>number</strong> <br/> - Minimum of 8 characters </em> ",
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    className="undefined inline-flex items-center px-4 py-0.5 text-base font-medium text-center rounded-lg bg-rose-700 hover:bg-rose-800 border-4 border-transparent hover:border-gray-800 hover:ring-2 hover:outline-none hover:ring-rose-600"
                  >
                    Next Step: Payment and Billing
                  </button>
                </div>
              </div>
            )}
            {isForm == 1 && (
              <div className="pb-32">
                <h3 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
                  Payment & Billing
                </h3>
                <p className="mt-1 text-xs font-medium italic">
                  Please take note that this would only be a test development
                  payment. As no real money is involved. Thank you.
                </p>
                <div className="mt-5">
                  <p>Billing Address:</p>
                  <div className="border border-gray-2 py-3 px-5 rounded-lg">
                    street_address, <br />
                    town_citu, Province,
                    <br /> Nigeria
                  </div>
                </div>
                <PaystackButton
                  publicKey={ENV.PayPublicKey}
                  email="als@gmail.com"
                  amount={1000 * 100}
                  text="Paystack"
                  onSuccess={onSuccess}
                  onClose={onClose}
                />
                <br />
                <PaystackConsumer
                  {...{
                    reference: new Date().getTime().toString(),
                    email: "user@example.com",
                    amount: TotalProductPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                    publicKey: ENV.PayPublicKey,
                  }}
                >
                  {({ initializePayment }) => (
                    <button
                      onClick={() => initializePayment(onSuccess, onClose)}
                    >
                      Paystack Consumer Implementation
                    </button>
                  )}
                </PaystackConsumer>
                <div className="mt-12 flex flex-wrap items-stretch gap-4">
                  <Button
                    className="flex gap-2"
                    onClick={() => {
                      initializePayment({ onSuccess, onClose });
                    }}
                  >
                    <p>Pay with</p>
                    <img src="paystack.svg" className="w-16 md:w-24" />
                  </Button>
                  <Button disabled className="flex gap-2">
                    <p>Pay with</p>
                    <img src="paypal.svg" className="w-16 md:w-24" />
                  </Button>
                  <Button disabled className="flex gap-2">
                    <p>Pay with</p>
                    <img src="stripe.svg" className="w-16 md:w-20" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
        <div className="w-full top-[12%] right-0 h-auto bg-gray-600 px-2 pt-5 pb-5 md:fixed md:px-5 md:pt-12 md:w-[25%] md:min-h-screen md:h-full">
          <div className="bg-gray-800 px-4 py-3">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <Link
                to="/user/carts"
                className="text-sm text-rose-600 underline underline-offset-4 decoration-rose-600 decoration-dotted"
              >
                Edit cart
              </Link>
            </div>
            <div className="space-y-1 mt-4 mb-5">
              {carts.map((item, index) => {
                const product = item.metadata;
                return (
                  <div key={index} className="flex items-start justify-between">
                    <p className="text-sm font-medium">{product?.name}:</p>
                    <div>
                      {price(
                        (product?.price || 1) * (product?.cartQuantity || 1),
                        "currency",
                        0
                      )}
                      {item.discount && (
                        <span
                          className="ml-1 text-xs"
                          dangerouslySetInnerHTML={{
                            __html: `-${item.discount.value}%`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
            <div className="mt-5 flex items-center justify-between">
              <p>Order Total:</p>
              <p className="text-lg font-extrabold">
                {price(TotalProductPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Checkout;
