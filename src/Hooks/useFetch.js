import React, { useEffect, useState, useMemo, useCallback } from "react";

export default function useFetch(url) {
  const [courses, setCourses] = useState([]);
  const [allCourse, setAllCorse] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(8);//{number showCourse}
  const [load, setLoad] = useState(true);
  
  

  useEffect(()=>{
    const fetchData= async()=>{
      setLoad(false);

      try{
        const response= await fetch(url)
        if(!response.ok){
          throw new Error("خطا در دریافت داده‌ها از سرور")
        }
        const data=await response.json()
        if (data.length < visibleCourses || data.length===8) {
                  setAllCorse(true);
                }
        setCourses(data.slice(0,visibleCourses))
        console.log();
        
      }
      catch (err) {
        console.error("خطا:", err.message);
    } 
      
    }
    fetchData()
  },[visibleCourses,allCourse])

  
  const handleLoadMore = useMemo(() => {
    setVisibleCourses(visibleCourses + 8);
  },[]);

    return { courses, allCourse, load, handleLoadMore }

}
