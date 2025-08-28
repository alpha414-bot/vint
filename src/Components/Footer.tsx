import { auth } from "@/firebase-config";
import { businessNo } from "@/System/function";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";


export const TermsPrivacyItem: FC<{ title: String; content: ReactNode }> = ({
  title,
  content,
}) => {
  return (
    <div className="space-y-2">
      <h2 className="mt-6 text-3xl font-black text-gray-900">{title}</h2>
      <div className="rich-editor mb-4 space-y-4">{content}</div>
    </div>
  );
};

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-br from-main-100 to-main-200 mt-12 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
            <Logo type="footer-logo" />
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Pretium Concept is a premium platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:team@pretiumconcept.com"
                className="p-2 bg-main-600 text-white rounded-full hover:bg-main-700 transition-colors"
              >
                <FaEnvelope className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="tel:+2349090976720"
                className="p-2 bg-main-600 text-white rounded-full hover:bg-main-700 transition-colors"
              >
                <FaPhone className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-sm font-semibold text-main-600 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                  About
                </NavLink>
              </li>
              {(auth.currentUser?.uid && !auth.currentUser.isAnonymous && (
                <li>
                  <NavLink to="/user/carts" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                    Account
                  </NavLink>
                </li>
              )) || (
                  <>
                    <li>
                      <NavLink to="/login" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
            </ul>
          </motion.div>

          {/* Column 3: Policies */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-sm font-semibold text-main-600 tracking-wider uppercase mb-4">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/privacy-policy" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/refund-policy" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                  Refund Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-conditions" className="text-base text-gray-700 hover:text-main-600 transition duration-150">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Contact Information */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-sm font-semibold text-main-600 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-main-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">
                  1 OGUNKA STREET, WORLD BANK HOUSING ESTATE<br />
                  ABA, ABIA STATE, NIGERIA
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-main-600 flex-shrink-0" />
                <Link to="tel:+2349090976720" className="text-gray-700 text-sm hover:text-main-600 transition duration-150">
                  (234) 909-097-6720
                </Link>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-main-600 flex-shrink-0" />
                <Link to="mailto:team@pretiumconcept.com" className="text-gray-700 text-sm hover:text-main-600 transition duration-150">
                  team@pretiumconcept.com
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-main-300 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} Pretium Concept. All rights reserved. | Business Registration: {businessNo}
          </p>
          <motion.div
            className="flex flex-wrap gap-2 justify-center md:justify-end"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 bg-main-100 text-main-700 rounded-full text-xs font-medium"
            >
              ✅ Verified Business
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
            >
              🔒 Secure Platform
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
            >
              🚫 Scam-Free Zone
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Partner Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-main-200 flex flex-col md:flex-row justify-between items-center"
        >
          <Link
            target="_blank"
            to="https://linktr.ee/alphaisx"
            className="inline-flex items-center gap-2 mb-4 md:mb-0"
          >
            <span className="text-xs font-semibold text-gray-600">Powered By</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-no-repeat bg-contain bg-center w-24 h-10 rounded-xl glass"
              style={{
                backgroundImage:
                  "url('/img/alpha.svg')",
              }}
            ></motion.div>
          </Link>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center"
          >
            <p className="text-xs text-gray-500 mb-1">
              Built with ❤️ for business growth
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
