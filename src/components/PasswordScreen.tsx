import React, { useState } from "react";

interface PasswordScreenProps {
  onSubmit: (password: string) => void;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-md w-[350px]">
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg shadow-sm"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PasswordScreen;
