import React, { useEffect, useState } from "react";

export default function Cart() {
  let [cartCourse, setCartCourse] = useState(null);
  const [total, setTotal] = useState(0); //{The total price of the shopping cart}
   const [off, setOff] = useState(""); //{discount text}//
  const [discount, setDiscount] = useState(true);  //{boolean discount}

  //{Get shopping cart information}
  useEffect(() => {
    let cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCartCourse(cartData);
    }
  }, []);

  //{Total price account}

  useEffect(() => {
    if (cartCourse) {
      const prices = cartCourse.reduce((acc, course) => acc + course.price, 0);
      setTotal(prices);
    }
  }, [cartCourse]);
  //{handle discount}
  const handleOff = () => {
    if (off === "new" && discount) {
      setTotal(total * 0.5);
      setDiscount(false);
      setOff("کد تخفیف اعمال شد");
    }
  };
  //{remove Course from the cart}
  const removeCourse = (id) => {
    console.log(cartCourse);
   cartCourse=cartCourse.filter(item=>{
     return item.id !== id
    })
    setCartCourse(cartCourse)
    localStorage.setItem('cart',JSON.stringify(cartCourse))
  };

  return (
    <div className="px-4 py-4 md:px-16 md:py-10 bg-[#EEF3F9] dark:bg-slate-800 font-sf">
      {cartCourse ? (
        <div className="max-w-md md:max-w-2xl mx-auto mt-10 md:mt-20 w-full">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">سبد خرید شما</h2>
          <ul className="space-y-4">
            {cartCourse.map(({ title, price, image,id }) => (
              <li
                key={title}
                className="flex items-center justify-between pb-2 border-b"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={image}
                    alt={title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-gray-500">{price} میلیون تومان</p>
                  </div>
                </div>
                <div onClick={()=>removeCourse(id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer hover:text-red-500 duration-150 transition-colors ease-in"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <p className="font-semibold text-base md:text-lg">
              جمع سبد خرید: {total} میلیون تومان
            </p>
            <div className="mt-4">
              <p className="mb-2">کد تخفیف اولین خرید new</p>
              <input
                type="text"
                placeholder="کد تخفیف"
                className="border rounded-md px-4 py-2 w-full outline-none text-gray-600"
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