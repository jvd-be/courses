import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../Context/Context";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Login() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const { isRegster, setIsRegster } = useContext(ContextData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!userName) newErrors.userName = "نام کاربری الزامی است";
    else if (userName.length < 3) newErrors.userName = "نام کاربری باید حداقل 3 حرف باشد";
    else if (!/^[a-zA-Z0-9_]+$/.test(userName)) newErrors.userName = "نام کاربری فقط شامل حروف، اعداد و _ باشد";

    if (!password) newErrors.password = "رمز عبور الزامی است";
    else if (password.length < 6) newErrors.password = "رمز عبور باید حداقل 6 کاراکتر باشد";

    if (login) {
      if (!email) newErrors.email = "ایمیل الزامی است";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "ایمیل نامعتبر است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePost = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      if (login) {
        const newUser = { userName, password, email };
        const updatedUser = [...users, newUser];
        setUsers(updatedUser);
        setUserName("");
        setEmail("");
        setPassword("");
        setErrors({});

        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (response.ok) setShowModal(true);
      } else {
        const user = users.find((item) => item.userName === userName && item.password === password);
        if (user) {
          localStorage.setItem("userName", JSON.stringify(user.userName));
          setIsRegster(true);
          localStorage.setItem("regster", JSON.stringify(true));
          navigate("/");
        } else {
          alert("باید ابتدا ثبت‌نام کنی");
        }
      }
    } catch (error) {
      console.log("Error fetch:", error);
    }
  };

  const toggleLogin = () => {
    setLogin((prevLogin) => !prevLogin);
    setErrors({});
    setUserName("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="flex flex-col justify-center items-center font-sf bg-[#EEF3F9] dark:bg-slate-800">
      <div className="w-96 mx-auto py-10 my-28 shadow-md bg-sky-50 dark:bg-slate-800 dark:text-yellow-50">
        <div className="flex justify-center">
          <h2
            onClick={toggleLogin}
            className={`${
              !login ? "bg-gradient-custom text-white" : "bg-transparent text-[#006eb3]"
            } px-3 py-1 rounded-s-md cursor-pointer`}
          >
            ورود به سایت
          </h2>
          <h2
            onClick={toggleLogin}
            className={`${
              login ? "bg-gradient-custom text-white" : "bg-transparent text-[#006eb3]"
            } px-3 py-1 rounded-e-md cursor-pointer`}
          >
            ثبت‌نام
          </h2>
        </div>

        <form className="flex flex-col py-7 gap-6" onSubmit={handlePost}>
          <div className="text-center">
            <input
              className="outline-none rounded-md border border-gray-400 bg-[#e4edf8] w-4/6 pr-3 py-1"
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value.trim())}
              placeholder="نام کاربری"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>

          <div className="text-center">
            <input
              className="outline-none bg-[#e4edf8] rounded-md border border-gray-400 w-4/6 pr-3 py-1"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              placeholder="رمز عبور"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {login && (
            <div className="text-center">
              <input
                className="outline-none bg-[#e4edf8] rounded-md border border-gray-400 w-4/6 pr-3 py-1"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder="ایمیل"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          )}

          <div
            onClick={handlePost}
            className="flex justify-center items-center gap-x-3 text-center py-2 mx-auto rounded-md text-white bg-gradient-custom hover:bg-gradient-hover w-4/6 cursor-pointer"
          >
            <input type="button" value={login ? "ثبت‌نام" : "ورود"} />
            <FaArrowLeftLong className="w-4 h-4" />
          </div>
        </form>

        {!login && (
          <div className="text-center">
            <a href="#">رمز عبور خود را فراموش کرده‌اید؟</a>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-green-600">ثبت‌نام با موفقیت انجام شد</h2>
            <p className="mt-4 text-gray-600">شما با موفقیت در سیستم ثبت‌نام کردید.</p>
            <button
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
