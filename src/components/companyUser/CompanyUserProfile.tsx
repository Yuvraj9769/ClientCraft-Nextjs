/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setClientsData,
  setLoggedIn,
  setProfile,
  setProjects,
  setTodos,
  setUser,
} from "@/store/features/CRM/CRMSlice";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Camera,
  FileText,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <Card
          className="absolute left-[-190px] top-[58px] w-[250px] max-w-[255px] z-30 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent className="p-5 flex flex-col items-center gap-4">
            {/* Profile Picture Section */}
            <div className="relative mt-2 mb-1">
              <div className="relative">
                {profilePicLoader ? (
                  <div className="h-20 w-20 rounded-full flex items-center justify-center bg-muted">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <Avatar className="h-20 w-20 border-2 border-border">
                    {user?.profilePic ? (
                      <AvatarImage
                        src={user.profilePic}
                        alt="User Profile"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="text-xl">
                        {user?.email?.slice(0, 1)?.toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}

                <input
                  type="file"
                  id="file"
                  ref={profilePicChange}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-7 w-7 rounded-full shadow-md"
                  onClick={changeProfilePic}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="absolute -top-4 -right-16 h-7 w-7"
                onClick={() => dispatch(setProfile(!profile))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="text-center w-full">
              <p className="font-medium text-lg">{user?.username}</p>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5 mt-1">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{user?.email}</span>
              </p>
            </div>

            <Separator className="my-1" />

            {/* Navigation Links */}
            <div className="w-full space-y-1">
              <Link
                href="/updateProfile"
                onClick={() => dispatch(setProfile(!profile))}
                className="flex items-center gap-2.5 py-2 px-1 rounded-md text-sm hover:bg-accent transition-colors"
              >
                <Settings className="h-4 w-4" />
                Manage your account
              </Link>

              <Link
                href="/addTaskToCalender"
                onClick={() => dispatch(setProfile(!profile))}
                className="flex items-center gap-2.5 py-2 px-1 rounded-md text-sm hover:bg-accent transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Add Event
              </Link>

              <Link
                href="/upload-document"
                onClick={() => dispatch(setProfile(!profile))}
                className="flex items-center gap-2.5 py-2 px-1 rounded-md text-sm hover:bg-accent transition-colors"
              >
                <FileText className="h-4 w-4" />
                Documents
              </Link>

              <Link
                href="/submitFeedBack"
                onClick={() => dispatch(setProfile(!profile))}
                className="flex items-center gap-2.5 py-2 px-1 rounded-md text-sm hover:bg-accent transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Share Feedback
              </Link>
            </div>

            <Separator className="my-1" />

            {/* Logout Button */}
            <Button
              variant="outline"
              className="w-full gap-2 mt-1"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CompanyUserProfile;
