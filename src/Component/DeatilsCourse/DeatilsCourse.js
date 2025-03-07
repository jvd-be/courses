import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function DeatilsCourse() {
  let idCourse = useParams(); //{receive id}
  let [courses, setCourses] = useState();
  let [cart, setCart] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [regsteruser, setRegsterUser] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    try {
      let regster = JSON.parse(localStorage.getItem("regster"));
      setRegsterUser(regster);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/courses/${idCourse.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCourses(data);
        }
      });
  }, [idCourse]);

  useEffect(() => {
    let storgeCart = JSON.parse(localStorage.getItem("cart"));

    if (storgeCart) {
      setCart(storgeCart);
    }
  }, []);

  let handleAddToCart = (course) => {
    if (!regsteruser) {
      navigate("/login");
    } else {
      cart = cart.filter((item) => {
        return item.id !== course.id;
      });

      localStorage.setItem("cart", JSON.stringify([...cart, course]));
      setShowModal(true);
    }
  };

  if (!courses) {
    return (
      <div className="">
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      </div>
    );
  }

  const {
    id,
    title,
    image,
    price,
    short_description,
    full_description,
    instructor,
  } = courses;
  return (
    <div className="container mx-auto px-8 md:px-16 py-6">
      <div className="bg-white dark:bg-slate-600 dark:text-yellow-50 shadow-lg rounded-lg px-8 py-11">
        <div className="flex flex-col md:flex-row gap-8">
          {/* تصویر دوره */}
          <div className="md:w-1/3">
            <img
              src={image}
              alt={title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* اطلاعات دوره */}
          <div className="px-8 md:px-16 pb-3 pt-3.5">
            <h1 className="text-3xl font-sf font-semibold text-gray-800 mb-4">
              {title}
            </h1>
            <p className="text-gray-600 text-lg mb-6 font-sf dark:text-yellow-50">
              {short_description}
            </p>
            <div className="flex items-center gap-4 mb-6 font-sf">
              <div className="text-xl font-semibold text-green-600 font-sf">
                میلیون تومان:{price}
              </div>
            </div>

            <div className="flex items-center mb-4 text-gray-500 font-sf">
              <span className="font-medium dark:text-yellow-50">مدرس:</span>
              <span className="ml-2 dark:text-yellow-50">{instructor}</span>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleAddToCart(courses)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-sf "
              >
                ثبت نام
              </button>
              <button className="bg-transparent hover:bg-gray-200 text-gray-700 border border-gray-300 px-6 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 font-sf dark:text-yellow-50 dark:hover:bg-blue-600">
                اضافه به علاقه‌مندی‌ها
              </button>
            </div>
          </div>
        </div>

        {/* توضیحات بیشتر */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-sf dark:text-yellow-50">
            توضیحات دوره
          </h2>
          <p className="text-gray-600  dark:text-yellow-50 font-sf">
            {full_description}
          </p>
        </div>
      </div>
      {showModal && (
        <div
          id="successModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div class="bg-white p-8 rounded-lg w-96 text-center">
            <h2 class="text-2xl font-bold text-green-600">
              دوره به سبد خرید اضافه شد
            </h2>
            <p class="mt-4 text-gray-600">
              شما با موفقیت در دوره ثبت نام کردید.
            </p>
            <button
              id="closeModalBtn"
              class="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
