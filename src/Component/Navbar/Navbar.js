import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Them from "../Them/Them";
import Search from "../Search/Search";
import { ContextData } from "../../Context/Context";
import {
  FaBookOpen,
  FaBlogger,
  FaHome,
  FaShoppingCart,
  FaBars,
  FaGraduationCap,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
  const [userName, setUserName] = useState(null);
  const [mobileMenue, setmobileMenue] = useState(false);

  const { isRegster, setIsRegster } = useContext(ContextData);
  const { cartItem, setCartItem } = useContext(ContextData);

  useEffect(() => {
    try {
      let regster = JSON.parse(localStorage.getItem("regster"));
      setIsRegster(regster);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isRegster) {
      try {
        const name = JSON.parse(localStorage.getItem("userName"));
        setUserName(name);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isRegster, userName]);

  const handleLogout = () => {
    localStorage.setItem("regster", JSON.stringify(false));
    setIsRegster(false);
    setUserName(null);
  };

  const menuMobileHandle = () => {
    setmobileMenue(!mobileMenue);
  };

  return (
    <div>
      <div className="px-8 md:px-16 pt-6 pb-6 flex items-center justify-between font-sf duration-300 bg-[#EEF3F9] dark:bg-slate-800">
        <div className="hidden md:flex items-center text-gray-600">
          <FaGraduationCap className="size-8 block md:size-10 ml-0 md:ml-8" />
        </div>
        <ul className="hidden w-full md:flex md:gap-x-10 items-center list-none">
          <NavLink
            to={"./courses"}
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500 dark:text-yellow-50"
            }
          >
            <FaBookOpen className="inline ml-2" />
            دوره ها
          </NavLink>
          <NavLink
            to={"./blogs"}
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500 dark:text-yellow-50"
            }
          >
            <FaBlogger className="inline ml-2" />
            بلاگ ها
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500 dark:text-yellow-50"
            }
          >
            <FaHome className="inline ml-2" />
            خانه
          </NavLink>
        </ul>

        <div className="mobile_menu md:hidden">
          <span className="z-20 relative" onClick={menuMobileHandle}>
            <FaBars className="w-6 h-6 text-gray-600" />
          </span>
          <div
            className={`${
              mobileMenue
                ? "opacity-1 right-0 absolute bg-[#d7e6f8] w-2/5 h-screen ease-linear duration-200 transition-all top-0"
                : "-right-52 w-2/5 h-full absolute ease-linear duration-200 transition-all opacity-0 top-0"
            }`}
          >
            <ul className="flex flex-col items-center justify-center gap-y-6 w-full my-20">
              <NavLink
                to={"./courses"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-yellow-50"
                }
              >
                دوره ها
              </NavLink>
              <NavLink
                to={"./blogs"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-yellow-50"
                }
              >
                بلاگ ها
              </NavLink>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-yellow-50"
                }
              >
                خانه
              </NavLink>
              <NavLink
                to={"cart"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-yellow-50"
                }
              >
                سبد خرید
              </NavLink>
            </ul>
          </div>
        </div>

        <div className="hidden w-4/5 lg:block">
          <Search />
        </div>

        <div className="left_nav flex items-center cursor-pointer justify-end w-full gap-x-12">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 pr-4 w-8 hidden md:block"
                : "text-gray-500 w-8 hidden md:block dark:text-yellow-50 pr-4"
            }
            to={"cart"}
          >
            <span className="bg-red-600 text-white p-1 rounded-md absolute top-4">
              {cartItem.length}
            </span>
            <FaShoppingCart className="size-5" />
          </NavLink>

          <div className="hidden md:block">
            <Them />
          </div>

          <div
            onClick={handleLogout}
            className="text-gray-600 dark:text-white hover:text-sky-500 hidden md:block"
          >
            <FaSignOutAlt className="size-5" />
          </div>

          <div className="login bg-[#286BB8] hover:bg-[#1C4E88] text-white px-4 py-2 rounded-md cursor-pointer">
            <Link to={"./login"}>
              {isRegster ? userName : "ورود یا ثبت نام"}
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
