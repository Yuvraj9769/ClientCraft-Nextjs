/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTodos, todosInterface } from "@/store/features/CRM/CRMSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaClock } from "react-icons/fa6";
import { ImSpinner6 } from "react-icons/im";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SearchIcon } from "lucide-react";

const AddNote = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos);

  const [dataProcessing, setDataProcessing] = useState(false);
  const [getTodoLoader, setGetTodoLoader] = useState(false);
  const [popupBox, setPopupBox] = useState(false);
  const [delNote, setDelNote] = useState("");
  const [applyFilter, setApplyFilter] = useState({
    latest: false,
    oldest: true,
  });

  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    searchQuery: "",
  });

  const [todoFormData, setTodoFormData] = useState({
    title: "",
    description: "",
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    setTodoFormData((preData) => ({ ...preData, [name]: value }));
  };

  const handleOnChangeForSearch = (e: any) => {
    const { value } = e.target;

    if (value.trim() === "" && todos.length !== 0) {
      fetchNotes();
      setApplyFilter({
        latest: false,
        oldest: true,
      });
    }

    setSearchData({
      searchQuery: value,
    });
  };

  const checkKey = async (e: any) => {
    if (e.key === "Enter" && searchData.searchQuery.trim() !== "") {
      try {
        setGetTodoLoader(true);

        const res = await axios.post("api/companyUser/searchTodo", searchData);

        if (applyFilter.latest) {
          const sortedData = res.data.data.sort(
            (a: todosInterface, b: todosInterface) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          dispatch(setTodos(sortedData));
        } else {
          dispatch(setTodos(res.data.data));
        }
      } catch (error: any) {
        toast.error(
          error.response.data.message || "Sorry something went wrong"
        );
      } finally {
        setGetTodoLoader(false);
      }
    }
  };

  const addTodo = async (e: any) => {
    try {
      e.preventDefault();

      setDataProcessing(true);

      if (todoFormData.title.trim() === "") {
        toast.error("Please enter a title");
        return;
      }
      if (todoFormData.description.trim() === "") {
        toast.error("Please enter a description");
        return;
      }

      const response = await axios.post(
        "/api/companyUser/addTodo",
        todoFormData
      );
      toast.success(response.data.message);
      dispatch(setTodos(response.data.data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setTodoFormData({
        title: "",
        description: "",
      });
      setDataProcessing(false);
    }
  };

  const deleteNote = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/companyUser/deleteNote/${delNote}`
      );
      dispatch(setTodos(response.data.data));
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setLoading(false);
      if (searchData.searchQuery.trim() !== "") {
        setSearchData({
          searchQuery: "",
        });
      }
    }
  };

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get("api/companyUser/getNotes");
      dispatch(setTodos(res.data.data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const latestToOldestTodos = () => {
    if (applyFilter.latest) return;

    const sortedTodos = [...todos].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    dispatch(setTodos(sortedTodos));
  };

  const OldestToLatestTodos = () => {
    if (applyFilter.oldest) return;

    const sortedTodos = [...todos].sort((a, b) => {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });

    dispatch(setTodos(sortedTodos));
  };

  useEffect(() => {
    fetchNotes();

    if (todos.length !== 0 && loading) {
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
      <div className="bg-background">
        {/* Hero Section */}

        <section className="border-b bg-background text-primary-foreground px-6 text-center shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
          <div className="container relative z-10 px-4 py-16 md:py-24 mx-auto flex flex-col items-center gap-4 md:gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-black dark:text-white">
                Manage Your Notes
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Keep track of your ideas, reminders, and important information
                all in one place.
              </p>
            </div>
            <Button variant="default" size="lg">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </section>

        {/* Add New  Note Section */}

        <div className="container max-w-2xl mx-auto py-10 px-4">
          <Card className="border shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                New Note Data
              </CardTitle>
              <CardDescription>Enter your note details below.</CardDescription>
            </CardHeader>
            <form onSubmit={addTodo}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Note Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleOnChange}
                    value={todoFormData.title}
                    placeholder="Enter note title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Note Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    onChange={handleOnChange}
                    value={todoFormData.description}
                    placeholder="Enter note description"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={dataProcessing}
                >
                  {dataProcessing ? (
                    <span className="inline-flex items-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
                      Adding Note
                    </span>
                  ) : (
                    "Add Note"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <section className="border-b bg-background text-primary-foreground px-6 text-center shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
          <div className="container relative z-10 px-4 py-16 md:py-24 mx-auto flex flex-col items-center gap-4 md:gap-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-black dark:text-white">
              View Your Notes
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Access your notes effortlessly, view your saved thoughts and
              reminders all in one place.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                  <Input
                    type="text"
                    placeholder="Search notes..."
                    value={searchData.searchQuery}
                    onChange={handleOnChangeForSearch}
                    onKeyDown={checkKey}
                    className="w-full pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <SearchIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="latest"
                    checked={applyFilter.latest}
                    onCheckedChange={() => {
                      setApplyFilter({ latest: true, oldest: false });
                      latestToOldestTodos();
                    }}
                  />
                  <label
                    htmlFor="latest"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Latest
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="oldest"
                    checked={applyFilter.oldest}
                    onCheckedChange={() => {
                      setApplyFilter({ latest: false, oldest: true });
                      OldestToLatestTodos();
                    }}
                  />
                  <label
                    htmlFor="oldest"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Oldest
                  </label>
                </div>
              </div>
            </div>
          </div>

          {getTodoLoader ? (
            <div className="flex justify-center items-center h-40">
              <ImSpinner6 className="animate-spin text-primary text-2xl sm:text-4xl md:text-5xl lg:text-6xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todos.length > 0 ? (
                todos.map((todo, ind) => (
                  <Card
                    key={ind}
                    className="transition-all hover:shadow-md shadow-lg shadow-black/10 dark:shadow-white/10 overflow-hidden border border-border hover:border-border/80 duration-300 flex flex-col justify-between"
                  >
                    <CardContent className="p-0">
                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                          {todo.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {todo.description}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mb-4">
                          <FaClock className="mr-1 animate-pulse text-blue-500" />
                          <span>
                            {new Date(todo.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex w-full gap-4 pt-2 items-center">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-2xl h-12 text-primary hover:bg-destructive/10"
                        onClick={() => {
                          setPopupBox(true);
                          setDelNote(todo._id);
                        }}
                      >
                        <FiTrash2 className="mr-2" />
                        Delete
                      </Button>
                      <div className="w-px bg-border"></div>
                      <Link href={`/updateNote/${todo._id}`}>
                        <Button
                          variant="outline"
                          className="flex-1 rounded-2xl h-12 text-primary"
                        >
                          <FiEdit className="mr-2" />
                          Edit
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-40">
                  <p className="text-muted-foreground">No notes found.</p>
                </div>
              )}
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={popupBox} onOpenChange={setPopupBox}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this note?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your note.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setPopupBox(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteNote();
                    setPopupBox(false);
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default AddNote;
