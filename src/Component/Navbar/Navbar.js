import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Them from "../Them/Them";
import Search from "../Search/Search";
export default function Navbar() {
  let [userName, setUserName] = useState(null);
  let [regsteruser, setRegsterUser] = useState(false);
  let [mobileMenue, setmobileMenue] = useState(false);
  let [cartItem, setCartItem] = useState(0);

  //{Check whether the user is logged in or not}
  useEffect(() => {
    try {
      let regster = JSON.parse(localStorage.getItem("regster"));
      console.log(regster);

      setRegsterUser(regster);
      console.log(regsteruser);
    } catch (error) {
      console.log(error);
    }
  }, []);
  //{receive userName}
  useEffect(() => {
    if (regsteruser) {
      try {
        const name = JSON.parse(localStorage.getItem("userName"));
        setUserName(name);
        console.log(userName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [regsteruser, userName]);

  //{show number of cart}
  useEffect(() => {
    let cartLength = JSON.parse(localStorage.getItem("cart"));

    if (cartLength) {
      setCartItem(cartLength.length);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("regster", JSON.stringify(false));
    setRegsterUser(false);
    setUserName(null);
  };

  const menuMobileHandle=()=>{
    
    setmobileMenue(!mobileMenue)    
  }

  return (
    <div>
      <div className="px-8 md:px-16 pt-6 pb-6 flex items-center justify-between font-sf bg-[#EEF3F9]">
        <div className="hidden md:flex items-center md:justify-between text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 block md:size-10 ml-0 md:ml-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </div>
        <ul className="hidden w-full md:flex md:gap-x-10 items-center list-none">
          <NavLink
            to={"./courses"}
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "text-gray-500  dark:text-yellow-50"
            }
          >
            دوره ها
          </NavLink>
          <NavLink
            to={"./blogs"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500  "
                : "text-gray-500   dark:text-yellow-50"
            }
          >
            بلاگ ها
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "text-gray-500  dark:text-yellow-50"
            }
          >
            خانه
          </NavLink>
        </ul>
        <div className="mobile_menu md:hidden">

          <span className="z-20 relative" onClick={menuMobileHandle}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H21M3 12H21M3 18H21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          </span>
          { <div className={`${mobileMenue ? 'opacity-1 right-0 absolute bg-[#d7e6f8]  w-2/5 h-screen ease-linear duration-200 transition-all top-0' : "-right-52 w-2/5 h-full absolute  ease-linear duration-200 transition-all opacity-0 top-0"}`}>
            <ul className=" flex flex-col items-center justify-center gap-y-6 w-full my-20">
          <NavLink
            to={"./courses"}
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "text-gray-500  dark:text-yellow-50"
            }
          >
            دوره ها
          </NavLink>
          <NavLink
            to={"./blogs"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500  "
                : "text-gray-500   dark:text-yellow-50"
            }
          >
            بلاگ ها
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "text-gray-500  dark:text-yellow-50"
            }
          >
            خانه
          </NavLink>
          <NavLink
            to={"cart"}
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "text-gray-500  dark:text-yellow-50"
            }
          >
            سبد خرید
          </NavLink>

            
          
        </ul>
          </div>}
            
        </div>
        <div className="hidden w-4/5 lg:block">
          <Search></Search>
        </div>
        <div className="left_nav flex items-center cursor-pointer justify-end w-full gap-x-12  ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 pr-4 w-8 hidden md:block"
                : "text-gray-500 w-8 hidden md:block dark:text-yellow-50 pr-4"
            }
            to={"cart"}
          >
            <span className="bg-red-600 text-white p-1 rounded-md absolute top-4">
              {cartItem}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </NavLink>
          <div className=" hidden md:block">
            <Them></Them>
          </div>

          <div
            onClick={handleLogout}
            className="  text-gray-600 dark:text-white hover:text-sky-500 hidden md:block "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </div>

          <div className="login bg-[#286BB8] hover:bg-[#1C4E88] text-white px-4 py-2 rounded-md cursor-pointer ">
            <Link to={"./login"}>
              {regsteruser ? userName : "ورود یا ثبت نام"}
            </Link>
          </div>
        </div>
      </div>
      <hr className="" />
    </div>
  );
}
