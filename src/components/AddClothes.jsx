import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
//Cloudinary Image imports
import { Cloudinary } from "@cloudinary/url-gen";
const BASE_URL = "http://localhost:7777";
import { useNavigate } from "react-router-dom";

const AddClothes = () => {
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [occasion, setOccasion] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    setPreviewImage("");
    setSelectedImage("");
    if (!files || files.length === 0) {
      console.log("No file selected");
      return;
    }
    const imageFile = files[0];

    setPreviewImage(URL.createObjectURL(imageFile));
    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("size", "auto");

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": "2HTnSNjmnfZJcpc1kxsrvk7k", // Get this from Remove.bg
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Get the image as a blob
        }
      );

      console.log("Remove.bg API Response:", response);

      const blob = response.data;

      const bgRemovedFile = new File([blob], "bg_removed.png", {
        type: "image/png",
      });

      // Check if files is defined and contains at least one file

      const CLOUDINARY_URL =
        "https://api.cloudinary.com/v1_1/dpbrphx2g/image/upload";
      const CLOUDINARY_UPLOAD_PRESET = "cloth_image";

      formData.append("file", bgRemovedFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      // Upload the image to Cloudinary
      axios.post(CLOUDINARY_URL, formData).then((response) => {
        // Get the image URL from Cloudinary's response
        const imageUrl = response.data.secure_url;
        console.log("imageURL", imageUrl);
        setSelectedImage(imageUrl); // Store the image URL in state
        //console.log("Uploaded Image URL:", imageUrl);
      });
    } catch (error) {
      console.error("Cloudinary Error", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoaded || !user) {
      console.log("User not loaded yet");
      return;
    }
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("category", category);
    formData.append("tag", tag);
    formData.append("occasion", occasion);
    formData.append("brand", brand);
    const fileInput = document.getElementById("image-upload");
    if (fileInput.files.length > 0) {
      formData.append("image", selectedImage);
    }
    try {
      console.log("Form Data Contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const res = await axios.post(BASE_URL + "/clothes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload Sucessfull:");
    } catch (err) {
      if (err.response) {
        // Log the error response
        console.log("Upload Error:", err.response.data);
      } else {
        // If err.response is undefined, log a generic error
        console.log("Upload Error: Network error or server did not respond");
      }
    }
    setCategory("");
    setTag("");
    setOccasion("");
    setBrand("");
    setSelectedImage("");
    setPreviewImage("");
    document.getElementById("image-upload").value = "";

    navigate("/");
  };
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4">
      <div className=" lg:w-1/2 mx-16">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="block text-sm lg:text-base"
            >
              Select Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="w-full sm:w-72 md:w-80 lg:w-96 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-800 transition"
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm lg:text-base">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-68 md:w-64 mt-2 px-3 py-1 border bg-transparent border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-lime-800 transition"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm lg:text-base">
              Tags
            </label>
            {console.log(document.documentElement.scrollHeight)}
            {console.log(document.body.scrollHeight)}
            {console.log(window.innerHeight)}

            <select
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full  sm:w-40 md:w-64  mt-2 px-2 py-1 border bg-transparent border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-lime-800 transition"
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
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm lg:text-base">
              Occasion
            </label>
            <select
              id="Occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className=" w-full sm:w-40 md:w-64  mt-2 px-2 py-1 bg-transparent border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-lime-800"
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
            <label htmlFor="title" className="block text-sm lg:text-base">
              Brand
            </label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter the Brand"
              className="w-full sm:w-40 md:w-64 mt-2 px-2 py-1 border border-gray-300 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-lime-800"
            />
          </div>

          <div className="justify-center">
            <button
              type="submit"
              className="w-full sm:w-28 md:w-32 lg:w-40 rounded-md px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white font-medium bg-lime-700 hover:bg-lime-800 transition shadow-sm"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <div className=" w-full lg:w-1/2 flex justify-center item-center">
        {previewImage ? (
          <img
            src={previewImage}
            className="mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-lg shadow-md object-cover"
          />
        ) : (
          <h1 className="text-center text-gray-500">
            Upload to view a preview
          </h1>
        )}
      </div>
    </div>
  );
};
export default AddClothes;
