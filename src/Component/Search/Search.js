import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [wsearch, setWsearch] = useState("");
  let [course, setCourse] = useState([]);
  let [blog, setBlog] = useState([]);
  let [load, setLoad] = useState(false);
  let [searchContainer,setSarchContainer]=useState(false)
  let navigate=useNavigate()
  
  let handleCourseNavigate=(id)=>{
 
    navigate(`/course/${id}`)
    setSarchContainer(false)
    setWsearch('')

  }
  let handleblogNavigate=(id)=>{
    
      navigate(`/blogs/${id}`)
      setSarchContainer(false)
      setWsearch('')
    
  }
//{receive search data from api}
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
      setSarchContainer(true)
    } else {
      setCourse([]);
      setBlog([]);
      
    }
  }, [wsearch]);
  return (
    <div>
      <div className="search_box flex bg-white px-4 py-2  rounded-md w-full md:w-auto">
        <input
          className="border-none outline-none dark:text-black w-full relative"
          type="text"
          placeholder="هرچی میخوای جستجو کن"
          value={wsearch}
          onChange={(e) => {
            setWsearch(e.target.value);
          }}
          
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#286BB8"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    {wsearch && (
  <div className={`bg-slate-500 w-56 max-h-40 absolute overflow-y-scroll p-3 rounded-md mt-3 shadow-lg z-10 sc ${!searchContainer?'hidden': "block"}`}>
    {/* The review was not empty*/}
    {course.length == 0 && blog.length == 0 ? (
      <p className="text-white text-center">چیزی یافت نشد!!!</p>
    ) : (
      <>
        {/* show results */}
        {course.map((item) => (
          <div onClick={()=>handleCourseNavigate(item.id)} key={item.id} className="flex justify-between items-center pt-4 m-2">
            <span className="font-sf text-sm">{item.title}</span>
            <span>
              <img
                className="w-28 h-20 rounded-md object-center"
                src={item.image}
                alt={item.title}
              />
            </span>
          </div>
        ))}
        {/* نمایش نتایج بلاگ‌ها */}
        {blog.map((item) => (
          <div onClick={()=>handleblogNavigate(item.id)} key={item.id} className="flex justify-between items-center pt-4">
            <span className="font-sf text-sm">{item.title}</span>
            <span>
              <img
                className="w-28 h-20 rounded-md object-center"
                src={item.image}
                alt={item.title}
              />
            </span>
          </div>
        ))}
      </>
    )}
  </div>
)}

    </div>
  );
}
