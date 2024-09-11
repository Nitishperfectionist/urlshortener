import  { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkPasswordProtection, createSession } from "../api/Url";

const RedirectHandler = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Check if the URL is password protected
        const response = await checkPasswordProtection(code);

        if (response.isProtected) {
          // Redirect to the password protection page
          navigate(`/password-protection/${code}`);
        } else {
          // Create a session and redirect to the original URL
          const sessionResponse = await createSession(code);
          window.location.href = sessionResponse.originalUrl;
        }
      } catch (error) {
        console.error("Error in redirection:", error);
      }
    };

    handleRedirect();
  }, [code, navigate]);

  return null; // This component doesn't render anything
};

export default RedirectHandler;
