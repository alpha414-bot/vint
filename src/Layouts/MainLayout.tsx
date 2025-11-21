import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React, { useLayoutEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export const defaultAccentColor = "#34853a";

const MainLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description?: string;
  no_navbar?: boolean;
  no_footer?: boolean;
  accent_color?: string;
}> = ({ children, title, description, no_navbar, no_footer, accent_color = defaultAccentColor }) => {
  const [showLoadingBar, setShowLoadingBar] = useState<boolean>(false);
  useLayoutEffect(() => {
    setShowLoadingBar(true);
  }, []);
  return (
    <>
      {showLoadingBar && (
        <LoadingBar color={accent_color} height={3} progress={100} style={{ background: `${accent_color}`, color: `${accent_color}` }} />
      )}

      <meta name="description" content={description} />
      <title>{title} - Emeralds Digital Venture</title>
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
