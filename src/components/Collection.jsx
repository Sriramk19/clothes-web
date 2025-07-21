import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const Collection = () => {
  const [collection, setCollection] = useState([]);
  const { isLoaded, user } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    const clerkUserId = user.id;
    // env
    axios
      .get(`http://localhost:7777/getCollection?userId=${clerkUserId}`)
      .then((response) => {
        setCollection(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching clothes:", error));
  }, [isLoaded, user]);
  return (
    <div className="p-2 sm:p-6 md:p-8 lg:p-8 xl:p-6 min-h-screen">
      <div className="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">
          My Collection
        </h1>
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {collection.map((collectionItem, index) => (
              <li
                key={index}
                className="flex flex-col relative border-2 border-gray-300 shadow-lg p-1 sm:p-2 lg:p-3  hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <span className="absolute top-0 right-0 bg-lime-700 text-white text-[10px] font-semibold px-2 py-1 rounded-bl-lg shadow-md z-10">
                  {collectionItem.collectionOccasion}
                </span>

                {collectionItem.fromclothId.map((cloth, clothIndex) => (
                  <div
                    key={clothIndex}
                    className={`p-2 ${
                      clothIndex === 1 ? "-mt-7 lg:-mt-8" : ""
                    } `}
                  >
                    <img
                      src={cloth.imageUrl}
                      alt={cloth.tag}
                      className="w-24 h-24 sm:w-20 sm:h-20 lg:w-40 lg:h-40 object-cover items-center rounded-lg"
                    />
                  </div>
                ))}

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
        </div>
      </div>
    </div>
  );
};

export default Collection;
