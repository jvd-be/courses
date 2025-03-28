import React, { useMemo, useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
export default function Courses() {
  const { courses, allCourse, load, handleLoadMore}=useFetch(`http://localhost:5000/courses`)
  //{Go to the course page}
  const navigate = useNavigate();
  const handleNavigate = useCallback((id) => {

    navigate(`/course/${id}`);

  }, [navigate])

  const courseList = useMemo(() => {

    return courses.map(
      ({ id, title, image, price, short_description, instructor }) => (
        <div
          className="course flex flex-col bg-white dark:bg-slate-600 rounded-xl"
          key={id}
        >
          <a className="block h-32" href="" title={title}>
            <img
              className="size-full object-fill rounded-xl"
              loading="lazy"
              src={image}
              alt=""
            />
          </a>

          <div className="flex-grow px-4.5 pt-4 pb-3 mx-3">
            <h3 className="font-danaDemiBold line-clamp-2 mb-3 ">
              <a href="">{title}</a>
            </h3>

            <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-400">
              {short_description}
            </p>
          </div>

          <div className="px-4.5 pb-3">
            <div className="flex justify-between gap-2.5 text-slate-500 dark:text-white/70 text-sm pb-3 border-b border-b-neutral-200/70 dark:border-b-white/10">
              <div className="flex items-center gap-x-0.5 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5">
                  <use href="#user"></use>
                </svg>
                <a href="https://sabzlearn.ir/teacher/rezadolati01">
                  {instructor}
                </a>
              </div>

              <div className="flex items-center gap-x-0.5 text-amber-500">
                <span className="font-danaMedium">5.0</span>
                <svg className="w-5 h-5">
                  <use href="#star-mini"></use>
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="flex items-center gap-x-0.5 text-slate-500 dark:text-white/70 text-sm">
                <svg className="size-5">
                  <use href="#users"></use>
                </svg>
              </span>

              <div className="flex justify-evenly items-center w-full">
                <span className="text-sky-500 font-sf text-base ">
                  {price} میلیون تومان
                </span>
                <a
                  onClick={() => handleNavigate(id)}
                  className="text-white cursor-pointer  bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-md font-sf text-base "
                >
                  ثبت نام
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }, [courses])
  return (
    <div className="px-8 md:px-16 pt-6 pb-6 ">
      <div className="section_last text-xl text-slate-500  font-sf my-8 dark:text-yellow-50">
        تمام دوره ها
      </div>


      {!load ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">

          {courseList}
        </div>
      ) : (
        <div className="">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
          </div>
        </div>
      )}
      {!load && !allCourse && (
        <div className=" flex justify-center mt-8 mb-6 mx-auto w-full ">
          <button
            onClick={handleLoadMore}
            className="bg-[#286BB8] hover:bg-[#1C4E88] text-white px-4 py-2 rounded-md cursor-pointer font-sf"
          >
            مشاهده بیشتر
          </button>
        </div>
      )}
    </div>
  );
}
