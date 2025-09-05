export const normalizeYouTubeUrl = (url) => {
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

// import React from "react";
const Test = () => {
  return (
    <div>
      Test for youtube id picker <br />
      {normalizeYouTubeUrl("https://www.youtube.com/watch?v=0460923300")}
    </div>
  );
};

export default Test;
