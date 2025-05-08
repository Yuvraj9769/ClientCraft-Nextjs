/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
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

    try {
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
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <Card className="border shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Add New Client</CardTitle>
            <CardDescription>
              Enter the client details to get started.
            </CardDescription>
          </CardHeader>
          <form onSubmit={submitClientData}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectClientName">Client Name</Label>
                  <Input
                    id="projectClientName"
                    name="projectClientName"
                    ref={clientName}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    ref={clientEmail}
                    placeholder="Enter client email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientJoinDate">Client Join Date</Label>
                  <Input
                    type="date"
                    id="clientJoinDate"
                    name="clientJoinDate"
                    ref={clientJoinDate}
                    placeholder="Client join date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Client Phone Number</Label>
                  <Input
                    type="text"
                    id="clientPhone"
                    name="clientPhone"
                    ref={clientPhone}
                    placeholder="Client phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientCountry">Client Country</Label>
                  <Input
                    type="text"
                    id="clientCountry"
                    name="clientCountry"
                    ref={clientCountry}
                    placeholder="Client country"
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
                  <span className="inline-flex items-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
                    Processing
                  </span>
                ) : (
                  "Add Client"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </CompanyUserLayout>
  );
};

export default AddNewClient;
