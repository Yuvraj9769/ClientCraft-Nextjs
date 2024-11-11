"use client";

import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProfile } from "@/store/features/CRM/CRMSlice";
import Link from "next/link";
// import Image from "next/image";
import { IoMdCamera } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {
  MdEmail,
  MdFeedback,
  MdLogout,
  MdManageAccounts,
} from "react-icons/md";

const Profile = ({ logout }: { logout: () => void }) => {
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();
  const profilePicChange = useRef<HTMLInputElement>(null);

  const [loader, setLoader] = useState(false);

  const changeProfilePic = () => {
    profilePicChange.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoader(true);
    try {
      const profilePic = event.target.files?.[0];
      console.log(profilePic);
      console.log(loader);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <div
      className="bg-slate-50 dark:bg-gray-800 font-semibold text-black dark:text-slate-50 p-6 h-auto absolute left-[-190px] rounded-xl border border-[#dadada] top-[59px] right-0 flex flex-col items-center gap-4 max-w-[255px] w-[250px] z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-semibold text-3xl h-[80px] w-[80px] rounded-full inline-flex items-center justify-center relative mb-2">
        <div className="w-full rounded-full h-[75px] overflow-hidden inline-flex items-center justify-center">
          {/* <Image
            src="/images/userLogo.avif"
            width={100}
            height={100}
            alt="User Profile"
            className="w-full h-full cursor-pointer object-cover"
          /> */}
          <p className="dark:bg-gray-700 bg-transparent border border-gray-300 dark:border-none w-full h-full inline-flex items-center justify-center rounded-full dark:text-slate-50 text-black font-semibold">
            {user.email.slice(0, 1).toUpperCase()}
          </p>
        </div>
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
        href="/feedback"
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
  );
};

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Profile;
