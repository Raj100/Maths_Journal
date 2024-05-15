"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../../app/supabase";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useUser } from "@auth0/nextjs-auth0";
// import modeswitch from "../modeswitch/modeswitch";
import CustomizedSwitches from "../modeswitch/modeswitch";
import { AppContext } from "../AppContext/AppContext";
import { useContext } from "react";
import Logo from "../../assets/logo.png";
import Swal from "sweetalert2";

import Image from "next/image";
const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [meuopen, setmenuopen] = useState(false);
  const { theme, settheme } = useContext(AppContext);
  const [menu2, setmenu2] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    };

    fetchUser();
  }, []);

  const handlemenu = () => {
    setmenuopen(!meuopen);
  };
  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error in Signout");
    } else {
      alert("Signout Successfully");
      window.location.href = "/";
    }
  };


  return (
    <>
      <header
        className={`fixed flex w-full justify-between items-center px-4 lg:px-24 z-1000 dark:bg-slate-800 text-${theme}txt ${
          theme === "dark"
            ? "bg-gradient-to-r  from-40% from-slate-800 via-slate-700 to-60% to-slate-800 "
            : " bg-gradient-to-r  from-[#baecee] via-yellow-100 to-[#baecee] shadow-lg"
        } bg-opacity-50 z-[20]`}
      >
        <Link href="/" className="font-concert-one text-xl lg:text-2xl">
        <div className='flex items-center'>
        <Image src="/logo.png" width={75} height={75} />
        <div >
        <h1 className='font-bold'>Mar.it</h1>
        <p className='text-xs'>AI Marketing Tool for your Business</p>
        </div>
      </div>
        </Link>
        <ul className="hidden lg:flex space-x-5 ">
        <li className="hover:text-emerald-300 p-2">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-emerald-300 p-2">
            <Link href="/CustomizedPrompts">Customized Prompts</Link>
          </li>
          <li className="hover:text-emerald-300 p-2">
            {" "}
            <Link href="/FestivePosts">Festive Posts</Link>
          </li>
        </ul>
        <div className="hidden lg:flex items-center space-x-2 ">
          {userEmail ? (
            <>
              <div
                className={`p-2 hover:text-emerald-500 cursor-pointer relative`}
                onMouseOver={() => {
                  setmenu2(1);
                }}
                onMouseLeave={() => {
                  setmenu2(0);
                }}
              >
                {userEmail}
                <ul
                  className={` ${
                    menu2 ? "absolute" : "hidden"
                  } bg-white text-black rounded-md pt-2 `}
                >
                  <Link href="/Profile" className="border-b p-4 ">
                    Profile <i class="fa-solid fa-user"></i>
                  </Link>
                  <li onClick={logout} className="p-4 cursor-pointer">
                    Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="p-2 space-x-2 flex items-center justify-center">
              <div className={`text-${theme}txt`}>
                {<Link href="/Login">Login</Link>}
              </div>
            </div>
          )}
          <div>
            <CustomizedSwitches
              onChange={() => {
                if (theme === "dark") {
                  settheme("light");
                } else {
                  settheme("dark");
                }
              }}
              checked={theme === "dark" ? true : false}
            />
          </div>
        </div>

        <div className="lg:hidden flex gap-4 items-center">
          {userEmail ? (
            <div className=" flex items-center gap-1">
              <div className="text-2xl">
                <i class="fa-regular fa-circle-user"></i>
              </div>
              <div className="text-[10px]">
                <p>{userEmail}</p>
                <p></p>
              </div>
            </div>
          ) : (
            <Link href="/Login">Login</Link>
          )}
          <div onClick={handlemenu} className="lg:hidden text-2xl">
            <i className={`fa-solid ${meuopen ? "fa-xmark" : "fa-bars"}`}></i>
          </div>
        </div>
      </header>

      <div
        className={`fixed w-full text-${theme}txt bg-${theme}bg z-[10] transition duration-300 lg:hidden  ${
          meuopen ? "" : "-translate-y-full"
        }`}
      >
        <ul className="pt-20 text-center flex flex-col lg:flex ">
          <li
            className={`hover:text-yellow-300 p-2  transition duration-300 ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`hover:text-emerald-450 p-2  transition duration-[450ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            {" "}
            <Link href="/CustomizedPrompts">
              <i class="fa-solid fa-graduation-cap"></i> CustomizedPrompts
            </Link>
          </li>
          <li
            className={`hover:text-yellow-300 p-2  transition duration-[600ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/FestivePosts">
              <i class="fa-solid fa-arrow-trend-up"></i> FestivePosts
            </Link>
          </li>
          <li
            className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/Profile">
              <i class="fa-solid fa-user"></i> Profile
            </Link>
          </li>
          <div className="hidden lg:block">
            {userEmail ? (
              <li
                className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
                  meuopen ? "" : "-translate-x-full"
                } cursor-pointer`}
              >
                {userEmail}
              </li>
            ) : (
              <li
                className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
                  meuopen ? "" : "-translate-x-full"
                }`}
              >
                <Link href="/Login">Login</Link>
              </li>
            )}
          </div>
        </ul>
        <div className="hidden just a trigger component bg-darkbg text-lighttxt text-darktxt bg-dark bg-light text-darkth text-lightth from-light to-light from-dark to-dark text-lightth bg-lightbg bg-darkbg text-darktxt text-lighttxt"></div>
      </div>
    </>
  );
};

export default Navbar;
