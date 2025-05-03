import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi"; // React Icon جایگزین

export default function Search() {
  const [wsearch, setWsearch] = useState("");
  const [course, setCourse] = useState([]);
  const [blog, setBlog] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchContainer, setSarchContainer] = useState(false);
  const navigate = useNavigate();

  const handleCourseNavigate = (id) => {
    navigate(`/course/${id}`);
    setSarchContainer(false);
    setWsearch("");
  };

  const handleblogNavigate = (id) => {
    navigate(`/blogs/${id}`);
    setSarchContainer(false);
    setWsearch("");
  };

  const handleSearch = async () => {
    setLoad(true);
    try {
      const courseResponse = await fetch(
        `http://localhost:5000/courses?q=${wsearch}`
      );
      const courseData = await courseResponse.json();
      setCourse(courseData);

      const blogResponse = await fetch(
        `http://localhost:5000/blogs?q=${wsearch}`
      );
      const blogData = await blogResponse.json();
      setBlog(blogData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    if (wsearch) {
      handleSearch();
      setSarchContainer(true);
    } else {
      setCourse([]);
      setBlog([]);
    }
  }, [wsearch]);

  return (
    <div>
      <div className="search_box flex bg-white px-4 py-2 rounded-md w-full">
        <input
          className="border-none outline-none dark:text-black w-full relative"
          type="text"
          placeholder="هرچی میخوای جستجو کن"
          value={wsearch}
          onChange={(e) => setWsearch(e.target.value)}
        />
        <HiOutlineSearch className="text-blue-600 size-6" />
      </div>

      {wsearch && (
        <div
          className={`bg-slate-500 w-56 max-h-40 absolute overflow-y-scroll p-3 rounded-md mt-3 shadow-lg z-10 sc ${
            !searchContainer ? "hidden" : "block"
          }`}
        >
          {course.length === 0 && blog.length === 0 ? (
            <p className="text-white text-center">چیزی یافت نشد!!!</p>
          ) : (
            <>
              {course.map((item) => (
                <div
                  onClick={() => handleCourseNavigate(item.id)}
                  key={item.id}
                  className="flex justify-between items-center pt-4 m-2"
                >
                  <span className="font-sf text-sm">{item.title}</span>
                  <img
                    className="w-28 h-20 rounded-md object-center"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              ))}
              {blog.map((item) => (
                <div
                  onClick={() => handleblogNavigate(item.id)}
                  key={item.id}
                  className="flex justify-between items-center pt-4"
                >
                  <span className="font-sf text-sm">{item.title}</span>
                  <img
                    className="w-28 h-20 rounded-md object-center"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
