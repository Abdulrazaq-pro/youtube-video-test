import React, { useState, createContext, useContext, useEffect } from "react";

// Assuming you have VideoContext created somewhere
const VideoContext = createContext();

// Helper functions
const validateYouTubeVideo = async (url) => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        url
      )}&format=json`
    );
    return response.ok;
  } catch (err) {
    return false;
  }
};

const normalizeYouTubeUrl = (url) => {
  // Extract video ID from various YouTube URL formats
  try {
    const urlObj = new URL(url);

    // Handle youtu.be short URLs
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1); // Remove leading slash, return just the ID
    }

    // Handle youtube.com URLs
    if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com"
    ) {
      // Handle /watch?v= format
      if (urlObj.pathname === "/watch" && urlObj.searchParams.has("v")) {
        return urlObj.searchParams.get("v");
      }

      // Handle /shorts/ format
      if (urlObj.pathname.startsWith("/shorts/")) {
        return urlObj.pathname.split("/shorts/")[1];
      }

      // Handle /embed/ format
      if (urlObj.pathname.startsWith("/embed/")) {
        return urlObj.pathname.split("/embed/")[1];
      }

      // Handle /v/ format (old YouTube URLs)
      if (urlObj.pathname.startsWith("/v/")) {
        return urlObj.pathname.split("/v/")[1];
      }
    }

    // If no ID found, return original URL
    return url;
  } catch (err) {
    // If URL parsing fails, return original URL
    return url;
  }
};

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVideos([
      {
        id: Date.now(),
        name: "Music Video",
        description: "First video from YouTube",
        url: normalizeYouTubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
      },
    ]);
  }, []);

  const addVideo = async (form) => {
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const isValid = await validateYouTubeVideo(form.url);
      setLoading(false);

      if (!isValid) {
        setError("Invalid or non-existent YouTube URL.");
        return false;
      }

      setVideos((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name,
          description: form.description,
          url: normalizeYouTubeUrl(form.url),
        },
      ]);
      return true;
    } catch (err) {
      setLoading(false);
      setError("An error occurred while validating the video.");
      return false;
    }
  };

  const deleteVideo = (id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <VideoContext.Provider
      value={{ videos, addVideo, deleteVideo, error, loading }}
    >
      {children}
    </VideoContext.Provider>
  );
}

// Custom hook to use the context
export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
