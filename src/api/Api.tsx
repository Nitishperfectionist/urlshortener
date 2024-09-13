const BASE_URL= "http://192.168.0.122:1234/api";

// Validate password
export const validatePassword = async (id: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/session/validatePassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    console.log("Validate Password Response Status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to validate password");
    }

    const data = await response.json();
    console.log("Validate Password Response Data:", data);
    return data;
  } catch (error) {
    console.error("Error validating password:", error);
    throw error;
  }
};

// Create session
export const createSession = async (id: string, userAgent: string) => {
  try {
    const response = await fetch(`${BASE_URL}/session/createSession/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userAgent }),
    });

    console.log("Create Session Response Status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    const data = await response.json();
    console.log("Create Session Response Data:", data);
    return data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

// Get short URL by ID
export const getShortUrlById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/url/getShortUrlWithPassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Get Short URL Response Status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to fetch short URL");
    }

    const data = await response.json();
    console.log("Get Short URL Response Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching short URL:", error);
    throw error;
  }
};
