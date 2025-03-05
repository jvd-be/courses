import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login,setLogin]=useState(false)
  let [userName,setUserName]=useState("")
  let [password,setPassword]=useState("")
  let [email,setEmail]=useState("")
  let [users,setUsers]=useState([])
  let [showModal,setShowModal]=useState(false)
  let [regster,setRegster]=useState(false)
  let navigate=useNavigate()
  
    //{Get users}
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        
      }
    };
    fetchUsers();
  }, []);



  //{Send user data}
  const handlePost=async(event)=>{
    event.preventDefault();
    try {
      if(login){
        let newUser={userName,password,email}
        let updatedUser=[...users,newUser]
        setUsers(updatedUser)
        //{Empty inputs}
        setUserName('')
        setEmail('')
        setPassword('')
        const response = await fetch('http://localhost:5000/users', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        }).then(res=>{
          //{Show medal during registration}
          if(res.ok){
            setShowModal(true)
           
          }
        }

        )
        
        
      }
      else{
      //{Check data when entering}
        let user=users.find((item)=>{
          
         return item.userName === userName && item.password === password
        });
        console.log(user);
        
        if(user){
          console.log(user.userName);
          
             localStorage.setItem('userName',JSON.stringify(user.userName))
             setRegster(true)
             localStorage.setItem('regster',JSON.stringify(true))
             navigate('/')
            
        }
        else{
          alert("باید ابتدا ثبت نام کنی");
        }
      }
      
    } catch (error) {
      console.log(error,"erorr featch");
      
    }
  
  }

  //{Switch between login and signup}
 
  const toggleLogin=()=>{
    setLogin(prevLogin => !prevLogin)
  }
  return (
    <div className=" flex flex-col justify-center items-center font-sf bg-[#EEF3F9] dark:bg-slate-800">
      <div className="  w-96 mx-auto py-10 my-28 shadow-md bg-sky-50 dark:bg-slate-800 dark:text-yellow-50">
        <div className="flex justify-center  ">

        <h2 onClick={toggleLogin}  className={`${!login ? "bg-gradient-custom text-white" : "bg-transparent text-[#006eb3]"} px-3  py-1 rounded-s-md  cursor-pointer` }>ورود به سایت</h2>
        
        <h2 onClick={toggleLogin} className={`${login ? "bg-gradient-custom text-white" : "bg-transparent text-[#006eb3]"} px-3  py-1 rounded-e-md  cursor-pointer` }>ثبت نام</h2>
        </div>
        
        <form
          className=" flex flex-col py-7 gap-6"
          action="/submit-login"
          method="POST"
        >
          <div className="text-center ">
            <label for="username"></label>
            <input
              className="outline-none rounded-md border border-gray-400 bg-[#e4edf8] w-4/6 pr-3 py-1"
              type="text"
              id="username"
              value={userName}
              onChange={(e)=> setUserName(e.target.value.trim())}
              name="username"
              required
              placeholder="نام کاربری "
            />
          </div>

          <div className="text-center ">
            <label for="password"></label>
            <input
              className="outline-none bg-[#e4edf8] rounded-md border border-gray-400 w-4/6 pr-3 py-1"
              type="password"
              id="password"
              name="password"
              value={password}
               onChange={(e)=> setPassword(e.target.value.trim())}
              required
              placeholder="رمز عبور"
            />
          </div>
          {login ? ( <div className="text-center ">
            <label for="email"></label>
            <input
              className="outline-none bg-[#e4edf8] rounded-md border border-gray-400 w-4/6 pr-3 py-1"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value.trim())}
              required
              placeholder="ایمیل"
            />
          </div>) : ('')}
         

          <div onClick={handlePost} className="flex justify-center items-center gap-x-3 text-center py-2 mx-auto rounded-md text-white bg-gradient-custom hover:bg-gradient-hover w-4/6 cursor-pointer">
            <input  type="button" value={`${login ? "ثبت نام" : 'ورود'}`} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.8"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </div>
        </form>
            {login? "":  <div className="text-center ">
          <a href="#">رمز عبور خود را فراموش کرده‌اید؟</a>
        </div>}
      </div>
       {showModal &&  <div id="successModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg w-96 text-center">
            <h2 class="text-2xl font-bold text-green-600">ثبت نام با موفقیت انجام شد</h2>
            <p class="mt-4 text-gray-600">شما با موفقیت در سیستم ثبت نام کردید.</p>
            <button id="closeModalBtn" class="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={()=>setShowModal(false)}>
                بستن
            </button>
        </div>
    </div>}
     
    </div>
  );
}

