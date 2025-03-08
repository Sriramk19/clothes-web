import { useState, useEffect } from "react";
import axios from "axios";

const Clothes = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/getClothes")
      .then((response) => {
        setClothes(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching clothes:", error));
  }, []);

  return (
    <div>
      <h1 className="mx-2 text-lime-800 text-xl font-semibold">Clothes</h1>
      <div className="flex ">
        <ul className="flex gap-4 flex-wrap mx-4 my-2">
          {clothes.map((cloth, index) => (
            <li key={index} className="border-2 border-gray-300 shadow-lg  p-3">
              <img
                src={cloth.imageUrl}
                alt={cloth.tag}
                className="w-40 h-40 object-cover rounded-lg"
              />

              <h1 className="mx-2 text-lg font-semibold text-lime-800">
                {cloth.brand}
              </h1>
              <h1 className="mx-2 text-xs text-lime-700 mb-2">
                {cloth.occasion}
              </h1>
              <p className="mx-2 text-sm text-lime-700">{cloth.clothType}</p>
              <p className="mx-2 text-xs text-gray-400">
                Added on {new Date(cloth.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Clothes;
