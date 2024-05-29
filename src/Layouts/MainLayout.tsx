import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React from "react";

const MainLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
}> = ({ children, title, description }) => {
  return (
    <>
      <div className="inline-flex flex-col justify-between w-full min-h-screen ">
        <meta name="description" content={description} />
        <title>{title}</title>
        <Navbar />
        <div id="page">
          <div id="wrapper">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
