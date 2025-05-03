import React from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-800 py-12 md:py-16 border-t border-gray-200 dark:border-gray-700 font-sf">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              © {new Date().getFullYear()} تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-x-3">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 text-xl"
                aria-label="Telegram"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 text-xl"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-x-4 space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex mx-4 gap-x-4">
              <a
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
              >
                حریم خصوصی
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
              >
                شرایط و قوانین
              </a>
              <a
                href="/contact"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
              >
                تماس با ما
              </a>
            </div>
            <form className="flex items-center space-x-2">
              <input
                dir="ltr"
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 py-2 px-4 rounded-e-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 transition-colors duration-300 rounded-e-md">
                عضویت
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
