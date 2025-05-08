/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BgGradient from "@/components/common/BgGradient";
import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setUser } from "@/store/features/CRM/CRMSlice";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const features = [
  {
    title: "Manage Clients",
    desc: "Easily manage and organize all your client data in one centralized platform, allowing you to track important client details and interactions.",
    icon: <Sparkles className="h-5 w-5  animate-pulse text-orange-600" />,
  },
  {
    title: "Track Projects",
    desc: "Stay on top of all your projects by tracking deadlines, tasks, and progress in real time. Keep your team aligned and informed.",
    icon: <Sparkles className="h-5 w-5  animate-pulse text-orange-600" />,
  },
  {
    title: "Add Note",
    desc: "Keep important information at your fingertips. Add, edit, and organize your personal or team notes efficiently to stay on top of your tasks and goals.",
    icon: <Sparkles className="h-5 w-5  animate-pulse text-orange-600" />,
  },
  {
    title: "Dashboard Overview",
    desc: "Get a comprehensive overview of your clients, projects, notes, and documents all in one dashboard with real-time statistics and insights.",
    icon: <Sparkles className="h-5 w-5  animate-pulse text-orange-600" />,
  },
  {
    title: "Upload Documents",
    desc: "Securely upload, manage, and access important files or documents related to your clients and projects directly within the platform.",
    icon: <Sparkles className="h-5 w-5  animate-pulse text-orange-600" />,
  },
  {
    title: "Add Calendar Events",
    desc: "Easily schedule and manage important events, meetings, or deadlines by adding them to your interactive calendar.",
    icon: <Sparkles className="h-5 w-5  animate-pulse text-orange-600" />,
  },
];

export default function Home() {
  // memorizes a function so that it doesn't get recreated on every render.
  const getUserData = useCallback(async () => {
    try {
      const res = axios.get("/api/companyUser/auth");
      return res;
    } catch (error: any) {
      throw new Error(error.message || "Sorry something went wrong");
    }
  }, []);

  const [loadingData, setLoadingData] = useState(true);

  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.username) {
      getUserData()
        .then((data) => dispatch(setUser(data.data.data)))
        .catch((error) => toast.error(error.message))
        .finally(() => setLoadingData(false));
    } else {
      setLoadingData(false);
    }
  }, []);

  return (
    <>
      {loadingData ? (
        <PageLoader />
      ) : (
        user.role === "companyUser" && (
          <CompanyUserLayout>
            <div className="flex min-h-screen flex-col bg-background">
              {/* Hero Section */}
              <section className="relative overflow-hidden border-b bg-background py-20 md:py-32">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl space-y-6">
                    <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
                      <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-600"></span>
                      Welcome back to your workspace
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                      Hello,{" "}
                      <span className="text-primary">
                        {user?.firstName || "User"}
                      </span>
                      !
                    </h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
                      Manage your clients and projects seamlessly with our
                      intuitive platform.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Button asChild size="lg" className="group">
                        <Link href="/company-dashboard">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              <BgGradient className="bg-gradient-to-tr from-orange-600 via-orange-400 to-orange-200" />

              {/* Features Section */}
              <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      Features
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                      Everything you need to manage your business efficiently
                    </p>
                  </div>
                  <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                      <Card
                        key={index}
                        className="group overflow-hidden transition-all duration-500 hover:shadow-lg dark:hover:shadow-primary/5 hover:scale-105"
                      >
                        <CardHeader className="flex flex-row items-center gap-2 pb-2 space-y-0">
                          {feature.icon}
                          <CardTitle className="text-xl">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {feature.desc}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="border-t bg-muted/40 py-20 md:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      Explore Your Dashboard
                    </h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">
                      Manage your clients and projects, and track your{" "}
                      {`team's`}
                      progress all in one place.
                    </p>
                    <div className="mt-10">
                      <Button asChild size="lg" className="group">
                        <Link href="/company-dashboard">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </CompanyUserLayout>
        )
      )}
    </>
  );
}
