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
         <Link href="CustomizedPrompts"><div className="p-2 bg-blue-500 text-white rounded-lg">Customised Prompt</div></Link> 
         <Link href="FestivePosts"> <div className="p-2">Festive Posts</div></Link> 
        </div>
        </div>
        </div>
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Customized Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow-md rounded-md">
                <Image src="/cold.jpeg" alt="diwali" width={300} height={200} />
                <h2 className="text-xl font-semibold">Cold Storage</h2>
                <p>Cold Storage</p>
                <Link href="/festiveposts/diwali">Read More</Link>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
                <Image src="/stationery.jpeg" alt="stationery" width={300} height={200} />
                <h2 className="text-xl font-semibold">Stationery</h2>
                <p>Stationery</p>
                <Link href="/festiveposts/holi">Read More</Link>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
                <Image src="/Bakery.jpeg" alt="Bakery" width={300} height={200} />
                <h2 className="text-xl font-semibold">Bakery</h2>
                <p>Bakery</p>
                <Link href="/festiveposts/christmas">Read More</Link>
            </div>
            </div>
        </div>
    </>
  )
}

export default page
