import { BASE_URL } from "../utils/Constant";

// Create a short URL
export const createShortUrl = async (originalUrl) => {
  const response = await fetch(`${BASE_URL}/url/createShortUrlNoLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl }),
  });
  if (!response.ok) throw new Error("Failed to create short URL");
  return response.json();
};

// Check if the short URL is password protected
export const checkPasswordProtection = async (id) => {
  const response = await fetch(`${BASE_URL}/url/getShortUrlWithPassword/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to check password protection");
  return response.json();
};

// Create session for a short URL
export const createSession = async (id) => {
  const response = await fetch(`${BASE_URL}/session/createSession/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error("Failed to create session");
  return response.json();
};

// Verify password
export const verifyPassword = async (id, password) => {
  const response = await fetch(`${BASE_URL}/session/validatePassword/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error("Failed to verify password");
  return response.json();
};
