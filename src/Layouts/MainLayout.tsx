import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { motion } from "framer-motion";
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
        <LoadingBar height={3} color="#ef4444" progress={100} />
      )}

      <meta name="description" content={description} />
      <title>{title} - Pretium Concept</title>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50"
      >
        {!no_navbar && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Navbar />
          </motion.div>
        )}

        <motion.main
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1"
        >
          {children}
        </motion.main>

        {!no_footer && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Footer />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default MainLayout;
