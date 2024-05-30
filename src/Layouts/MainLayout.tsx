import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const MainLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
}> = ({ children, title, description }) => {
  const ref = useRef<LoadingBarRef>(null);
  const location = useLocation();
  const [showLoadingBar, setShowLoadingBar] = useState<boolean>(false);
  useLayoutEffect(() => {
    setShowLoadingBar(true);
    ref.current?.staticStart();
    () => {
      ref.current?.complete();
    };
  }, [location]);
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

      <div className="inline-flex flex-col justify-between w-full min-h-screen ">
        <meta name="description" content={description} />
        <title>{title}</title>
        <Navbar />
        {/* <button onClick={()=>ref.current?.continuousStart()}>start</button> */}
        <div id="page">
          <div id="wrapper">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
