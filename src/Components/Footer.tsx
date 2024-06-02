const Footer = () => {
  return (
    <div className="px-6 pt-8 pb-2 md:px-10">
      <div>Logo is here</div>
      <p className="text-xs font-normal">
        Power Up Your Life: The Latest in Laptops, Gadgets, and Software
      </p>

      <div className="inline-flex items-center justify-center gap-1 w-full">
        <div>
          <span className="text-sm font-bold">Powered By</span>
        </div>
        <div
          className="bg-no-repeat bg-contain bg-center w-24 h-10"
          style={{
            backgroundImage:
              "url('https://lh6.googleusercontent.com/4YxlDkJwbdpqJk7dW0YggqzmSoOWDm-E4_sGqwa18jVKfIzvv9IxTvtkXv9on3JQMV1JvPpvU5R1u5nYGBKwx-PKq_vPr04ada4GYNVet1rx5BWGdLb2Nca4pvWZwvp72A=w976')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Footer;
