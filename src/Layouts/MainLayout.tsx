import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React, { useLayoutEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const MainLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
}> = ({ children, title, description }) => {
  const [showLoadingBar, setShowLoadingBar] = useState<boolean>(false);
  useLayoutEffect(() => {
    setShowLoadingBar(true);
  }, []);
  return (
    <>
      {showLoadingBar && (
        <LoadingBar
          height={3}
          color="rgb(190,18,60)"
          // transitionTime={800}
          progress={100}
        />
      )}

      <meta name="description" content={description} />
      <title>{title}</title>
      <div className="inline-flex flex-col justify-between w-full min-h-screen ">
        <Navbar />
        <div id="page" className="relative z-10">
          <div id="wrapper">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
