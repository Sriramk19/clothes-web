import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import trash from "../assets/trash.png";
const Collection = () => {
  const [collection, setCollection] = useState([]);
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchCollections = async () => {
      if (!isLoaded || !user) return;
      try {
        const token = await getToken();

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getCollection`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    };

    fetchCollections();
  }, [isLoaded, user]);

  const deleteCollection = async (id) => {
    try {
      const token = await getToken(); // Get user token for authentication
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/clothCollectionDelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCollection((prev) => prev.filter((item) => item._id !== id));
      console.log("Collection deleted successfully");
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };
  return (
    <div className="p-2 sm:p-6 md:p-8 lg:p-8 xl:p-6 min-h-screen">
      <div className="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">
          My Collection
        </h1>
        <div>
          {collection.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              {" "}
              <p className="text-lg font-semibold">
                You have no collections created yet.
              </p>
              <p className="text-sm mt-2">
                Start by adding your first outfit collection!
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {collection.map((collectionItem, index) => (
                <li
                  key={index}
                  className="group flex flex-col relative border-2 border-gray-300 shadow-lg p-1 sm:p-2 lg:p-3  hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <span className="absolute top-0 right-0 bg-lime-700 text-white text-[10px] font-semibold px-2 py-1 rounded-bl-lg shadow-md z-10">
                    {collectionItem.collectionOccasion}
                  </span>
                  <button
                    className="absolute top-2 left-2 bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCollection(collectionItem._id);
                    }}
                  >
                    <img src={trash} alt="Delete" className="w-5 h-5" />
                  </button>
                  <div className="relative w-full h-44 sm:h-52 lg:h-60 flex justify-center items-center">
                    {collectionItem.fromclothId.map((cloth, clothIndex) => (
                      <img
                        key={clothIndex}
                        src={cloth.imageUrl}
                        alt={cloth.tag}
                        className={`absolute object-contain rounded-lg transition-all duration-300
                ${
                  clothIndex === 0
                    ? "top-6 z-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
                    : "bottom-3 translate-x-3 z-10 w-20 h-20 sm:bottom-0 sm:translate-x-6 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
                }
              `}
                      />
                    ))}
                  </div>

                  <h1 className="text-sm sm:text-base lg:text-lg text-center text-gray-800 mb-1">
                    {collectionItem.collectionName}
                  </h1>
                  {/* Commenting thios off because i had created a ribbon effect to show the occassion to reduce space in the card */}
                  {/* <h1 className="mx-2 text-xs lg:text-sm mb-2">
                    {collectionItem.collectionOccasion}
                  </h1> */}
                  {/* <p className="mx-2 text-sm lg:text-xs text-lime-700">
                {collectionItem.collectionDescription}
              </p> */}
                  <p className=" text-[9px] text-gray-500 text-center mt-auto">
                    Added on{" "}
                    {new Date(collectionItem.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
