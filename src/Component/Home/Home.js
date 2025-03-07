import React, { useEffect, useState } from 'react'
import Lastes from '../Latest/Latest';
import LastBlog from '../LastBlog/LastBlog';


export default function Header() {

  return (
    <div id='Home'>
      <div className='px-8 md:px-16 pt-6 pb-6 flex items-center justify-between'>
        <div className="right_Header">
            <h4 className='text-[#286BB8] font-medium text-2xl font-[sf]'>دوره مورد علاقه خود را شروع کنید</h4>
            <h2 className='font-medium text-5xl font-[sf] my-4'>هر کسی باید یاد بگیره</h2>
            <h2 className='font-medium text-5xl font-[sf] text-[#286BB8]'>که چطور کد بزنه</h2>
        </div>
        <div className=" hidden md:flex">
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 arrow">
  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
  
</svg>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 arrow">
  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
  
</svg>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 arrow">
  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
  
</svg>

        </div>
        <div className="left_Header hidden md:block">
            <img src="./Img/landing.webp" alt="" />
        </div>
      </div>
      <Lastes></Lastes>
      <LastBlog></LastBlog>
    </div>
  )
}
