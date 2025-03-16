/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyUserLayout from "./CompanyUserLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import axios from "axios";

const UserCredentials = () => {
  const params = useParams();
  const router = useRouter();

  const [userCredentialsDataLoader, setUserCredentialsDataLoader] =
    useState(true);
  const [dataProcessing, setDataProcessing] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    clientName: "",
    clientEmail: "",
    password: "",
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const sendCredentialsToUser = async (e: any) => {
    try {
      e.preventDefault();

      if (userCredentials.password.trim() === "") {
        toast.error("Password is required");
        return;
      }

      setDataProcessing(true);

      const response = await axios.post(
        "/api/companyUser/sendCredentials",
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Credentials sent successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setDataProcessing(false);
      router.push("/company-clients");
    }
  };

  const getUserCredentialsData = async () => {
    try {
      const response = await axios.get(
        `/api/companyUser/getUserCredentialsData/${params.userId}`
      );

      setUserCredentials({
        clientName: response.data.data.name,
        clientEmail: response.data.data.email,
        password: response.data.data.password || "",
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
      setUserCredentials({
        clientName: "",
        clientEmail: "",
        password: "",
      });
      router.push("/company-clients");
    }
  };

  const isCredentialsSent = async () => {
    try {
      if (!params.userId) return;

      const res = await axios.get(
        `/api/companyUser/isCredentialsSent/${params.userId}`
      );

      if (res.data.success && res.data.status === 200) {
        if (userCredentials.clientName.trim() === "") {
          getUserCredentialsData();
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
      router.push("/company-clients");
      return;
    } finally {
      setUserCredentialsDataLoader(false);
    }
  };

  useEffect(() => {
    if (userCredentials.clientName.trim() === "") {
      isCredentialsSent();
    }

    return () => {
      setUserCredentials({
        clientName: "",
        clientEmail: "",
        password: "",
      });
    };
  }, [params.userId]);

  return (
    <CompanyUserLayout>
      <>
        {userCredentialsDataLoader ? (
          <p className="text-5xl lg:text-6xl w-full min-h-screen h-full inline-flex items-center justify-center bg-slate-100 dark:bg-black">
            <ImSpinner9 className="animate-spin text-black dark:text-slate-50" />
          </p>
        ) : (
          userCredentials.clientName.trim() !== "" && (
            <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
              <div className="max-w-3xl mx-auto">
                <form
                  onSubmit={sendCredentialsToUser}
                  className="bg-white shadow-lg rounded-lg p-8 text-black"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    Client Details
                  </h2>

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
                      value={userCredentials.clientName}
                      readOnly
                      name="clientName"
                      className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      value={userCredentials.clientEmail}
                      readOnly
                      className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-lg font-semibold mb-2"
                    >
                      Temporary Password (to be shared securely)
                    </label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={userCredentials.password}
                      onChange={handleOnChange}
                      className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter temporary password"
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
                        Sending Credentials
                      </span>
                    ) : (
                      <>Send Credentials</>
                    )}
                  </button>
                </form>
              </div>
            </section>
          )
        )}
      </>
    </CompanyUserLayout>
  );
};

export default UserCredentials;
