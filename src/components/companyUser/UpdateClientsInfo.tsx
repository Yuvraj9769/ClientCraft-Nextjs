/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CompanyUserLayout from "./CompanyUserLayout";
import { ImSpinner9 } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UpdateClientsInfo = () => {
  const { clientId } = useParams();
  const router = useRouter();

  const [dataFetcher, setDataFetcher] = useState(true);

  const [dataProcessing, setDataProcessing] = useState(false);

  const [client, setClient] = useState({
    _id: "",
    name: "",
    email: "",
    dateJoined: "",
    country: "",
    phone: "",
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setClient((preData) => ({ ...preData, [name]: value }));
  };

  const updateClientUser = async (e: any) => {
    try {
      e.preventDefault();

      setClient((preData) => ({ ...preData, _id: clientId as string }));

      if (client.name.trim() === "") {
        toast.error("Client Name is required");
        return;
      }

      if (client.email.trim() === "") {
        toast.error("Email is required");
        return;
      }

      if (client.country.trim() === "") {
        toast.error("Country name is required");
        return;
      }

      if (client.phone.trim() === "") {
        toast.error("Phone no. is required");
        return;
      }

      setDataProcessing(true);

      const response = await axios.patch(
        "/api/companyUser/update-clientUser",
        client,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Project updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setDataProcessing(false);
      router.push("/company-clients");
    }
  };

  const getCurrentClientData = useCallback(async () => {
    try {
      if (!clientId) return;

      const response = await axios.get(
        `/api/companyUser/getCurrentUserData/${clientId}`
      );
      setClient(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
      router.push("/company-clients");
    } finally {
      setDataFetcher(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (client.name.trim() === "") {
      getCurrentClientData();
    }
  }, []);

  return (
    <CompanyUserLayout>
      {dataFetcher ? (
        <p className="text-5xl lg:text-6xl w-full min-h-screen h-full inline-flex items-center justify-center bg-slate-100 dark:bg-black">
          <ImSpinner9 className="animate-spin text-black dark:text-slate-50" />
        </p>
      ) : (
        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={updateClientUser}
              className="bg-white shadow-lg rounded-lg p-8 text-black"
            >
              <h2 className="text-2xl font-semibold mb-6">Client Details</h2>

              <div className="mb-6">
                <label
                  htmlFor="clientName"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={client.name}
                  onChange={handleOnChange}
                  name="name"
                  className="w-full p-3 border border-gray-300 bg-slate-50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="clientEmail"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={client.email}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 bg-slate-50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client email"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="clientJoinedDate"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Joining Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="dateJoined"
                  value={
                    client.dateJoined
                      ? new Date(client.dateJoined)?.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 bg-slate-50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client joining date"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="clientCountry"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={client.country}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 bg-slate-50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client country"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="clientPhone"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Phone No.
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={client.phone}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 bg-slate-50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client phone number"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200 inline-flex items-center justify-center gap-3"
              >
                {dataProcessing ? (
                  <span className="inline-flex items-center justify-center gap-3">
                    <AiOutlineLoading3Quarters className="animate-spin text-lg font-semibold text-slate-50" />{" "}
                    Updating Client Data
                  </span>
                ) : (
                  <>Update Client Data</>
                )}
              </button>
            </form>
          </div>
        </section>
      )}
    </CompanyUserLayout>
  );
};

export default UpdateClientsInfo;
