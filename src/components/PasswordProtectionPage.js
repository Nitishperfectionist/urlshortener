import React, { useState } from "react";
import { useParams} from "react-router-dom";
import { verifyPassword, createSession } from "../api/Url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordProtectionPage = () => {
  const { code } = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyPassword(code, password);
      if (response.isValid) {
        const sessionResponse = await createSession(code);
        window.location.href = sessionResponse.originalUrl;
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Enter Password</h2>
        <form onSubmit={handlePasswordSubmit} className="mt-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg shadow-sm mb-4"
          />
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordProtectionPage;
