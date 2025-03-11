import { useState, useEffect } from "react";
import axios from "axios";

const AddCollection = () => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [tag, setTag] = useState("");
  const [occasion, setOccasion] = useState("");
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:7777/getClothes")
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
      fromUserId: "user_2tgMeUJSpE5wO9OOxYFnHRWdMEb",
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
    <div>
      <div className="flex space-x-1">
        <div className="w-3/6 mx-10">
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
              className="mt-2 p-1 border border-gray-300 rounded bg-transparent"
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
              className="mt-2 p-1 border border-gray-300 rounded bg-transparent"
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
              className="mt-2 p-1 bg-transparent border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="mt-2 p-1 border bg-transparent border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        <div className="w-3/6">
          {selectedTop || selectedBottom ? (
            <div className="mt-6 w-72 p-6  border border-gray-400 rounded-lg shadow-lg">
              <div className="mx-10">
                {/* Top-Wear Preview */}
                {selectedTop && (
                  <div>
                    <img
                      src={selectedTop.imageUrl}
                      alt={selectedTop.tag}
                      className="w-40 h-40 object-contain rounded-lg"
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

          <button
            className=" mt-6 mx-14 px-4 py-2 bg-lime-800 border-b rounded-lg  text-white font-medium"
            onClick={submitCollection}
          >
            Add to Collection
          </button>
        </div>
      </div>
      {/* Display of clothes */}
      <div className="mx-10">
        <h2 className="font-semibold">Clothes</h2>
        {filteredClothes.length === 0 ? (
          <h1 className="font-bold">Oops!...No clothes to be filtered</h1>
        ) : (
          <ul className="flex gap-4 flex-wrap my-2">
            {filteredClothes.map((item, index) => (
              <li
                key={index}
                className="border-2 border-gray-300 shadow-lg cursor-pointer p-3"
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.tag}
                  className="w-40 h-40 object-cover rounded-lg"
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
  );
};

export default AddCollection;
