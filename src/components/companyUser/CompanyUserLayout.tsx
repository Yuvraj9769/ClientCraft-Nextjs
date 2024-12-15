/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import Footer from "../Footer";
import CompanyUserNavbar from "./CompanyUserNavbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDarkMode, setUser } from "@/store/features/CRM/CRMSlice";
import axios from "axios";
import toast from "react-hot-toast";
import PageLoader from "@/components/PageLoader";
import CompanyUserSidebar from "./CompanyUserSidebar";

const CompanyUserLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loadingData, setLoadingData] = useState(true);

  // memorizes a function so that it doesn't get recreated on every render.
  const getUserData = useCallback(async () => {
    try {
      const res = await axios.get("/api/companyUser/auth");
      return res;
    } catch (error: any) {
      throw new Error(error.message || "Sorry something went wrong");
    }
  }, []);

  const user = useAppSelector((state) => state.user);
  const sidebarVisible = useAppSelector((state) => state.sidebarVisible);

  useEffect(() => {
    if (!user.username) {
      setLoadingData(true);
      getUserData()
        .then((data) => dispatch(setUser(data.data.data)))
        .catch((error) => toast.error(error.message))
        .finally(() => setLoadingData(false));
    } else {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    function setClassByOSMode() {
      const storedTheme = localStorage.getItem("theme_pref");

      if (storedTheme) {
        document.documentElement.className = storedTheme;
        dispatch(setDarkMode(storedTheme === "dark"));
      } else {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          document.documentElement.className = "dark";
          dispatch(setDarkMode(true));
        } else {
          document.documentElement.className = "light";
          dispatch(setDarkMode(false));
        }
      }
    }

    setClassByOSMode();
  }, [dispatch]);

  return (
    <>
      {loadingData ? (
        <PageLoader />
      ) : (
        <div className="min-h-screen flex flex-col bg-gray-100">
          <CompanyUserNavbar />
          <main className="flex-1 w-full">
            <div className="bg-white shadow-md rounded p-0">{children}</div>
          </main>
          <Footer />
          {sidebarVisible && <CompanyUserSidebar />}
        </div>
      )}
    </>
  );
};

export default CompanyUserLayout;
