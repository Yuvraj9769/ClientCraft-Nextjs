/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import CompanyUserLayout from "./CompanyUserLayout";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTodos, todosInterface } from "@/store/features/CRM/CRMSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PageLoader from "@/components/PageLoader";
import { FaClock } from "react-icons/fa6";
import { ImSpinner6 } from "react-icons/im";
import styles from "@/css/Checkbox.module.css";

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
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2">
          <h1 className="text-4xl font-extrabold">Manage Your Notes</h1>
          <p className="text-lg">
            Keep track of your ideas, reminders, and important information all
            in one place.
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 my-2 dark:text-white dark:hover:bg-gray-700"
          >
            Go to Home
          </Link>
        </section>

        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
          <div className="max-w-xl mx-auto">
            <form
              onSubmit={addTodo}
              className="bg-white shadow-lg rounded-lg p-8 text-black"
            >
              <h2 className="text-2xl font-semibold mb-6">New Note Data</h2>

              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-lg font-semibold mb-2"
                >
                  Note Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleOnChange}
                  value={todoFormData.title}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-lg font-semibold mb-2"
                >
                  Note Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleOnChange}
                  value={todoFormData.description}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note description"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                {dataProcessing ? (
                  <span className="inline-flex items-center justify-center gap-3">
                    <AiOutlineLoading3Quarters className="animate-spin text-lg font-semibold text-slate-50" />{" "}
                    Adding Note
                  </span>
                ) : (
                  <>Add Note</>
                )}
              </button>
            </form>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2">
          <h1 className="text-4xl font-extrabold">View Your Notes</h1>
          <p className="text-lg">
            Access your notes effortlessly, view your saved thoughts and
            reminders all in one place.
          </p>
        </section>

        <section className="p-4 py-20 w-full inline-flex flex-col items-center gap-3">
          {loading ? (
            <div className="relative left-0 top-0 w-full py-4">
              <PageLoader />
            </div>
          ) : todos.length !== 0 ? (
            <>
              <div className="w-full flex items-center justify-center p-4 lg:py-6 gap-4 flex-wrap lg:flex-nowrap max-w-7xl">
                <div className="gap-3 w-full inline-flex mt-2 items-center justify-center text-black rounded-md pr-2">
                  <input
                    type="text"
                    placeholder="Search note by title"
                    value={searchData.searchQuery}
                    onChange={handleOnChangeForSearch}
                    onKeyDown={checkKey}
                    className="p-2 rounded-md border-none outline-none w-full lg:w-[65%] dark:bg-slate-800 duration-500  bg-slate-200 focus-within:ring-1 dark:focus-within:ring-blue-500 focus-within:ring-black group dark:text-slate-50 text-black"
                  />
                </div>

                <div
                  className={`inline-flex items-center flex-wrap md:flex-nowrap gap-3 p-2 ${
                    getTodoLoader && "cursor-not-allowed"
                  }`}
                >
                  <label
                    className={`inline-flex items-center gap-2 cursor-pointer ${
                      getTodoLoader && "pointer-events-none opacity-75"
                    }`}
                  >
                    <label className={styles.container}>
                      <input
                        type="checkbox"
                        checked={applyFilter.latest}
                        onChange={() => {
                          setApplyFilter({
                            latest: true,
                            oldest: false,
                          });
                          latestToOldestTodos();
                        }}
                      />
                      <svg viewBox="0 0 64 64" height="1.5em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className={styles.path}
                        />
                      </svg>
                    </label>{" "}
                    Latest
                  </label>
                  <label
                    className={`inline-flex items-center gap-2 cursor-pointer ${
                      getTodoLoader && "pointer-events-none opacity-75"
                    }`}
                  >
                    <label className={styles.container}>
                      <input
                        type="checkbox"
                        checked={applyFilter.oldest}
                        onChange={() => {
                          setApplyFilter({
                            latest: false,
                            oldest: true,
                          });
                          OldestToLatestTodos();
                        }}
                      />
                      <svg viewBox="0 0 64 64" height="1.5em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className={styles.path}
                        />
                      </svg>
                    </label>{" "}
                    Oldest
                  </label>
                </div>
              </div>

              {getTodoLoader ? (
                <ImSpinner6 className="text-3xl md:text-6xl animate-spin" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 md:p-6 rounded-md bg-gray-100 gap-4 dark:bg-gray-800 w-full max-w-7xl">
                  {todos.map((todo, ind) => (
                    <div
                      className="bg-slate-50 text-black p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2"
                      key={ind}
                    >
                      <h3 className="font-bold text-xl overflow-hidden text-ellipsis text-nowrap">
                        {todo.title}
                      </h3>
                      <p className="w-full break-words">{todo.description}</p>
                      <p className="inline-flex items-center gap-2">
                        {" "}
                        {new Date(todo.updatedAt).toLocaleDateString()}{" "}
                        <FaClock />
                      </p>
                      <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold inline-flex w-full items-center justify-start gap-3">
                        <Link
                          className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400"
                          href={`/updateNote/${todo._id}`}
                        >
                          <FiEdit />
                        </Link>
                        <button
                          className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400"
                          aria-label="Delete Note"
                          onClick={() => {
                            setPopupBox(true);
                            setDelNote(todo._id);
                          }}
                        >
                          <FiTrash2 />
                        </button>
                      </span>

                      {popupBox && todo._id === delNote && (
                        <div className="w-screen min-h-screen bg-black bg-opacity-85 fixed top-0 left-0 z-20 flex items-center justify-center">
                          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-30">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                              Are you sure?
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                              This action will permanently delete the project
                              and cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-4">
                              <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={() => setPopupBox(false)} // Close modal without action
                              >
                                Cancel
                              </button>
                              <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={deleteNote}
                              >
                                Delete Permanently
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-slate-50 mb-4">
                Sorry, no todos found.
              </h2>
              <p className="text-gray-300 text-center max-w-md text-xl md:text-2xl mb-6">
                It looks like there are no todos available at the moment. Start
                by adding a new todo or check back later for updates.
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Get Started on Your Notes
          </h2>
          <p className="text-lg mb-6">
            Create, edit, and organize your notes effortlessly to stay on top of
            everything.
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 my-2 dark:text-white dark:hover:bg-gray-700"
          >
            Go to Home
          </Link>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default AddNote;
