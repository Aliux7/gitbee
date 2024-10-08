"use client";
import { useMsal } from "@azure/msal-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import { useAuth } from "@/app/context/AuthContext";

const page = () => {
  const { userData, setUserData } = useAuth();
  const { instance, inProgress, accounts } = useMsal();
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      if (inProgress === "none" && accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            account: accounts[0],
            scopes: ["user.read"],
          });

          if (!response) {
            throw new Error("Token acquisition failed");
          }

          const idToken = accounts[0]?.idToken ? accounts[0].idToken : "";
          const result = await login(idToken);
          if (result?.success) {
            setUserData({
              nim: result.data.nim,
              name: result.data.name,
              email: result.data.email,
              role: result.data.role,
            });

            if (result.data.role == "Student") router.push("/dashboard");
            if (result.data.role == "Lecturer") router.push("/profile");
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("An error occurred during redirection:", error);
        }
      } else if (inProgress === "none" && accounts.length <= 0) {
        router.push("/");
      }
    };

    handleRedirect();
  }, [instance, accounts, inProgress]);

  return (
    <div className="fixed z-[100] bg-white w-screen h-screen flex justify-center items-center">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <h1 className="font-montserrat font-bold text-2xl text-primary-binus absolute animate-pulse">
          <span className="bg-primary-binus text-white px-2 rounded-md mr-1">
            Git
          </span>
          Bee
        </h1>
        <div className="w-36 h-36 border-8 text-primary-orange text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-primary-orange rounded-full"></div>
      </div>
    </div>
  );
};

export default page;
