/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  setClientsData,
  setLoggedIn,
  setProfile,
  setProjects,
  setSidebarVisible,
  setTodos,
  setUser,
} from "@/store/features/CRM/CRMSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCamera } from "react-icons/io";
import {
  MdEmail,
  MdFeedback,
  MdLogout,
  MdManageAccounts,
} from "react-icons/md";
import { TbLoader3 } from "react-icons/tb";
import { IoReturnDownForward } from "react-icons/io5";

const CompanyUserSidebar = () => {
  const user = useAppSelector((state) => state.user);
  const sidebarVisible = useAppSelector((state) => state.sidebarVisible);

  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();
  const profilePicChange = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const pathname = usePathname();

  const changeProfilePic = () => {
    profilePicChange.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setLoader(true);
      const profilePic = event.target.files?.[0];

      const formData = new FormData();

      if (!profilePic) {
        toast.error("Please select a profile picture");
        return;
      }

      formData.append("profile-img", profilePic);

      const response = await axios.patch(
        "api/companyUser/updateProfilePic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        toast.success(
          response.data.message || "Profile pic updated successfully"
        );
        dispatch(setUser(response.data.data));
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const logout = async () => {
    try {
      setLoader(true);

      const res = await axios.get("/api/companyUser/logout");
      if (res.data.status === 200 && res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setLoader(false);
      router.push("/login");
      dispatch(setLoggedIn(false));
      dispatch(
        setUser({
          _id: "",
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          phoneNumber: "",
          department: "",
          profilePic: "",
          Clients: [],
          role: "",
          isActive: false,
        })
      );
      dispatch(setTodos([]));
      dispatch(setProjects([]));
      dispatch(setProfile(false));
      dispatch(setClientsData([]));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        document.body.style.overflowY = "scroll";
      } else if (sidebarVisible) {
        document.body.style.overflowY = "hidden";
      }
    };

    document.body.style.overflowY = sidebarVisible ? "hidden" : "scroll";

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflowY = "scroll";
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarVisible]);

  return (
    <div
      className="bg-black bg-opacity-90 fixed top-0 left-0 w-screen min-h-screen h-screen z-30 md:hidden"
      onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
    >
      <div
        className="bg-slate-50 dark:bg-gray-800 font-semibold text-black dark:text-slate-50 w-[75%] h-full p-4 flex flex-col items-start gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-semibold text-3xl h-[100px] w-[100px] rounded-full inline-flex items-center justify-center relative mb-3">
          {loader ? (
            <span className="text-5xl text-black dark:text-slate-50 py-4 mx-auto animate-spin">
              <TbLoader3 />
            </span>
          ) : (
            <div className="w-full rounded-full h-full cursor-pointer overflow-hidden inline-flex items-center justify-center">
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
          )}
          <input
            type="file"
            id="file"
            ref={profilePicChange}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <p
            className="absolute bottom-[-10px] right-0 text-xl p-[6px] shadow-md shadow-gray-400 bg-slate-50 text-red-600 rounded-full z-20 cursor-pointer"
            onClick={changeProfilePic}
          >
            <IoMdCamera />
          </p>
        </div>

        <div className="text-center mb-1">
          <p className="text-lg text-gray-500 dark:text-gray-300">
            {user?.username}
          </p>
        </div>

        <ul className="flex items-start flex-col gap-3 font-normal text-base mb-1">
          <Link
            href="/company-dashboard"
            onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
            className={`inline-flex items-center gap-2 text-black dark:text-white hover:text-gray-300 mr-4 ${
              pathname === "/company-dashboard" && "font-semibold"
            }`}
          >
            <IoReturnDownForward className="text-2xl" /> Dashboard
          </Link>
          <Link
            href="/company-projects"
            onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
            className={`inline-flex items-center gap-2 text-black dark:text-white hover:text-gray-300 mr-4 ${
              pathname === "/company-projects" && "font-semibold"
            }`}
          >
            <IoReturnDownForward className="text-2xl" /> Projects
          </Link>

          <Link
            href="/company-clients"
            onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
            className={`inline-flex items-center gap-2 text-black dark:text-white hover:text-gray-300 mr-4 ${
              pathname === "/company-clients" && "font-semibold"
            }`}
          >
            <IoReturnDownForward className="text-2xl" /> Clients
          </Link>
          <Link
            href="/add-note"
            onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
            className={`inline-flex items-center gap-2 text-black dark:text-white hover:text-gray-300 mr-4 ${
              pathname === "/add-note" && "font-semibold"
            }`}
          >
            <IoReturnDownForward className="text-2xl" /> Add Note
          </Link>
        </ul>

        <p className="text-base w-full inline-flex py-1 items-center justify-start border-b border-b-transparent hover:border-b-slate-700 duration-500 gap-3 overflow-hidden text-ellipsis">
          <span>
            <MdEmail />
          </span>
          {user?.email}
        </p>
        <Link
          href="/updateProfile"
          onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
          className="text-base w-full inline-flex py-1 items-center cursor-pointer border-b border-b-transparent hover:border-b-slate-700 duration-500 gap-3 overflow-hidden text-ellipsis"
        >
          <MdManageAccounts />
          Manage your account
        </Link>

        <Link
          href="/submitFeedBack"
          onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
          className="text-base w-full inline-flex py-1 items-center cursor-pointer border-b border-b-transparent hover:border-b-slate-700 duration-500 gap-3 overflow-hidden text-ellipsis"
        >
          <MdFeedback />
          Share Feedback
        </Link>
        <p
          onClick={logout}
          className="flex items-center gap-4 text-lg text-center p-2 px-4 cursor-pointer rounded-3xl border border-[#cfcfcf] dark:hover:bg-slate-700 duration-500 hover:bg-slate-200"
        >
          <MdLogout />
          Logout
        </p>
      </div>
    </div>
  );
};

export default CompanyUserSidebar;
