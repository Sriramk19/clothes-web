import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Clothes = () => {
  const [clothes, setClothes] = useState([]);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    const clerkUserId = user.id;
    axios
      .get(`http://localhost:7777/getClothes?userId=${clerkUserId}`)
      .then((response) => {
        setClothes(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Error fetching clothes:", error));
    setClothes([]);
  }, [isLoaded, user]);

  if (!isLoaded || !user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="mx-2 my-4 text-lime-800 text-lg font-semibold">Clothes</h1>
      <div className="flex justify-center ">
        <ul className="mx-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-full overflow-hidden gap-2">
          {clothes.map((cloth, index) => (
            <li
              key={index}
              className="border-2 border-gray-300 shadow-lg p-1 sm:p-2 lg:p-3 flex flex-col items-center min-h-[180px] hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <img
                src={cloth.imageUrl}
                alt={cloth.tag}
                className="w-20 h-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover aspect-square rounded-lg"
              />
              <h1 className="mx-2 text-sm sm:text-base lg:text-lg font-semibold text-lime-800">
                {cloth.brand}
              </h1>
              <h1 className="mx-2 text-xs sm:text-sm text-lime-700 mb-2">
                {cloth.occasion}
              </h1>
              <p className="mx-2 text-sm text-lime-700">{cloth.clothType}</p>
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
      </div>
    </div>
  );
};

export default Clothes;
