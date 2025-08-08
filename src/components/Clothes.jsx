import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Clothes = () => {
  const [clothes, setClothes] = useState([]);
  const { isLoaded, user } = useUser();
  const [visibleCount, setVisibleCount] = useState(5);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getClothes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClothes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching clothes:", error);
        setClothes([]);
      }
    };
    if (isLoaded && user) {
      fetchClothes();
    }
  }, [isLoaded, user]);

  if (!isLoaded || !user) return <p>Loading...</p>;

  return (
    <div className="p-2 sm:p-6 md:p-6 lg:p-6 xl:p-6 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold mb-4">Clothes</h1>
          </div>
          <div>
            <button
              onClick={() => navigate("/add-clothes")}
              className="px-4 py-1 lg:py-2 text-sm border border-gray-400 text-gray-700 rounded-md hover:bg-lime-700 hover:text-black transition"
            >
              <span className="mr-1 text-sm">+</span>
              <span>Add Clothes</span>
            </button>
          </div>
        </div>
        {clothes.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg font-semibold">
              You haven’t uploaded any clothes yet.
            </p>
            <p className="text-sm mt-2">
              Start building your wardrobe by adding your first item.
            </p>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {clothes.slice(0, visibleCount).map((cloth, index) => (
                <li
                  key={index}
                  className="border-2 border-gray-300 shadow-md rounded-md p-4 sm:p-4 lg:p-6 flex flex-col  justify-between min-h-[240px] hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  {cloth.imageUrl ? (
                    <img
                      src={cloth.imageUrl}
                      alt={cloth.tag || "Cloth image"}
                      className="w-24 h-24 sm:w-24 sm:h-24 lg:w-40 lg:h-40 mb-2 object-cover aspect-square rounded-lg mx-auto"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-24 sm:h-24 lg:w-40 lg:h-40 mb-2 bg-gray-100 rounded-lg mx-auto flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                  <h1 className="text-xs sm:text-sm text-gray-500">
                    {cloth.occasion}
                  </h1>

                  <h1 className="text-sm sm:text-base mb-2 lg:text-md font-light text-black">
                    {cloth.brand}
                  </h1>

                  {/* <p className="mx-2 text-sm text-lime-700">{cloth.clothType}</p> */}
                  <p className="mx-2 text-[9px] sm:text-[10px] lg:text-xs text-gray-400">
                    Added on{" "}
                    {new Date(cloth.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
            {visibleCount < clothes.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                  className="px-4 py-2 text-sm border border-gray-400 text-gray-700 rounded-md hover:bg-lime-700 "
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Clothes;
