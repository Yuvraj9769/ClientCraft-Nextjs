/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { IoMdAdd } from "react-icons/io";
import CountUp from "react-countup";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import ProjectStatusChart from "@/components/ProjectStatusChart";

const CompanyUserDashbaord = () => {
  const [overData, setOverViewData] = useState([
    { clientsCount: 0 },
    { documentsCount: 0 },
    { totalCompanyUsers: 0 },
    [
      { _id: "Pending", count: 0 },
      { _id: "Active", count: 0 },
      { _id: "Completed", count: 0 },
    ],
  ]);

  const getOverData = useCallback(async () => {
    try {
      const response = await axios.get("/api/companyUser/overview");
      setOverViewData(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    }
  }, []);

  useEffect(() => {
    getOverData();
  }, []);

  return (
    <CompanyUserLayout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}

        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
          <div className="relative z-10 flex flex-col items-center gap-3 container px-4 py-16 md:py-24 mx-auto">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-black dark:text-white">
              Dashboard
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Your centralized hub for client and project management.
            </p>
            <Button variant="default" size="lg">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Metrics Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-primary">
                  <CountUp
                    start={0}
                    end={Array.isArray(overData[3]) ? overData[3][1]?.count : 0}
                    duration={3}
                    separator=","
                  />
                </CardContent>
              </Card>

              <Card className="shadow-lg shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                  <CardTitle>Completed Projects</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-green-600 dark:text-green-400">
                  <CountUp
                    start={0}
                    end={Array.isArray(overData[3]) ? overData[3][2]?.count : 0}
                    duration={3}
                    separator=","
                  />
                </CardContent>
              </Card>

              <Card className="shadow-lg shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                  <CardTitle>Inactive Projects</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-muted-foreground">
                  <CountUp
                    start={0}
                    end={Array.isArray(overData[3]) ? overData[3][0]?.count : 0}
                    duration={3}
                    separator=","
                  />
                </CardContent>
              </Card>

              <Card className="shadow-lg shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                  <CardTitle>Total Clients</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-primary">
                  <CountUp
                    start={0}
                    end={
                      typeof overData[0] === "object" &&
                      "clientsCount" in overData[0]
                        ? (overData[0]?.clientsCount as number)
                        : 0
                    }
                    duration={3}
                    separator=","
                  />
                </CardContent>
              </Card>

              <Card className="shadow-lg shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                  <CardTitle>Your Documents</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-green-600 dark:text-green-400">
                  <CountUp
                    start={0}
                    end={
                      typeof overData[1] === "object" &&
                      "documentsCount" in overData[1]
                        ? (overData[1]?.documentsCount as number)
                        : 0
                    }
                    duration={3}
                    separator=","
                  />
                </CardContent>
              </Card>

              <Card className="shadow-lg shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                  <CardTitle>Organization Users</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-primary">
                  <CountUp
                    start={0}
                    end={
                      typeof overData[2] === "object" &&
                      "totalCompanyUsers" in overData[2]
                        ? (overData[2]?.totalCompanyUsers as number)
                        : 0
                    }
                    duration={3}
                    separator=","
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          <ProjectStatusChart
            overData={overData[3] as { _id: string; count: number }[]}
          />

          {/* Project Section */}
          <section className="space-y-6 mb-16 ">
            <h2 className="text-3xl font-semibold">Projects</h2>
            <Card className="bg-card border border-border text-card-foreground text-center p-10 rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />

              <div className="container relative z-10 px-4 py-12 mx-auto">
                <CardTitle className="text-4xl font-extrabold mb-2">
                  Manage Your Projects
                </CardTitle>
                <p className="text-lg text-muted-foreground mb-8 md:mb-6">
                  Stay organized and track all your projects efficiently.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/"
                    className="bg-muted text-foreground py-2 px-6 rounded-full hover:bg-muted/70 transition"
                  >
                    Go to Home
                  </Link>
                  <Link
                    onClick={() =>
                      toast.error(
                        "Client must exist. Add a project from the client."
                      )
                    }
                    href="/company-clients"
                    className="bg-primary text-primary-foreground py-2 px-6 rounded-full inline-flex items-center gap-2 hover:bg-primary/90 transition"
                  >
                    <IoMdAdd className="animate-pulse" /> Create New Project
                  </Link>
                </div>
              </div>
            </Card>
          </section>

          {/* Clients Section */}
          <section className="space-y-6 mb-16 ">
            <h2 className="text-3xl font-semibold">Clients</h2>
            <Card className="bg-card border border-border text-card-foreground text-center p-10 rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
              <div className="container relative z-10 px-4 py-12 mx-auto">
                <CardTitle className="text-4xl font-extrabold mb-2">
                  Manage Clients
                </CardTitle>
                <p className="text-lg text-muted-foreground mb-8 md:mb-6">
                  Track client details, projects, and status updates.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/"
                    className="bg-muted text-foreground py-2 px-6 rounded-full hover:bg-muted/70 transition"
                  >
                    Go to Home
                  </Link>
                  <Link
                    href="/add-new-client"
                    className="bg-primary text-primary-foreground py-2 px-6 rounded-full inline-flex items-center gap-2 hover:bg-primary/90 transition"
                  >
                    <IoMdAdd className="animate-pulse" /> Add New Client
                  </Link>
                </div>
              </div>
            </Card>
          </section>

          {/* Notes Section */}
          <section className="space-y-6 mb-16 ">
            <h2 className="text-3xl font-semibold">Notes</h2>
            <Card className="bg-card border border-border text-card-foreground text-center p-10 rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />

              <div className="container relative z-10 px-4 py-12 mx-auto">
                <CardTitle className="text-4xl font-extrabold mb-2">
                  Get Started on Your Notes
                </CardTitle>
                <p className="text-lg text-muted-foreground mb-8 md:mb-6">
                  Create, edit, and organize your notes effortlessly to stay on
                  top of everything.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/"
                    className="bg-muted text-foreground py-2 px-6 rounded-full hover:bg-muted/70 transition"
                  >
                    Go to Home
                  </Link>
                  <Link
                    href="/add-note"
                    className="bg-primary text-primary-foreground py-2 px-6 rounded-full inline-flex items-center gap-2 hover:bg-primary/90 transition"
                  >
                    <IoMdAdd className="animate-pulse" /> Add New Note
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </CompanyUserLayout>
  );
};

export default CompanyUserDashbaord;
