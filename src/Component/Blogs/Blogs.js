import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [load, setLoad] = useState(false);
  const [allCourse, setAllCorse] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [countCourse , setCountCourse] = useState(0);
  const navigate=useNavigate()


  useEffect(() => {
    setLoad(false);
    fetch(`http://localhost:5000/blogs?_start=&_limit=${visibleCourses}`)
      .then((res) => res.json())
      .then((data) => {
        
        if (data.length < visibleCourses  ) {
          setAllCorse(true);
        }
        setBlogs(data);
        setLoad(true);
      });
  }, [visibleCourses]);
  const handleNavigate = (id) => {
    
    navigate(`/blogs/${id}`)
    
  };
  
  
  return (
    <div className="container mx-auto px-12 py-6 font-sf">
      <h2 className="text-xl  text-slate-600 mb-6">مقالات </h2>
      {load ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map(({ id, title, short_description, image }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow  duration-300"
            >
              <img
                src={image || "https://via.placeholder.com/400"}
                alt={title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {short_description}
                </p>
                <a
                  onClick={()=>handleNavigate(id)}
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  ادامه مطلب
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      )}
      {load && !allCourse && (
        <div className="text-center my-4 mt-8">
          <button
            onClick={() => setVisibleCourses(visibleCourses + 8)}
            className="bg-[#286BB8] hover:bg-[#1C4E88] text-white px-4 py-2 rounded-md cursor-pointer font-sf"
          >
            مشاهده بیشتر
          </button>
        </div>
      )}
    </div>
  );
}
