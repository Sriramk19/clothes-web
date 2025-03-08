import { useState, useEffect } from "react";
import axios from "axios";
const AddCollection = () => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [tag, setTag] = useState("");
  const [occasion, setOccasion] = useState("");
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);

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

  const handleImageClick = (url, id) => {
    console.log(url, id);
  };
  const handleTagChange = async (e) => {
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
          className=" mt-2 p-1 border border-gray-300 rounded bg-transparent"
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
          className=" mt-2 p-1 border border-gray-300 rounded bg-transparent"
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
          className=" mt-2 p-1 border bg-transparent border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      {/* Display of clothes */}
      <div>
        <h2>Clothes</h2>
        {filteredClothes.length === 0 ? (
          <h1 className="font-bold">Oops!...No clothes to be filtered</h1>
        ) : (
          <ul className="flex gap-4 flex-wrap mx-4 my-2">
            {filteredClothes.map((item, index) => (
              <li
                key={index}
                className="border-2 border-gray-300 shadow-lg cursor-pointer p-3"
                onClick={() => handleImageClick(item.imageUrl, item.id)}
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
