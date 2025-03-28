import React from 'react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// import reportWebVitals from './reportWebVitals';


root.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
