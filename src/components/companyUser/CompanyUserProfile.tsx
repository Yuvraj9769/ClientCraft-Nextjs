/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CldImage } from "next-cloudinary";
import {
  setClientsData,
  setLoggedIn,
  setProfile,
  setProjects,
  setTodos,
  setUser,
} from "@/store/features/CRM/CRMSlice";
import Link from "next/link";
import { IoMdCamera } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {
  MdEmail,
  MdFeedback,
  MdLogout,
  MdManageAccounts,
} from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TbLoader3 } from "react-icons/tb";
import PageLoader from "@/components/PageLoader";
import { GoFileSubmodule } from "react-icons/go";

const CompanyUserProfile = () => {
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();
  const profilePicChange = useRef<HTMLInputElement>(null);

  const [loader, setLoader] = useState(false);
  const [profilePicLoader, setProfilePicLoader] = useState(false);

  const router = useRouter();

  const changeProfilePic = () => {
    profilePicChange.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setProfilePicLoader(true);
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
      setProfilePicLoader(false);
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

  return (
    <>
      {loader ? (
        <div className="w-screen min-h-screen inline-flex items-center justify-center absolute right-[-19px] top-0">
          <PageLoader />
        </div>
      ) : (
        <div
          className="bg-slate-50 dark:bg-gray-800 font-semibold text-black dark:text-slate-50 p-6 h-auto absolute left-[-190px] rounded-xl border border-[#dadada] top-[58px] right-0 flex flex-col items-center gap-4 max-w-[255px] w-[250px] z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-semibold text-3xl h-[80px] w-[80px] rounded-full inline-flex items-center justify-center relative mb-2">
            {profilePicLoader ? (
              <span className="text-5xl text-black dark:text-slate-50 py-4 mx-auto animate-spin">
                <TbLoader3 />
              </span>
            ) : (
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
                  <p className="dark:bg-gray-700 bg-transparent border border-gray-300 dark:border-none w-full h-full inline-flex items-center justify-center cursor-pointer rounded-full dark:text-slate-50 text-black font-semibold">
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
            <p
              onClick={() => dispatch(setProfile(!profile))}
              className="absolute top-[-15px] right-[-80px] text-xl p-[6px] rounded-full cursor-pointer"
            >
              <RxCross2 />
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-500 dark:text-gray-300">
              {user?.username}
            </p>
          </div>
          <p className="text-base w-full inline-flex py-1 items-center justify-start border-b border-b-transparent hover:border-b-slate-700 duration-500 gap-3 overflow-hidden text-ellipsis">
            <span>
              <MdEmail />
            </span>
            {user?.email}
          </p>
          <Link
            href="/updateProfile"
            onClick={() => dispatch(setProfile(!profile))}
            className="text-base w-full inline-flex py-1 items-center cursor-pointer border-b border-b-transparent hover:border-b-slate-700 duration-500 gap-3 overflow-hidden text-ellipsis"
          >
            <MdManageAccounts />
            Manage your account
          </Link>

          <Link
            href="/upload-document"
            onClick={() => dispatch(setProfile(!profile))}
            className="text-base w-full inline-flex py-1 items-center cursor-pointer border-b border-b-transparent hover:border-b-slate-700 duration-500 gap-3 overflow-hidden text-ellipsis"
          >
            <GoFileSubmodule />
            Documents
          </Link>

          <Link
            href="/submitFeedBack"
            onClick={() => dispatch(setProfile(!profile))}
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
      )}
    </>
  );
};

export default CompanyUserProfile;
