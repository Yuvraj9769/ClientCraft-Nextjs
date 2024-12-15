"use client";

import {
  setDarkMode,
  setProfile,
  setSidebarVisible,
} from "@/store/features/CRM/CRMSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect } from "react";
import CompanyUserProfile from "@/components/companyUser/CompanyUserProfile";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { CldImage } from "next-cloudinary";

const CompanyUserNavbar = () => {
  const darkMode = useAppSelector((state) => state.darkMode);
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);
  const sidebarVisible = useAppSelector((state) => state.sidebarVisible);

  const dispatch = useAppDispatch();

  const pathname = usePathname();

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
    localStorage.setItem("theme_pref", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    gsap.set([".client-cra-txt", "ul > a", "ul > p", "ul > div"], {
      y: -45,
      opacity: 0,
    });

    gsap.to([".client-cra-txt", "ul > a", "ul > p", "ul > div"], {
      duration: 0.5,
      stagger: 0.2,
      opacity: 1,
      y: 0,
    });
  }, []);

  useEffect(() => {
    document.documentElement.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-700 dark:from-blue-900 dark:via-teal-900 dark:to-purple-900 p-2 sticky top-0 z-20 flex items-center justify-between w-full">
      <h3 className="text-2xl font-semibold text-slate-50 client-cra-txt">
        ClientCraft
      </h3>
      <ul className="px-3 md:flex items-center gap-2 hidden">
        <Link
          href="/company-dashboard"
          className={`block lg:inline-block text-white hover:text-gray-300 mr-4 ${
            pathname === "/company-dashboard" && "font-semibold"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/company-projects"
          className={`block lg:inline-block text-white hover:text-gray-300 mr-4 ${
            pathname === "/company-projects" && "font-semibold"
          }`}
        >
          Projects
        </Link>

        <Link
          href="/company-clients"
          className={`block lg:inline-block text-white hover:text-gray-300 mr-4 ${
            pathname === "/company-clients" && "font-semibold"
          }`}
        >
          Clients
        </Link>
        <Link
          href="/add-note"
          className={`block lg:inline-block text-white hover:text-gray-300 mr-4 ${
            pathname === "/add-note" && "font-semibold"
          }`}
        >
          Add Note
        </Link>
        <p
          className="inline-flex items-center justify-center cursor-pointer mr-2"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <Icon
              icon="ic:round-light-mode"
              className="text-2xl text-red-600"
            />
          ) : (
            <Icon icon="tdesign:mode-dark" className="text-2xl text-red-600" />
          )}
        </p>
        <div className="inline-flex items-center justify-center relative h-[50px] w-[50px] rounded-full">
          <div
            className="h-full w-full inline-flex items-center justify-center rounded-full overflow-hidden"
            onClick={() => dispatch(setProfile(!profile))}
          >
            <div className="w-full rounded-full h-[75px] cursor-pointer overflow-hidden inline-flex items-center justify-center">
              {user?.profilePic ? (
                <CldImage
                  width="960"
                  height="600"
                  src={user.profilePic}
                  className="w-full h-full cursor-pointer object-cover"
                  sizes="100vw"
                  alt="User Profile"
                />
              ) : (
                <p className="dark:bg-gray-800 bg-transparent border border-gray-300 dark:border-none w-full h-full inline-flex items-center justify-center cursor-pointer rounded-full dark:text-slate-50 text-black font-semibold">
                  {user?.email?.slice(0, 1)?.toUpperCase()}
                </p>
              )}
            </div>

            {/* <p className="bg-transparent border border-gray-300 w-full h-full inline-flex items-center justify-center cursor-pointer rounded-full text-slate-50 font-semibold">
              {user.email.slice(0, 1).toUpperCase()}
            </p> */}
            {profile && <CompanyUserProfile />}
          </div>
        </div>
      </ul>
      <div className="md:hidden inline-flex items-center gap-4">
        <p
          className="inline-flex items-center justify-center cursor-pointer mr-2"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <Icon
              icon="ic:round-light-mode"
              className="text-2xl text-red-600"
            />
          ) : (
            <Icon icon="tdesign:mode-dark" className="text-2xl text-red-600" />
          )}
        </p>
        <p onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="35"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 15.61L19.59 17l-5.01-5l5.01-5L21 8.39L17.44 12zM3 6h13v2H3zm0 7v-2h10v2zm0 5v-2h13v2z"
            />
          </svg>
        </p>
      </div>
    </div>
  );
};

export default CompanyUserNavbar;
