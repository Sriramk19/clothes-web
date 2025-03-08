import { useState } from "react";
import axios from "axios";
import bg from "./assets/bg1.jpg";
//Cloudinary Image imports
import { Cloudinary } from "@cloudinary/url-gen";
import Clothes from "./components/Clothes";
import AddClothes from "./components/AddClothes";
import AddCollection from "./components/AddCollection";
import Collection from "./components/Collection";

const cld = new Cloudinary({ cloud: { cloudName: "dpbrphx2g" } });
const BASE_URL = "http://localhost:7777";
function App() {
  const [activeTab, setActiveTab] = useState("viewClothes");

  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex ">
        <h1 className="text-blue-500">Header</h1>
      </div>
      {/* Tabs */}
      <div className=" mx-8 flex space-x-1 border-b border-gray-300">
        <button
          className={`px-4 py-2 ${
            activeTab == "viewClothes"
              ? "bg-lime-800 border-b rounded-lg  text-white font-medium"
              : "bg-gray-200 text-gray-600 rounded-lg  border-gray-300"
          }`}
          onClick={() => setActiveTab("viewClothes")}
        >
          Clothes
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab == "addClothes"
              ? "bg-lime-800 border-b rounded-lg  text-white font-medium"
              : "bg-gray-200 text-gray-600 rounded-lg border-gray-300"
          }`}
          onClick={() => setActiveTab("addClothes")}
        >
          Add Clothes
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab == "viewCollection"
              ? "bg-lime-800 border-b rounded-lg  text-white font-medium"
              : "bg-gray-200 text-gray-600 rounded-lg border-gray-300"
          }`}
          onClick={() => setActiveTab("viewCollection")}
        >
          Collection
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab == "AddCollection"
              ? "bg-lime-800 border-b rounded-lg  text-white font-medium"
              : "bg-gray-200 text-gray-600 rounded-lg border-gray-300"
          }`}
          onClick={() => setActiveTab("AddCollection")}
        >
          Create Collection
        </button>
      </div>
      {/* Add Clothes Section */}
      {activeTab == "viewClothes" && <Clothes />}
      {activeTab == "addClothes" && <AddClothes />}
      {activeTab == "viewCollection" && <Collection />}
      {activeTab == "AddCollection" && <AddCollection />}

      <div>footer</div>
    </div>
  );
}

export default App;
