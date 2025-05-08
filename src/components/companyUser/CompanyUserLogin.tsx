/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import {
  setDarkMode,
  setLoggedIn,
  setUser,
} from "@/store/features/CRM/CRMSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type loginFormDataType = {
  identifier: string;
  password: string;
};

const CompanyUserLogin = () => {
  const [formData, setFormData] = useState<loginFormDataType>({
    identifier: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.identifier.trim() === "") {
      toast.error("Username or email is required");
      return;
    } else if (formData.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    try {
      setDataProcessing(true);
      const res = await axios.post("/api/companyUser/login", formData);
      if (res.data.status === 200 && res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.data));
        dispatch(setLoggedIn(true));
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setDataProcessing(false);
      setFormData({
        identifier: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    function setClassByOSMode() {
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

    setClassByOSMode();
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-[95%] sm:w-[380px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Login Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                minLength={2}
                maxLength={50}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPass ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={dataProcessing}>
              {dataProcessing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">
            {`Don't`} have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            <Link
              href="/forgetPasswordSendMail"
              className="text-primary font-medium hover:underline"
            >
              Forgot your password?
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyUserLogin;
