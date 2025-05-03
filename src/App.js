import './App.css';
import { Routes,Route,useRoutes  } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import routes from './router';
import {React,useState,useEffect} from 'react';
import ContextDataProvider from './Context/Context';
function App() {
 
  let route=useRoutes(routes)
  
  
  return (
    <div className="ease-in duration-300 pt-4 bg-[#EEF3F9] dark:bg-slate-800 text-black dark:text-white">
    <ContextDataProvider>

    <Navbar></Navbar>
    {route}
    </ContextDataProvider>
    <Footer></Footer>

    </div>
  );
}

export default App;