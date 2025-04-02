import { useState } from "react";
import axios from "axios";
import bg from "./assets/bg1.jpg";
import { Routes, Route } from "react-router-dom";
//Cloudinary Image imports
import { Cloudinary } from "@cloudinary/url-gen";
import Clothes from "./components/Clothes";
import AddClothes from "./components/AddClothes";
import AddCollection from "./components/AddCollection";
import Collection from "./components/Collection";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import SignUpPage from "./components/signUp";
import SignInPage from "./components/SignIn";

const cld = new Cloudinary({ cloud: { cloudName: "dpbrphx2g" } });
const BASE_URL = "http://localhost:7777";
function App() {
  const [activeTab, setActiveTab] = useState("viewClothes");

  return (
    <div
      className="min-h-screen flex flex-col  bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex justify-end mx-2 my-1">
        <button className="justify- px-3 py-2 text-xs bg-lime-800 border-b rounded-md  text-white font-medium">
          Logout
        </button>
      </div>

      {/* Clerk Sign In /SignUp Page */}
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <div className="flex-1 p-4">
                  {/* Tabs */}
                  <div className="flex space-x-1 ">
                    <button
                      className={`px-3 py-2 text-xs ${
                        activeTab === "viewClothes"
                          ? "bg-lime-800 border-b rounded-md  text-white font-medium"
                          : "bg-gray-200 text-gray-600 rounded-lg  border-gray-300"
                      }`}
                      onClick={() => setActiveTab("viewClothes")}
                    >
                      Clothes
                    </button>
                    <button
                      className={`px-3 py-2 text-xs   ${
                        activeTab == "addClothes"
                          ? "bg-lime-800 border-b rounded-md  text-white font-medium"
                          : "bg-gray-200 text-gray-600 rounded-lg border-gray-300"
                      }`}
                      onClick={() => setActiveTab("addClothes")}
                    >
                      <span className="mr-1 text-sm">+</span>
                      <span>Clothes</span>
                    </button>
                    <button
                      className={`px-3 py-2 text-xs  ${
                        activeTab == "viewCollection"
                          ? "bg-lime-800 border-b rounded-md  text-white font-medium"
                          : "bg-gray-200 text-gray-600 rounded-lg border-gray-300"
                      }`}
                      onClick={() => setActiveTab("viewCollection")}
                    >
                      Collection
                    </button>
                    <button
                      className={`px-3 text-xs py-2   ${
                        activeTab == "AddCollection"
                          ? "bg-lime-800 border-b rounded-md  text-white font-medium"
                          : "bg-gray-200 text-gray-600 rounded-lg border-gray-300"
                      }`}
                      onClick={() => setActiveTab("AddCollection")}
                    >
                      <span className="mr-1 text-sm">+</span>
                      <span>Collection</span>
                    </button>
                  </div>
                  {/*Clothes Section*/}
                  {activeTab === "viewClothes" && <Clothes />}
                  {activeTab === "addClothes" && <AddClothes />}
                  {activeTab === "viewCollection" && <Collection />}
                  {activeTab === "AddCollection" && <AddCollection />}
                </div>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
      <footer className="bg-gray-800 text-white text-center py-3">
        © 2025 My Website | All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
