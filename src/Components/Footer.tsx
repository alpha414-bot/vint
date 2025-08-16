import { auth } from "@/firebase-config";
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
      <h2 className="mt-6 text-3xl font-black">{title}</h2>
      <div className="rich-editor mb-4 space-y-4">{content}</div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className=" mt-12 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Column 1: Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Logo type="footer-logo" />
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Emeralds is a modern platform for mastering ecommerce. Learn, launch, and grow your online business with expert-led courses.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                  About
                </NavLink>
              </li>
              {(auth.currentUser?.uid && !auth.currentUser.isAnonymous && (
                <li>
                  <NavLink to="/user/carts" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                    Account
                  </NavLink>
                </li>
              )) || (
                  <>
                    <li>
                      <NavLink to="/login" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/privacy-policy" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/refund-policy" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                  Refund Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-conditions" className="text-base text-gray-300 hover:text-emerald-600 transition duration-150">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  1 OGUNKA STREET, WORLD BANK HOUSING ESTATE<br />
                  ABA, ABIA STATE, NIGERIA
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-emerald-600 flex-shrink-0" />
                <Link to="tel:+2349090976720" className="text-gray-300 text-sm hover:text-emerald-600 transition duration-150">
                  (234) 909-097-6720
                </Link>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-emerald-600 flex-shrink-0" />
                <Link to="mailto:theemeraldchanel@gmail.com" className="text-gray-300 text-sm hover:text-emerald-600 transition duration-150">
                  theemeraldchanel@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner & Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link
              target="_blank"
              to="https://linktr.ee/alphaisx"
              className="inline-flex items-center gap-2"
            >
              <span className="text-xs font-semibold text-gray-300">Powered By</span>
              <div
                className="bg-no-repeat bg-contain bg-center w-24 h-10 rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://lh6.googleusercontent.com/4YxlDkJwbdpqJk7dW0YggqzmSoOWDm-E4_sGqwa18jVKfIzvv9IxTvtkXv9on3JQMV1JvPpvU5R1u5nYGBKwx-PKq_vPr04ada4GYNVet1rx5BWGdLb2Nca4pvWZwvp72A=w976')",
                }}
              ></div>
            </Link>

            <p className="text-sm text-gray-300 mt-4 md:mt-0">
              &copy; {new Date().getFullYear()} Emeralds Digital Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
