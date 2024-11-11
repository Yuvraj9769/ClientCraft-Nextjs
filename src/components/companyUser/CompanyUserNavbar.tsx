"use client";

import { setDarkMode, setProfile } from "@/store/features/CRM/CRMSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect } from "react";
import Profile from "@/components/Profile";
import axios from "axios";
import { usePathname } from "next/navigation";

const CompanyUserNavbar = () => {
  const darkMode = useAppSelector((state) => state.darkMode);
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();

  const pathname = usePathname();

  const logout = async () => {
    try {
      const res = await axios.get("/api/companyUser/logout");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.documentElement.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-700 dark:from-blue-900 dark:via-teal-900 dark:to-purple-900 p-2 sticky top-0 z-20 flex items-center justify-between w-full">
      <h3 className="text-2xl font-semibold text-slate-50">ClientCraft</h3>
      <ul className="px-3 flex items-center gap-2">
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
          href="/clients"
          className={`block lg:inline-block text-white hover:text-gray-300 mr-4 ${
            pathname === "/" && "font-semibold"
          }`}
        >
          Clients
        </Link>
        <Link
          href="/note"
          className={`block lg:inline-block text-white hover:text-gray-300 mr-4 ${
            pathname === "/" && "font-semibold"
          }`}
        >
          Add Note
        </Link>
        <p
          className="inline-flex items-center justify-center cursor-pointer mr-2"
          onClick={() => dispatch(setDarkMode(!darkMode))}
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
            <p className="bg-transparent border border-gray-300 w-full h-full inline-flex items-center justify-center cursor-pointer rounded-full text-slate-50 font-semibold">
              {user.email.slice(0, 1).toUpperCase()}
            </p>

            {profile && <Profile logout={logout} />}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default CompanyUserNavbar;
