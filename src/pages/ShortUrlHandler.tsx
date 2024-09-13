import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShortUrlById, validatePassword, createSession } from "../api/Api.tsx";
import PasswordScreen from "../components/PasswordScreen.tsx";

const ShortUrlHandler = () => {
  const { id } = useParams<{ id: string }>();
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShortUrl = async () => {
      try {
        const shortUrlData = await getShortUrlById(id!);
        const advanceOptions = shortUrlData.advanceOptions;

        setPasswordProtected(advanceOptions?.passwordProtection || false);
        setRedirectUrl(shortUrlData.redirectUrl);

        if (!advanceOptions?.passwordProtection) {
          const userAgent = navigator.userAgent;
          const sessionResponse = await createSession(id!, userAgent);

          if (sessionResponse.message === "Session created successfully") {
            window.location.href = shortUrlData.redirectUrl;
          } else {
            console.error("Session creation failed");
          }
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching short URL:", err);
      }
    };

    fetchShortUrl();
  }, [id]);

  const handlePasswordSubmit = async (password: string) => {
    try {
      const validationResponse = await validatePassword(id!, password);

      if (validationResponse.message === "Password validated successfully") {
        const userAgent = navigator.userAgent;
        const sessionResponse = await createSession(id!, userAgent);

        if (sessionResponse.message === "Session created successfully") {
          window.location.href = redirectUrl;
        } else {
          console.error("Session creation failed");
        }
      } else {
        console.error("Password validation failed");
      }
    } catch (err) {
      console.error("Error validating password:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (passwordProtected) {
    return <PasswordScreen onSubmit={handlePasswordSubmit} />;
  }

  return null;
};

export default ShortUrlHandler;
