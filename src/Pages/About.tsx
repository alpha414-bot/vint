import MainLayout from "@/Layouts/MainLayout";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const About = () => {
  const PartnerSliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    centerMode: true,
    swipe: true,
    swipeToSlide: true,
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
    <MainLayout
      title="About Pretium Concept"
      description="Learn about Pretium Concept's mission to provide premium educational solutions and transform professional learning."
    >
      <div className="max-w-7xl mx-auto py-10 px-6 space-y-12">
        <div>
          <h2 className="text-4xl font-extrabold tracking-wider">About Us</h2>
          <div className="mt-2 font-normal">
            Welcome to <strong> Pretium Concept</strong>, where we are committed to providing the best educational solutions for our customers. Our mission is to empower individuals and businesses with cutting-edge knowledge and skills, helping them thrive in a competitive digital economy. Our vision is to be a leading educational platform that transforms how people learn and grow professionally. Together, we can achieve excellence and make a positive impact through premium education and innovation.
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold tracking-wider">
            Our Partners
          </h2>
          <div className="mt-6 px-18">
            <Slider arrows {...PartnerSliderSettings} className="">
              {PartnerData.map((item, index) => (
                <div key={index} className={"p-2"}>
                  <img src={item.img} alt={`Partner ${index + 1}`} className="w-full h-40 object-contain" />
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
