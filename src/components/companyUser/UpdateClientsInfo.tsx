/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CompanyUserLayout from "./CompanyUserLayout";
import { ImSpinner9 } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
import { Button } from "@/components/ui/button";

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
        <div className="container max-w-4xl mx-auto py-10 px-4">
          <Card className="border shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Client Details
              </CardTitle>
              <CardDescription>Update details for this client</CardDescription>
            </CardHeader>
            <form onSubmit={updateClientUser}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      type="text"
                      id="clientName"
                      value={client.name}
                      onChange={handleOnChange}
                      name="name"
                      placeholder="Enter client name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Client Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={client.email}
                      onChange={handleOnChange}
                      placeholder="Enter client email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Client Joining Date</Label>
                    <Input
                      type="date"
                      id="date"
                      name="dateJoined"
                      value={
                        client.dateJoined
                          ? new Date(client.dateJoined)
                              ?.toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={handleOnChange}
                      placeholder="Enter client joining date"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Client Country</Label>
                    <Input
                      type="text"
                      id="country"
                      name="country"
                      value={client.country}
                      onChange={handleOnChange}
                      placeholder="Enter client country"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Client Phone No.</Label>
                    <Input
                      type="text"
                      id="phone"
                      name="phone"
                      value={client.phone}
                      onChange={handleOnChange}
                      placeholder="Enter client phone number"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={dataProcessing}
                >
                  {dataProcessing ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin mr-2 h-4 w-4" />
                      Updating Client Data
                    </>
                  ) : (
                    <>Update Client Data</>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </CompanyUserLayout>
  );
};

export default UpdateClientsInfo;
