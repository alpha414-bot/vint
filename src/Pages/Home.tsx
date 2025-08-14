
import ProductItem from "@/Components/ProductItem";
import MainLayout from "@/Layouts/MainLayout";
import { notify } from "@/notify";
import { courses } from "@/System/function";
import React from "react";
import { useForm } from "react-hook-form";

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm();
  return (
    <MainLayout
      title="Emerald - Ecommerce Course Platform"
      description="Emerald: The modern dark-themed platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses."
    >
      {/* SEO Metadata */}
      <meta name="description" content="Emerald: The modern dark-themed platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses." />
      <meta property="og:title" content="Emerald - Ecommerce Course Platform" />
      <meta property="og:description" content="Emerald: The modern dark-themed platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses." />
      <meta property="og:image" content="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" />
      <meta name="theme-color" content="#0f172a" />

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center pt-20 pb-8 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-rose-400 drop-shadow-lg">Emerald</h1>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto text-gray-300">
            The modern platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses.
          </p>
          <a href="#courses" className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200">
            Explore Courses
          </a>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-6 px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <ProductItem
                key={course.id}
                product={course}
                type="product_listing"
              />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 flex flex-col items-center justify-center bg-[#0f172a]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-rose-400">Join Our Newsletter</h2>
          <form onSubmit={handleSubmit(() => {
            notify.success({
              text: "You have successfully being added to our newsletter",
            });
          })}
            className="flex flex-col md:flex-row gap-4 w-full max-w-lg">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-[#1e293b] text-white border border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
            >
              Join Now
            </button>
          </form>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
