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
      <meta name="description" content={description} />
      <title>{title}</title>
      <Navbar />
      <div id="page">
        <div id="wrapper">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
