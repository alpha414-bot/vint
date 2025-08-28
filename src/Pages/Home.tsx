import ProductItem from "@/Components/ProductItem";
import MainLayout from "@/Layouts/MainLayout";
import { notify } from "@/notify";
import { courses } from "@/System/courses";
import { businessNo } from "@/System/function";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <MainLayout
      title="Pretium Concept - Premium Course Platform"
      description="Pretium Concept: The modern light-themed platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gradient-to-br from-main-50 via-white to-main-100"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden py-20"
        >
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-main-600 via-main-500 to-main-700 bg-clip-text text-transparent drop-shadow-sm">
                Pretium Concept
              </h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed"
              >
                The premium platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a
                href="#courses"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-main-600 to-main-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10">Explore Courses</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-main-700 to-main-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.svg
                  className="ml-2 w-5 h-5 relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Courses Section */}
        <motion.section
          variants={itemVariants}
          id="courses"
          className="py-16 px-4 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of courses designed to accelerate your business growth
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <ProductItem
                  product={course}
                  type="product_listing"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          variants={itemVariants}
          className="py-16 px-4 bg-gradient-to-r from-main-50 to-main-100"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Join Our Newsletter
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Stay updated with the latest courses, tips, and exclusive content delivered to your inbox.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(() => {
                notify.success({
                  text: "You have successfully joined our newsletter!",
                });
              })}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full bg-white border-2 border-main-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-main-500 focus:ring-2 focus:ring-main-200 transition-all duration-300"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-main-600 to-main-700 hover:from-main-700 hover:to-main-800 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join Now
              </motion.button>
            </motion.form>
          </div>
        </motion.section>

        {/* Company Registration Section */}
        <motion.section
          variants={itemVariants}
          className="py-16 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-main-600">
                Registered Business
              </h3>
              <p className="text-gray-600 mb-6">
                Pretium Concept is a registered business with the Corporate Affairs Commission (CAC) of Nigeria.
              </p>

              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700">Business Number:</span>
                  <span className="bg-gradient-to-r from-main-600 to-main-700 text-white px-4 py-2 rounded-full font-mono text-lg shadow-md">
                    {businessNo}
                  </span>
                </div>

                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src="/img/cac.png"
                      alt="CAC Certificate"
                      className="w-80 h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-main-600/20 to-transparent"></div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="mt-8"
              >
                <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-main-100 to-main-200 text-main-700 rounded-full font-semibold shadow-md">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified & Trusted
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Trust & Security Section */}
        <motion.section
          variants={itemVariants}
          className="py-16 px-4 bg-gradient-to-r from-main-600 to-main-700"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Secure & Professional Platform
              </h3>
              <p className="text-main-100 text-lg mb-8 max-w-2xl mx-auto">
                Your learning journey is protected with enterprise-grade security and professional course delivery.
              </p>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="inline-block bg-white/20 backdrop-blur text-white px-8 py-4 rounded-full font-semibold text-xl shadow-lg">
                  🚫 Scam-Free Zone
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </MainLayout>
  );
};

export default Home;
