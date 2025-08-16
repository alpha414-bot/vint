import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React, { useLayoutEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const MainLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description?: string;
  no_navbar?: boolean;
  no_footer?: boolean;
}> = ({ children, title, description, no_navbar, no_footer }) => {
  const [showLoadingBar, setShowLoadingBar] = useState<boolean>(false);
  useLayoutEffect(() => {
    setShowLoadingBar(true);
  }, []);
  return (
    <>
      {showLoadingBar && (
        <LoadingBar
          height={3}
          color="#059669"
          // transitionTime={800}
          progress={100}
        />
      )}

      <meta name="description" content={description} />
      <title>{title} - Emeralds Venture</title>
      <div>
        {/* <div className="inline-flex flex-col justify-between w-full min-h-screen "> */}
        {!no_navbar && <Navbar />}
        <div id="page" className="relative z-10">
          <div id="wrapper">{children}</div>
        </div>
        {!no_footer && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
