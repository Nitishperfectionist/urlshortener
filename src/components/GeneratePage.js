import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { createShortUrl } from "../api/Url";
import { RiFileCopyLine } from "@remixicon/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

const GeneratePage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const inputRef = useRef(null);

  // const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await createShortUrl(originalUrl);
      setShortUrl(response.data.shortUrl);
      toast.success("Short URL generated!");
      // navigate(`/password-protection/${response.data.code}?redirect=${encodeURIComponent(originalUrl)}`);
    } catch (error) {
      toast.error("Error generating short URL");
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(`http://192.168.0.118:1234/${shortUrl}`);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-md w-[350px]">
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg shadow-sm"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Generate Short URL
        </button>
      </div>

      
        <div className="relative w-[350px] mt-8">
          <input
            type="text"
            ref={inputRef}
            value={`http://192.168.0.118:1234/${shortUrl}`}
            readOnly
            className="w-full px-4 py-2 text-lg text-gray-700 border border-gray-300 rounded-lg shadow-sm"
          />
          <RiFileCopyLine
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={handleCopy}
          />
        </div>
      

      <ToastContainer />
    </div>
  );
};

export default GeneratePage;
