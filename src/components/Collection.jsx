import axios from "axios";
import { useEffect, useState } from "react";

const Collection = () => {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7777/getCollection")
      .then((response) => {
        setCollection(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching clothes:", error));
  }, []);
  return (
    <div>
      <h1 className="mx-2 my-4 text-lime-800 lg:text-lg font-semibold">
        My Collection
      </h1>
      <div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-full overflow-hidden gap-2 mx-2">
          {console.log(collection)}
          {collection.map((collectionItem, index) => (
            <li
              key={index}
              className="flex flex-col items-center border-2 border-gray-300 shadow-lg p-1 sm:p-2 lg:p-3  hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {collectionItem.fromclothId.map((cloth, clothIndex) => (
                <div
                  key={clothIndex}
                  className={`p-2 ${clothIndex === 1 ? "-mt-7 lg:-mt-8" : ""} `}
                >
                  <img
                    src={cloth.imageUrl}
                    alt={cloth.tag}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg"
                  />
                </div>
              ))}

              <h1 className="mx-2 lg:text-lg font-semibold text-lime-800">
                {collectionItem.collectionName}
              </h1>
              <h1 className="mx-2 text-xs lg:text-sm text-lime-700 mb-2">
                {collectionItem.collectionOccasion}
              </h1>
              {/* <p className="mx-2 text-sm lg:text-xs text-lime-700">
                {collectionItem.collectionDescription}
              </p> */}
              <p className="mx-2 text-[9px] text-gray-400">
                Added on{" "}
                {new Date(collectionItem.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Collection;
