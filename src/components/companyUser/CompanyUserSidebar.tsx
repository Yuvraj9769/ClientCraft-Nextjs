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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

  const navLinks = [
    { path: "/company-dashboard", label: "Dashboard" },
    { path: "/company-projects", label: "Projects" },
    { path: "/company-clients", label: "Clients" },
    { path: "/add-note", label: "Add Note" },
    { path: "/addTaskToCalender", label: "Add Task" },
    { path: "/upload-document", label: "Upload Document" },
  ];

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
    <div className="md:hidden">
      {/* Overlay */}
      {sidebarVisible && (
        <div
          className="fixed bg-red-600 z-40"
          onClick={() => {
            setSidebarVisible(false);
          }}
        />
      )}

      <Sheet
        open={sidebarVisible}
        onOpenChange={(open) => dispatch(setSidebarVisible(open))}
      >
        <SheetContent
          side="left"
          className="w-3/4 p-0 bg-slate-50 dark:bg-gray-800 text-black dark:text-slate-50 border-r border-slate-200 dark:border-gray-700"
        >
          <div className="flex flex-col h-full">
            {/* Profile Section */}

            <SheetHeader>
              <div className="flex flex-col items-center p-6 border-b border-slate-200 dark:border-gray-700">
                <SheetTitle>
                  <div className="relative w-24 h-24 mb-4">
                    {loader ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <TbLoader3 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    ) : user?.profilePic ? (
                      <CldImage
                        src={user.profilePic}
                        width={96}
                        height={96}
                        alt="Profile"
                        className="rounded-full object-cover w-full h-full border-2 border-primary"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary">
                        {user?.email?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <button
                      onClick={changeProfilePic}
                      className="absolute bottom-0 right-0 bg-primary text-rose-600 p-2 rounded-full hover:bg-primary/80 transition-colors"
                    >
                      <IoMdCamera className="w-4 h-4" />
                    </button>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      ref={profilePicChange}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </SheetTitle>

                <SheetDescription>
                  <span className="text-lg font-semibold">
                    {user?.username}
                  </span>
                </SheetDescription>
              </div>
            </SheetHeader>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        pathname === link.path
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-slate-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      <IoReturnDownForward
                        className={`mr-3 w-5 h-5 ${
                          pathname === link.path ? "text-primary" : ""
                        }`}
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Additional Links */}
              <div className="mt-6 space-y-2 border-t border-slate-200 dark:border-gray-700 pt-4 px-1">
                {/* Email */}
                <div className="flex items-center px-4 py-3 text-sm">
                  <MdEmail className="mr-3 w-5 h-5 text-muted-foreground" />
                  <span className="truncate">{user?.email}</span>
                </div>

                {/* Manage Account */}
                <Link
                  href="/updateProfile"
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <MdManageAccounts className="mr-3 w-5 h-5" />
                  <span>Manage Account</span>
                </Link>

                {/* Feedback */}
                <Link
                  href="/submitFeedBack"
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <MdFeedback className="mr-3 w-5 h-5" />
                  <span>Feedback</span>
                </Link>
              </div>
            </nav>

            <SheetFooter>
              <div className="p-4 border-t border-slate-200 dark:border-gray-700">
                <SheetClose asChild>
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-600 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <MdLogout className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </SheetClose>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CompanyUserSidebar;
