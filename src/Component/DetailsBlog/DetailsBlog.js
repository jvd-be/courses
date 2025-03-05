import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";

export default function DetailsBlog() {
  const navigate = useNavigate();
  let idCourse = useParams();
  let [blog, setBlog] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${idCourse.id}`)
      .then((res) => res.json())
      .then((data) => {
        if(data){

          setBlog(data);
        }
        
      });
  }, []);

  let handleBack = () => {
    navigate(-1);
  };
  const {title,image,sections}=blog
  
  console.log(sections)

  if(sections){
    sections.map(item=>{
      console.log(item);
      
    })
    let titles=Object.entries(sections)
  
    console.log(titles);
  }

  
  
  
  
  
  return (
    <div>
      <div className="container mx-auto px-4 py-6">
          
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">{title}</h1>

          <img
            src={image}
            alt="Article Image"
            class="w-full h-96 object-cover rounded-lg mb-6"
          />
          {sections && sections.map(
          ({
            
            s_title,
            content
            
          }) => (
            
          <div className="text-gray-700 leading-relaxed mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
           {s_title}
          </h2>
          <p className="mb-4">
           {content}
          </p>
            </div>
          )
        )
        }
          <div className="flex justify-between items-center">
            <a
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              بازگشت{" "}
            </a>
            <div class="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                لایک
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400">
                کامنت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
