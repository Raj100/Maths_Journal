import React from 'react';
import Image from 'next/image';
import { AppContext } from "../AppContext/AppContext";
import { useContext } from "react";
import Link from 'next/link';

const Footer = () => {
    const { theme, settheme } = useContext(AppContext);

    return (
        <>
        <footer className={`bg-${theme}bg text-${theme}txt pt-4 `}>
            <div className='grid grid-cols-1 mf:grid-cols-3 lg:grid-cols-4 px-10 py-8'>
                <div className='flex col-span-2	 flex-col items-center justify-center'>
                    <Image src="/logo.png" alt="logo2" width={100} height={100} />
                    <h1>Mar.it</h1>
                </div>
                <div  className='flex flex-col'>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
                </div>
                <div  className='flex flex-col'>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
                </div>
            </div>

        </footer>
                <div className="text-white text-center w-full flex justify-center p-2 bg-black">
                    <p className="">
                        &copy; {new Date().getFullYear()} Made with ❤️ Raj
                    </p>
                </div>
        </>
    );
};


export default Footer;