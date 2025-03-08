import { useState } from "react";
import axios from "axios";
//Cloudinary Image imports
import { Cloudinary } from "@cloudinary/url-gen";
const BASE_URL = "http://localhost:7777";

const AddClothes = () => {
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [occasion, setOccasion] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

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
    const formData = new FormData();
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
  };
  return (
    <div className="flex  space-x-4 p-4">
      <div className="w-1/2 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="block text-base font-medium text-gray-700"
            >
              Select Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className=" mt-2 p-1 border border-gray-300 rounded-md text-gray-700"
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-base">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="  mt-2 p-1 border bg-transparent border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700"
            >
              Tags
            </label>

            <select
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
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
            <label htmlFor="title" className="block text-base">
              Brand
            </label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter a title"
              className=" mt-2 p-1 border border-gray-300 rounded bg-transparent"
            />
          </div>

          <div className="card-actions justify-center">
            <button
              type="submit"
              className="btn btn-primary rounded-md w-28 py-2 px-6 text-white bg-green-700"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 text-center">
        {previewImage ? (
          <img
            src={previewImage}
            className="max-w-md  mx-auto h-full object-contain rounded-md shadow-md "
          />
        ) : (
          <h1>Upload to view a preview</h1>
        )}
      </div>
    </div>
  );
};
export default AddClothes;
