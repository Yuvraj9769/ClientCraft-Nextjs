/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import CompanyUserLayout from "./CompanyUserLayout";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

const AddNewClient = () => {
  const clientName = useRef<HTMLInputElement>(null);
  const clientEmail = useRef<HTMLInputElement>(null);
  const clientJoinDate = useRef<HTMLInputElement>(null);
  const clientCountry = useRef<HTMLInputElement>(null);
  const clientPhone = useRef<HTMLInputElement>(null);

  const [dataProcessing, setDataProcessing] = useState(false);

  const router = useRouter();

  const submitClientData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clientName.current?.value.trim() === "") {
      toast.error("Client name is requred!");
      return;
    }
    if (clientEmail.current?.value.trim() === "") {
      toast.error("Project name is requred!");
      return;
    }

    if (clientJoinDate.current?.value.trim() === "") {
      toast.error("Client joinDate is requred!");
      return;
    }
    if (clientCountry.current?.value.trim() === "") {
      toast.error("Client country is requred!");
      return;
    }
    if (clientPhone.current?.value.trim() === "") {
      toast.error("Client Phone number is requred!");
      return;
    }

    setDataProcessing(true);

    const clientData = {
      clientName: clientName.current?.value.trim(),
      clientEmail: clientEmail.current?.value.trim(),
      clientJoinDate: clientJoinDate.current?.value.trim(),
      clientCountry: clientCountry.current?.value.trim(),
      clientPhone: clientPhone.current?.value.trim(),
    };

    try {
      const res = await axios.post("/api/companyUser/add-client", clientData);
      if (res.data.success && res.data.status === 201) {
        toast.success(res.data.message || "Client added successfully");
        router.push("/company-clients");
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setDataProcessing(false);
      clientName.current!.value = "";
      clientEmail.current!.value = "";
      clientJoinDate.current!.value = "";
      clientCountry.current!.value = "";
      clientPhone.current!.value = "";
    }
  };

  return (
    <CompanyUserLayout>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Add New Client</h1>
          <p className="text-lg mb-6">
            Enter the client details to get started.
          </p>
        </section>

        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={submitClientData}
              className="bg-white shadow-lg rounded-lg p-8 text-black"
            >
              <h2 className="text-2xl font-semibold mb-6">
                New Client Details
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="projectClient"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  id="projectClientName"
                  name="projectClientName"
                  ref={clientName}
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectClient"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Email
                </label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  ref={clientEmail}
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client email"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectClient"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Join Date
                </label>
                <input
                  type="date"
                  id="clientJoinDate"
                  name="clientJoinDate"
                  ref={clientJoinDate}
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client Join Date"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectClient"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Phone Number
                </label>
                <input
                  type="text"
                  id="clientPhone"
                  name="clientPhone"
                  ref={clientPhone}
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client phone number"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectClient"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Country Name
                </label>
                <input
                  type="text"
                  id="clientCountry"
                  name="clientCountry"
                  ref={clientCountry}
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client country"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                {dataProcessing ? (
                  <span className="inline-flex items-center justify-center gap-3">
                    <AiOutlineLoading3Quarters className="animate-spin text-lg font-semibold text-slate-50" />
                    Processing
                  </span>
                ) : (
                  "Add Client"
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default AddNewClient;
