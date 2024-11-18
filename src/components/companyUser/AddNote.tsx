"use client";

import React from "react";
import CompanyUserLayout from "./CompanyUserLayout";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const AddNote = () => {
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
              action="/api/projects"
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
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note description"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add Note
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
          <div className="w-full flex items-center justify-center p-4 lg:py-6 gap-4 flex-wrap lg:flex-nowrap max-w-7xl">
            <div className="gap-3 w-full inline-flex mt-2 items-center justify-center text-black rounded-md pr-2">
              <input
                type="text"
                placeholder="Search note by title"
                className="p-2 rounded-md border-none outline-none w-[85%] lg:w-[65%] dark:bg-slate-800 duration-500  bg-slate-200 focus-within:ring-1 dark:focus-within:ring-blue-500 focus-within:ring-black group dark:text-slate-50 text-black"
              />
            </div>
            <select className="outline-none border text-black border-[#dadada] rounded-md p-3 w-full max-w-[275px] lg:w-auto">
              <option value="" disabled>
                Sort Notes
              </option>
              <option value="latest">Sort by Date (Newest to Oldest)</option>
              <option value="oldest">Sort by Date (Oldest to Newest)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 md:p-6 rounded-md bg-gray-100 gap-4 dark:bg-gray-800 w-full max-w-7xl">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 1</h3>
              <p>
                Lorem ipsum dolor sit amet, ieoif do ofdimnosdi jfoifnvkjdbv n
                noiurgnkj fnvlkjd nboivfn vlkj iugfn gkjfd gngkjdfb dd
                consectetur dsf csdvf dvgds sdu siudhbsiud gdfvg f adipiscing
                elit.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 2</h3>
              <p>
                Donec vel metus nunc. Sed venenatis sfd siudfisud jfisdudsfsdfdg
                venenatis mi ut mollis.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 3</h3>
              <p>
                Curabitur vitae leo fringilla, fkdlnjgda ngdkljnbe jugdkfljvnmdf
                gdkfj ifd fermentum tortor a, consequat erat.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 4</h3>
              <p>
                Phasellus euismod erat sit amet sdf sdoifjsoidfjoksdvgsd fsd
                libero cursus sollicitudin.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 5</h3>
              <p>
                Aenean pretium urna a nisi tristique, isfdhfdinbkjfdngiuregtn
                kjdf ngiufd a viverra purus pharetra.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 6</h3>
              <p>
                Nulla tempor dui id ligula vehicula, non fringilla magna
                lacinia.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 7</h3>
              <p>
                Morbi vitae leo et neque if soiduH GOPK O0F9B
                JKOPIAFJWROIDFJWOIGJVN tempus tincidunt.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 8</h3>
              <p>
                Integer tincidunt ex vitae eros iojf
                oisjfoigjopegedmlkdfmieojgvn fermentum, in tempus leo auctor.
              </p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit inline-flex flex-col gap-2">
              <h3 className="font-bold text-xl">Item 9</h3>
              <p>Nulla facilisi. Nunc vel turpis nisi.</p>
              <span className="py-1 px-1 sm:p-3 sm:pb-0 sm:pl-0 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
                <button
                  className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-3"
                  aria-label="Edit Client"
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-3"
                  aria-label="Delete Client"
                >
                  <FiTrash2 />
                </button>
              </span>
            </div>
          </div>
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
