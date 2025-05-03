import React, { useContext, useEffect, useState } from "react";
import { toPersianNumber } from "../../Helper";
import { ContextData } from "../../Context/Context";
import { FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const { cartItem, setCartItem } = useContext(ContextData);
  const [total, setTotal] = useState(0);
  const [off, setOff] = useState("");
  const [discount, setDiscount] = useState(true);
  const [erorrOff, setErorrOff] = useState(false);

  useEffect(() => {
    let cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCartItem(cartData);
    }
  }, []);

  useEffect(() => {
    if (cartItem) {
      const prices = cartItem.reduce((acc, course) => acc + course.price, 0);
      setTotal(prices);
    }
  }, [cartItem]);

  const handleOff = () => {
    if (cartItem.length > 0) {
      if (off === "new" && discount) {
        setTotal(total * 0.5);
        setDiscount(false);
        setOff("کد تخفیف اعمال شد");
        setErorrOff(false);
      } else if (off !== "new") {
        setErorrOff(true);
      }
    }
  };

  const removeCourse = (id) => {
    const updatedCart = cartItem.filter((item) => item.id !== id);
    setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="py-4 px-8 md:px-16 md:py-10 bg-[#EEF3F9] dark:bg-slate-800 font-sf">
      {cartItem ? (
        <div className="max-w-md md:max-w-2xl mx-auto mt-10 md:mt-20 w-full">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">سبد خرید شما</h2>
          <ul className="space-y-4">
            {cartItem.map(({ title, price, image, id }) => (
              <li key={id} className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-4">
                  <img
                    src={image}
                    alt={title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-gray-500">{toPersianNumber(price.toLocaleString())} میلیون تومان</p>
                  </div>
                </div>
                <div onClick={() => removeCourse(id)} className="cursor-pointer hover:text-red-500 transition-colors duration-150">
                  <FiTrash2 size={24} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <p className="font-semibold text-base md:text-lg">
              جمع سبد خرید: {toPersianNumber(total.toLocaleString())} میلیون تومان
            </p>
            <div className="mt-4">
              <p className="mb-2">کد تخفیف اولین خرید new</p>
              <input
                type="text"
                placeholder="کد تخفیف"
                className={`border rounded-md px-4 py-2 w-full outline-none text-gray-600 ${erorrOff ? "border-red-600" : "border-green-600"}`}
                value={off}
                onChange={(e) => setOff(e.target.value)}
                disabled={!discount}
              />
              <button
                onClick={handleOff}
                className="bg-blue-500 text-white rounded-md px-6 py-2 mt-2 disabled:opacity-50 w-full md:w-auto"
                disabled={!discount}
              >
                اعمال کد
              </button>
            </div>
            <button className="bg-blue-500 text-white rounded-md px-10 py-3 mt-8 w-full">
              پرداخت
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      )}
    </div>
  );
}
