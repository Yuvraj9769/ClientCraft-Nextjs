/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { IoMdAdd, IoMdCreate, IoMdTrash } from "react-icons/io";
import CompanyUserLayout from "./CompanyUserLayout";
import { useCallback, useEffect, useState } from "react";
import { setClientsData } from "@/store/features/CRM/CRMSlice";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import PageLoader from "@/components/PageLoader";
import { ImSpinner6 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CompanyUserClients = () => {
  const [loading, setLoading] = useState(true);
  const [clientLoader, setClientLoader] = useState(false);

  const dispatch = useAppDispatch();

  const clientsData = useAppSelector((state) => state.clientsData);

  const [searchData, setSearchData] = useState({
    searchQuery: "",
  });

  const handleOnChange = (e: any) => {
    const { value } = e.target;

    if (value.trim() === "" && clientsData.length !== 0) {
      getAllClients();
    }

    setSearchData((preData) => ({ ...preData, searchQuery: value }));
  };

  const checkKey = async (e: any) => {
    if (e.key === "Enter" && searchData.searchQuery.trim() !== "") {
      try {
        setClientLoader(true);
        const res = await axios.post(
          "/api/companyUser/search-client",
          searchData
        );
        dispatch(setClientsData(res.data.data));
      } catch (error: any) {
        setSearchData({
          searchQuery: "",
        });
        toast.error(
          error.response.data.message || "Sorry something went wrong"
        );
      } finally {
        setClientLoader(false);
      }
    }
  };

  const deleteClientUser = useCallback(async (delClientID: any) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/companyUser/delete-companyClient/${delClientID}`
      );
      dispatch(setClientsData(response.data.data));
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      if (searchData.searchQuery.trim() !== "") {
        setSearchData({
          searchQuery: "",
        });
      }

      setLoading(false);
    }
  }, []);

  const getAllClients = useCallback(async () => {
    try {
      const res = await axios.get("/api/companyUser/get-clients");
      dispatch(setClientsData(res.data.data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllClients();

    if (clientsData.length !== 0) {
      setLoading(false);
    }

    return () => {
      // Cleanup
      setSearchData({
        searchQuery: "",
      });
    };
  }, []);

  return (
    <CompanyUserLayout>
      {/* {New Layout} */}

      {loading ? (
        <PageLoader />
      ) : (
        <div className="min-h-screen bg-background">
          {/* Header Section */}

          <header className="border-b bg-background text-primary-foreground px-6 text-center shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
            <div className="container relative z-10 px-4 py-16 md:py-24 mx-auto flex flex-col items-center gap-4 md:gap-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-black dark:text-white">
                  Manage Clients
                </h1>
                <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                  View, search, and manage all your client relationships in one
                  place.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Button variant="default" size="lg">
                  <Link href="/">Go to Home</Link>
                </Button>
                <Link href="/add-new-client">
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="dark:text-white text-black"
                  >
                    <IoMdAdd className="text-lg animate-pulse" /> Add New Client
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Search and Action Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <Input
                  type="text"
                  placeholder="Search clients by name, email, or company..."
                  value={searchData.searchQuery}
                  onChange={handleOnChange}
                  onKeyDown={checkKey}
                  className="border-border"
                />
              </div>
              <Link href="/add-new-client">
                <Button className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <IoMdAdd className="text-lg animate-pulse" /> Add New Client
                </Button>
              </Link>
            </div>

            {clientLoader ? (
              <div className="w-full inline-flex items-center justify-center">
                <ImSpinner6 className="text-3xl md:text-6xl animate-spin" />
              </div>
            ) : clientsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientsData.map((client, ind) => (
                  <Card
                    key={ind}
                    className="shadow-lg shadow-black/10 dark:shadow-white/10 overflow-hidden border border-border hover:border-border/80 transition"
                  >
                    <CardHeader className="bg-muted/40 pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold truncate">
                          {client.name}
                        </CardTitle>
                        <Badge
                          variant={client.status ? "default" : "outline"}
                          className={`${
                            client.status
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {client.status ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
                      <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                          <span className="font-semibold text-foreground whitespace-nowrap">
                            Email:
                          </span>
                          <span className="truncate">{client.email}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                          <span className="font-semibold text-foreground whitespace-nowrap">
                            Joined Date:
                          </span>
                          <span className="truncate">
                            {new Date(client.dateJoined).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex gap-2 items-center">
                          <span className="font-semibold text-foreground whitespace-nowrap">
                            Country:
                          </span>
                          <span className="truncate">{client.country}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                          <span className="font-semibold text-foreground whitespace-nowrap">
                            Phone Number:
                          </span>
                          <span className="truncate">{client.phone}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between pt-2 border-t">
                      <Link href={`/update-clientUser/${client._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <IoMdCreate /> Update
                        </Button>
                      </Link>
                      <Link href={`/create-new-project/${client._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 border-none dark:hover:text-black hover:text-white"
                        >
                          <IoMdAdd /> Add Project
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 border-none hover:text-white"
                          >
                            <IoMdTrash /> Delete
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Client</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              <b>{client.name}</b> from{" "}
                              <b>{client.companyName}</b>? This action cannot be
                              undone and will remove all associated projects.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteClientUser(client._id)}
                              className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold mb-2">
                  No clients found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or add a new client
                </p>
                <Link href="/add-new-client">
                  <Button className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <IoMdAdd className="text-lg" /> Add New Client
                  </Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      )}
    </CompanyUserLayout>
  );
};

export default CompanyUserClients;
