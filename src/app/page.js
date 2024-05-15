"use client"
import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import Cards from "@/components/Cards/Cards";
import Link from "next/link";
import Bisection from "@/components/Bisection/Bisection";

export default function Home() {
  const [userEmail, setUserEmail] = useState(null);
  const [Prompt, setPrompt] = useState(null);
  return (
    <>
      <Navbar></Navbar>
      <main className="flex min-h-screen flex-col items-center p-2 pt-20 lg:px-64 lg:pt-32">
        <div>
          {/* <Image src="/logo.png" width={200} height={200} /> */}
          <h1 className="text-4xl font-bold">Welcome to Markit</h1>
          <p className="text-lg">AI Marketing Tool for your Business</p>
        </div>
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
         <Link href="FestivePosts"> <div className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-900">Festive Posts</div></Link> 
        </div>

        <div>
          <Bisection></Bisection>
        </div>



{/* 
        <div class="flex flex-wrap gap-10">
  <div class="relative w-80 h-52 bg-gray-300 transition-transform transform-gpu hover:scale-y-[2]"></div>
  <div class="relative w-80 h-52 bg-gray-300"></div>
  <div class="relative w-80 h-52 bg-gray-300"></div>
</div> */}

{/* <Cards></Cards> */}


        {/* <div>
        <h2 className="text-2xl font-bold">Features</h2>
        <ul className="list-disc list-inside">
          <li>AI Marketing Tool</li>
          <li>SEO Optimization</li>
          <li>Content Creation</li>
          <li>Analytics</li>
        </ul>
      </div> */}
      </main>
      <Footer></Footer>
    </>
  );
}
