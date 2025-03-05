import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LastBlog() {
  const [lastCourse, setLastCourse] = useState([]);
  let [load, setLoad] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoad(false);
    fetch("http://localhost:5000/blogs?_sort=id&_order=desc&_limit=8")
      .then((res) => res.json())
      .then((data) => {
        setLastCourse(data);
        setLoad(true);
      });
  }, []);
  const handleNavigate = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="px-16 pt-6 pb-6 ">
      <div className="section_last text-slate-500 text-base font-sf my-8 dark:text-yellow-50">
        جدیدترین مقالات
      </div>
      {load ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
          {lastCourse.map(
            ({ id, title, image, short_description, instructor }) => (
              <div
                className="course flex flex-col bg-white dark:bg-slate-600  rounded-xl"
                key={id}
              >
                <a className="block h-36" href="" title={title}>
                  <img
                    className="size-full object-fill rounded-xl"
                    loading="lazy"
                    src={image}
                    alt=""
                  />
                </a>

                <div className="flex-grow px-4.5 pt-4 pb-3 mx-3">
                  <h3 className="font-danaDemiBold line-clamp-2 mb-3">
                    <a href="">{title}</a>
                  </h3>

                  <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-400">
                    {short_description}
                  </p>
                </div>

                <div className="px-4.5 pb-3 pt-2">
                  <div className="flex justify-between gap-2.5 text-slate-500 dark:text-white/70 text-sm pb-3 border-b border-b-neutral-200/70 dark:border-b-white/10">
                    <div className="flex items-center gap-x-0.5 hover:text-green-500 transition-colors"></div>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span className="flex items-center gap-x-0.5 text-slate-500 dark:text-white/70 text-sm">
                      <svg className="size-5">
                        <use href="#users"></use>
                      </svg>
                    </span>

                    <div className="flex  items-center w-full">
                      <a
                        onClick={() => handleNavigate(id)}
                        className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                      >
                        ادامه مطلب
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
          </div>
        </div>
      )}
    </div>
  );
}
