import { useState, useEffect } from "react";
import bg from "./assets/bg1.jpg";
import { Routes, Route } from "react-router-dom";
//Cloudinary Image imports
import { Cloudinary } from "@cloudinary/url-gen";
import Clothes from "./components/Clothes";
import AddClothes from "./components/AddClothes";
import AddCollection from "./components/AddCollection";
import Collection from "./components/Collection";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import { useClerk, useUser } from "@clerk/clerk-react";
import list from "./assets/list.png";
import { useNavigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import IntroAnimation from "./components/Animation";
import { Toaster } from "react-hot-toast";
import h1 from "./assets/h1.png";
import h2 from "./assets/h2.png";
import h3 from "./assets/h3.png";

const cld = new Cloudinary({ cloud: { cloudName: "dpbrphx2g" } });
// env
const BASE_URL = "http://localhost:7777";

function App() {
  const { isLoaded, user } = useUser();
  const [showLogout, setShowLogout] = useState(false);
  const [activeTab, setActiveTab] = useState("viewClothes");
  const navigate = useNavigate();
  useEffect(() => {
    const handleReset = (e) => setActiveTab(e.detail);
    window.addEventListener("resetTab", handleReset);
    return () => window.removeEventListener("resetTab", handleReset);
  }, []);

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
      className="min-h-screen flex flex-col bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Logo  */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-screen-xl w-full mx-auto sm:px-6 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row  justify-between items-center py-4 gap-4">
          <div className="w-full sm:w-auto mt-4 text-center sm:text-left lg:mb-2 ">
            <h1
              onClick={() => navigate("/")}
              className="text-xl sm:text-2xl lg:text-3xl  font-semibold cursor-pointer hover:text-lime-800 transition"
            >
              Wardrobe<span className="text-lime-800">Online.</span>
            </h1>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end items-center gap-3 relative">
            <p className=" text-lime-800 px-2 font-semibold sm:text-base my-1">
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
                className="absolute top-2 right-1 sm:top-10 sm:right-0 z-10 px-4 py-2 text-sm text-lime-800 rounded-md shadow-lg transition-transform duration-200 ease-in-out hover:scale-105
                "
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
                    <div className="flex justify-center gap-1  space-x-3 ">
                      <button
                        title="Clothes"
                        className={`px-3 py-2 ${
                          activeTab === "viewClothes"
                            ? " bg-lime-700 rounded-md  text-white scale-105 shadow-md"
                            : "hover:bg-lime-600 border border-gray-500 rounded-md "
                        }`}
                        onClick={() => setActiveTab("viewClothes")}
                      >
                        <img src={h1} alt="Collection" className="w-6 h-6" />
                        {activeTab === "viewClothes" && (
                          <div className="absolute -top-20 left-1/2 -translate-x-1/2 scale-[0.5]">
                            <IntroAnimation />
                          </div>
                        )}
                      </button>
                      {/* Added it to the clothes section instead of making the mainscreen complex and bigger */}

                      <button
                        title="View Collection"
                        className={`px-3 py-2  ${
                          activeTab == "viewCollection"
                            ? "bg-lime-700 rounded-md  text-white scale-105 shadow-md"
                            : "hover:bg-lime-600 border border-gray-500 rounded-md "
                        }`}
                        onClick={() => setActiveTab("viewCollection")}
                      >
                        <img src={h2} alt="Collection" className="w-6 h-6" />
                        {activeTab === "viewCollection" && (
                          <div className="absolute -top-20 left-1/2 -translate-x-1/2 scale-[0.5]">
                            <IntroAnimation />
                          </div>
                        )}
                      </button>
                      <button
                        title="Add Collection"
                        className={`px-3 py-2   ${
                          activeTab == "AddCollection"
                            ? "bg-lime-700  rounded-md  text-white scale-105 shadow-md"
                            : "hover:bg-lime-600 border border-gray-500 rounded-md "
                        }`}
                        onClick={() => setActiveTab("AddCollection")}
                      >
                        <img src={h3} alt="Collection" className="w-6 h-6" />
                        {activeTab === "AddCollection" && (
                          <div className="absolute -top-20 left-1/2 -translate-x-1/2 scale-[0.5]">
                            <IntroAnimation />
                          </div>
                        )}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-gray-900  text-white text-center py-3">
        © 2025 My Website | All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
