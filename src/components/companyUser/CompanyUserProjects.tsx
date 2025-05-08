/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { FiEdit } from "react-icons/fi";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProjects } from "@/store/features/CRM/CRMSlice";
import PageLoader from "@/components/PageLoader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HeroSection from "@/components/companyUser/companyUserProject/HeroSection";
import CTA from "@/components/companyUser/companyUserProject/CTA";
import { Plus, Search, Send, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

const CompanyUserProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projectLoader, setProjectLoader] = useState(false);

  const description = useRef<HTMLTextAreaElement>(null);
  const deadline = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.projects);

  const [searchData, setSearchData] = useState({
    searchQuery: "",
  });

  const handleOnChange = (e: any) => {
    const { value } = e.target;

    if (value.trim() === "" && projects.length !== 0) {
      getAllProjects();
    }

    setSearchData((preData) => ({ ...preData, searchQuery: value }));
  };

  const checkKey = async (e: any) => {
    if (e.key === "Enter" && searchData.searchQuery.trim() !== "") {
      try {
        setProjectLoader(true);
        const res = await axios.post(
          "/api/companyUser/search-project",
          searchData
        );
        dispatch(setProjects(res.data.data));
      } catch (error: any) {
        setSearchData({
          searchQuery: "",
        });
        toast.error(
          error.response.data.message || "Sorry something went wrong"
        );
      } finally {
        setProjectLoader(false);
      }
    }
  };

  const getAllProjects = useCallback(async () => {
    try {
      const res = await axios.get("/api/companyUser/get-projects");
      dispatch(setProjects(res.data.data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const deleteProject = useCallback(async (delProjectId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/companyUser/delete-project/${delProjectId}`
      );
      dispatch(setProjects(response.data.data));
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

  const sendMailToClient = useCallback((clientData: any) => {
    startTransition(() => {
      (async () => {
        try {
          if (!clientData) {
            toast.error("Client data is required");
            return;
          }

          if (!clientData.description) {
            toast.error("Description is required");
            return;
          }

          if (!clientData.deadline) {
            toast.error("Deadline is required");
            return;
          }

          const response = await fetch(
            "/api/companyUser/send_Proj_Det_TO_User",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(clientData),
            }
          );

          const data = await response.json();

          toast.success(data.message);
        } catch (error: any) {
          toast.error(
            error.response.data.message || "Sorry something went wrong"
          );
        }
      })();
    });
  }, []);

  useEffect(() => {
    getAllProjects();

    if (projects.length !== 0) {
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
      <div className="bg-background min-h-screen">
        <HeroSection />

        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col items-center gap-4 mb-8 md:mb-12 md:flex-row justify-between w-full">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by client or project name..."
                className="pl-10"
                value={searchData.searchQuery}
                onChange={handleOnChange}
                onKeyDown={checkKey}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Search Client</DialogTitle>
                  <DialogDescription>
                    Search for a client to create a new project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Client Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {projectLoader || loading ? (
            <div className="relative left-0 top-0 w-full py-4 my-3">
              <PageLoader />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj, ind) => (
                <Card
                  key={proj._id}
                  className="transition-all hover:shadow-md shadow-lg shadow-black/10 dark:shadow-white/10 overflow-hidden border border-border hover:border-border/80 duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">
                          {proj.projectName}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {proj.clientName}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          proj.status === "Active"
                            ? "bg-green-500/15 text-green-600 hover:bg-green-500/20"
                            : proj.status === "Completed"
                            ? "bg-blue-500/15 text-blue-600 hover:bg-blue-500/20"
                            : proj.status === "Pending"
                            ? "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/20"
                            : "bg-gray-500/15 text-gray-600 hover:bg-gray-500/20"
                        )}
                        variant="outline"
                      >
                        {proj.status}
                      </Badge>
                    </div>
                    <p className="mt-4 font-medium">Budget: {proj.budget}</p>
                  </CardContent>

                  <CardFooter className="flex justify-end gap-2 p-4 pt-1 border-t border-border/50">
                    <Button variant="ghost" size="icon" title="Edit Project">
                      <Link href={`/update-project/${proj._id}`}>
                        <FiEdit />
                      </Link>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Send Project Details"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Send Project Details</DialogTitle>
                          <DialogDescription>
                            Send project details to the client.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="project-description">
                              Description
                            </Label>
                            <Textarea
                              id="project-description"
                              placeholder="Enter project description..."
                              className="min-h-[100px]"
                              ref={description}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="project-deadline">Deadline</Label>
                            <Input
                              id="project-deadline"
                              type="date"
                              ref={deadline}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            onClick={() =>
                              sendMailToClient({
                                ...projects[ind],
                                description: description?.current?.value || "",
                                deadline: deadline?.current?.value || "",
                              })
                            }
                          >
                            {isPending ? "Sending..." : "Send Email"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/30"
                          title="Delete Project"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the <b>{proj.projectName}</b> project and
                            remove the data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                              deleteProject(proj._id);
                            }}
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
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">No Projects Found</h3>
              <p className="mt-2 text-muted-foreground">
                {projects.length === 0
                  ? "No projects match your search criteria. Try a different search term."
                  : "You haven't created any projects yet. Create your first project to get started."}
              </p>
              <Button className="mt-6">
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            </div>
          )}
        </section>

        <CTA />
      </div>
    </CompanyUserLayout>
  );
};

export default CompanyUserProjects;
