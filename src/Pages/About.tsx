import MainLayout from "@/Layouts/MainLayout";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const About = () => {
  const PartnerSliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    centerMode: true,
  } as Settings;
  const PartnerData = [
    {
      img: "https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Flutterwave_Logo.png" // Flutterwave
    },
    {
      img: "https://seeklogo.com/images/P/paystack-logo-0B2E8C0C0E-seeklogo.com.png" // Paystack
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" // Flutter
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" // Microsoft
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" // Google
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" // React
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" // JavaScript
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Cib-github.svg" // GitHub
    },
  ];
  return (
    <MainLayout title="About Us">
      <div className="px-5 py-10 space-y-12 md:px-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-wider">About Us</h2>
          <div className="mt-2 font-normal">
            Welcome to <strong> Emeralds Ventures</strong>, where we are committed to providing the best tech solutions for our customers. Our mission is to empower individuals and businesses with the latest technology, helping them thrive in a fast-paced digital world, and our vision is to be a leading tech company that transforms the way people interact with technology. Together, we can achieve great things and make a positive impact on the world through innovation and collaboration.
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold tracking-wider">
            Our Partners
          </h2>
          <div className="mt-6 px-18">
            <Slider arrows {...PartnerSliderSettings} className="">
              {PartnerData.map((item, index) => (
                <div key={index} className={"p-4"}>
                  <div
                    className="w-full h-40 bg-no-repeat bg-contain bg-[left_top_50%] rounded-lg"
                    style={{
                      backgroundImage: `url("${item.img}")`,
                    }}
                  ></div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
