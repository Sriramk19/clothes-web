import { useState } from "react";
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
import { useClerk, useUser } from "@clerk/clerk-react";
import list from "./assets/list.png";
import { useNavigate } from "react-router-dom";

const cld = new Cloudinary({ cloud: { cloudName: "dpbrphx2g" } });
const BASE_URL = "http://localhost:7777";

function App() {
  const { isLoaded, user } = useUser();
  const [showLogout, setShowLogout] = useState(false);
  const [activeTab, setActiveTab] = useState("viewClothes");
  const navigate = useNavigate();

  const { signOut } = useClerk();
  if (!isLoaded) return <div>Loading Clerk...</div>;
  if (!user) return <RedirectToSignIn />;

  const clerkUserName = user.firstName;
  const handleLogout = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <div
      className="min-h-screen flex flex-col  bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Logo  */}
      <div className="max-w-screen-xl w-full mx-auto flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row  justify-between items-center py-4 gap-2">
          <div className="w-full sm:w-auto mt-4 text-center sm:text-left lg:mb-2 ">
            <h1
              onClick={() => navigate("/")}
              className="text-xl sm:text-2xl lg:text-3xl  font-semibold cursor-pointer hover:text-lime-800 transition"
            >
              Wardrobe<span className="text-lime-800">Online.</span>
            </h1>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end items-center gap-3">
            <p className=" text-lime-800 font-semibold sm:text-base my-1">
              Hello, {clerkUserName}
            </p>

            <img
              src={list}
              alt="menu"
              className="w-6 h-6 cursor-pointer my-1"
              onClick={() => setShowLogout((prev) => !prev)}
            />
            {showLogout && (
              <button
                className="absolute top-10 right-0 z-10 px-4 py-2 text-sm bg-white border border-gray-300 text-lime-800 rounded-md shadow-md whitespace-nowrap"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Clerk Sign In /SignUp Page */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <div className="flex-grow p-4">
                    {/* Tabs */}
                    <div className="flex justify-center space-x-3 ">
                      <button
                        className={`px-3 py-2 text-xs ${
                          activeTab === "viewClothes"
                            ? "bg-lime-800 border-b rounded-md  text-white font-medium"
                            : "bg-gray-200 text-gray-600 rounded-lg  border-gray-300"
                        }`}
                        onClick={() => setActiveTab("viewClothes")}
                      >
                        MyClothes
                      </button>
                      {/* Added it to the clothes section instead of making the mainscreen complex and bigger */}
                      {/* <button  
                      className={`px-3 py-2 text-xs   ${
                        activeTab == "addClothes"
                          ? "bg-lime-800 border-b rounded-md  text-white font-medium"
                          : "bg-gray-200 text-gray-600 rounded-lg border-gray-300"
                      }`}
                      onClick={() => setActiveTab("addClothes")}
                    >
                      <span className="mr-1 text-sm">+</span>
                      <span>Clothes</span>
                    </button> */}
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
          <Route path="/add-clothes" element={<AddClothes />} />
        </Routes>
      </main>
      <footer className="bg-gray-900  text-white text-center py-3">
        © 2025 My Website | All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
