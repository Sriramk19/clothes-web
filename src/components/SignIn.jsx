import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
