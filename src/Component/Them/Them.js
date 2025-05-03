import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Them() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className="text-gray-600 dark:text-white cursor-pointer"
    >
      {darkMode ? (
        <FaMoon className="size-5 hover:text-blue-500 transition-colors duration-100" />
      ) : (
        <FaSun className="size-5 hover:text-blue-500 transition-colors duration-100" />
      )}
    </div>
  );
}
