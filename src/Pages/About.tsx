import MainLayout from "@/Layouts/MainLayout";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const About = () => {
  const PartnerSliderSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    arrows: true,
    centerMode: true,
    swipe: true,
    swipeToSlide: true,
    // rtl: 
    customPaging: () => <div></div>,
    dotsClass: "py-2",
    appendDots: (dots: React.ReactNode[]) => (
      <div>
        <ul className="custom-slick-dot">{dots}</ul>
      </div>
    ),
  } as Settings;
  const PartnerData = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flutterwave_Logo.png/1200px-Flutterwave_Logo.png" // Flutterwave
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
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png" // GitHub
    },
  ];
  return (
    <MainLayout title="About Us">
      <div className="max-w-7xl mx-auto py-10 space-y-12">
        <div>
          <h2 className="text-4xl font-extrabold tracking-wider">About Us</h2>
          <div className="mt-2 font-normal">
            Welcome to <strong> Emeralds Digital Ventures</strong>, where we are committed to providing the best tech solutions for our customers. Our mission is to empower individuals and businesses with the latest technology, helping them thrive in a fast-paced digital world, and our vision is to be a leading tech company that transforms the way people interact with technology. Together, we can achieve great things and make a positive impact on the world through innovation and collaboration.
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
                  <img src={item.img} alt={`Partner ${index + 1}`} className="w-full h-40 object-contain" />
                  {/* <div
                    className="w-full h-40 bg-no-repeat bg-contain bg-[left_top_50%] rounded-lg"
                    style={{
                      backgroundImage: `url("${item.img}")`,
                    }}
                  ></div> */}
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
