import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCollection = () => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [tag, setTag] = useState("");
  const [occasion, setOccasion] = useState("");
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const clerkUserId = user.id;
  useEffect(() => {
    const clerkUserId = user.id;

    axios
      .get(`http://localhost:7777/getClothes?userId=${clerkUserId}`)
      .then((response) => {
        setClothes(response.data);
        console.log(response.data);
        setFilteredClothes(response.data);
      })
      .catch((error) => console.error("Error fetching clothes:", error));
  }, []);

  const submitCollection = () => {
    if (!selectedTop || !selectedBottom) {
      alert("Please select a top and bottom to finish the collection");
      return;
    }

    const collectionData = {
      fromUserId: clerkUserId,
      fromclothId: [selectedTop.id, selectedBottom.id],
      collectionName: collectionName,
      collectionDescription: collectionDescription,
      collectionOccasion: occasion,
      favourite: false,
    };
    console.log(collectionData);

    axios
      .post("http://localhost:7777/clothCollection", collectionData)
      .then((response) => {
        console.log("Collection Added", response.data);
        alert("Collection successfully added!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding collection:", error);
        alert("Failed to add collection.");
      });
  };

  const handleImageClick = (item) => {
    if (["Shirt", "T-Shirt", "Hoodie", "Activewear-Shirt"].includes(item.tag)) {
      setSelectedTop((prev) => (prev?.id === item.id ? null : item));
    } else if (
      [
        "Pant",
        "Trouser",
        "Shorts",
        "Activewear-Pants",
        "Activewear-Shorts",
      ].includes(item.tag)
    ) {
      setSelectedBottom((prev) => (prev?.id === item.id ? null : item));
    }
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    setTag(tag);

    if (tag) {
      const tagFilteredClothes = clothes.filter((item) => item.tag === tag);
      setFilteredClothes(tagFilteredClothes);
    } else {
      setFilteredClothes(clothes);
    }
  };

  return (
    <div className="flex-grow mt-4 flex flex-col">
      <div className="mx-12">
        {/* {FormSection} */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-base">
                Collection Name
              </label>
              <input
                id="collectionName"
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Collection Name"
                className="mt-2 px-3 py-1 border border-gray-300 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-lime-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-base">
                Collection Description
              </label>
              <input
                id="collectionDescription"
                type="text"
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
                placeholder="Description"
                className="mt-2 px-3 py-1 border border-gray-300 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-lime-800"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-base">
                Occasion
              </label>
              <select
                id="Occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="mt-2 px-5 py-1 bg-transparent border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-lime-800"
              >
                <option value="" disabled>
                  Select an Occasion
                </option>
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Semi-Formal">Semi-Formal</option>
                <option value="Party">Party</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-base font-medium text-gray-700"
              >
                Choose Tags
              </label>

              <select
                id="tag"
                value={tag}
                onChange={handleTagChange}
                className="mt-2 px-6 py-1 border bg-transparent border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-lime-800"
              >
                <option value="Shirt">Shirt</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Hoodie">Hoodie</option>
                <option value="Trouser">Trouser</option>
                <option value="Shorts">Shorts</option>
                <option value="Activewear-Shirt">Activewear-Shirt</option>
                <option value="Activewear-Pants">Activewear-Pants</option>
                <option value="Activewear-Shorts">Activewear-Shorts</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {selectedTop || selectedBottom ? (
              <div className="mt-6 w-72 p-6  border border-gray-400 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                  {/* Top-Wear Preview */}
                  {selectedTop && (
                    <div>
                      <img
                        src={selectedTop.imageUrl}
                        alt={selectedTop.tag}
                        className="w-40 h-40 object-contain rounded-lg "
                      />
                    </div>
                  )}

                  {/* Bottom-Wear Preview */}
                  {selectedBottom && (
                    <div className=" -my-7">
                      <img
                        src={selectedBottom.imageUrl}
                        alt={selectedBottom.tag}
                        className="w-40 h-40  rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {selectedTop && selectedBottom ? (
              <button
                className=" mt-6 mx-14 text-sm px-4 py-2 bg-lime-800 border-b rounded-lg  text-white font-medium"
                onClick={submitCollection}
              >
                Add to Collection
              </button>
            ) : null}
          </div>
        </div>
        {/* Display of clothes */}
        <div className="mt-8 lg:mx-4">
          <h2 className="text-xl font-semibold">Clothes</h2>
          {filteredClothes.length === 0 ? (
            <h1 className="font-bold">Oops!...No clothes to be filtered</h1>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 flex-wrap my-2">
              {filteredClothes.map((item, index) => (
                <li
                  key={index}
                  className="border-2 border-gray-300 shadow-lg cursor-pointer p-3  hover:scale-105 transition-all duration-300 ease-in-out"
                  onClick={() => handleImageClick(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.tag}
                    className="w-24 h-24 sm:w-24 sm:h-24 lg:w-40 lg:h-40 mb-2 object-cover aspect-square rounded-lg mx-auto"
                  />
                  <h1 className="mx-2 text-lg font-semibold text-lime-800">
                    {item.brand}
                  </h1>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCollection;
