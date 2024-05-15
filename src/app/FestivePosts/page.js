"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const page = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className='pt-20'>
        <div className="text-black p-4">
            <h1 className="text-4xl font-bold text-center text-black">Welcome to Markit</h1>
            <p className="text-lg text-center text-black">AI Marketing Tool for your Business</p>
        </div>
        <div className='px-72 mt-2'>
      <div className="flex gap-2 w-full justify-center">
          <input
            className="border p-3 lg:w-full shadow"
            type="text"
            name=""
            id=""
          />
          <div className="bg-blue-500 p-2 w-10 rounded-lg flex items-center justify-center text-white">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="flex gap-5 my-4">
         <Link href="CustomizedPrompts"><div className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-900">Customised Prompt</div></Link> 
         <Link href="/"> <div className="p-2  bg-blue-500 text-white rounded-lg hover:bg-blue-900">through Website Url</div></Link> 
        </div>
        </div>
        </div>
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Festive Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow-md rounded-md flex flex-col items-center bg-gray-300">
                <Image src="/diwali1.png" alt="diwali" width={300} height={200} />
                <h2 className="text-xl font-semibold">Diwali</h2>
                <p>Diwali is a festival of lights</p>
                <Link href="/festiveposts/diwali">Read More</Link>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md flex flex-col items-center bg-gray-300">
                <Image src="/diwali.png" alt="holi" width={300} height={200} />
                <h2 className="text-xl font-semibold">Holi</h2>
                <p>Holi is a festival of colors</p>
                <Link href="/festiveposts/holi">Read More</Link>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md flex flex-col items-center bg-gray-300">
                <Image src="/Christmas.jpeg" alt="christmas" width={300} height={200} />
                <h2 className="text-xl font-semibold">Christmas</h2>
                <p>Christmas is a festival of joy</p>
                <Link href="/festiveposts/christmas">Read More</Link>
            </div>
            </div>
        </div>
    </>
  )
}

export default page
