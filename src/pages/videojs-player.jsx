import React, { useRef, useState } from "react";
import VideoJS from "./videojs";

const VideoJSPlayer = () => {
  const playerRef = useRef(null);
  const [currentSource, setCurrentSource] = useState("hls");

  // Different video source configurations
  const videoSources = {
    // Local MP4 file
    local: {
      controls: true,
      responsive: true,
      fluid: true,
      autoplay: false,
      muted: true,
      playbackRates: [0.25, 0.5, 1, 1.5, 4],
      sources: [
        {
          src: "/videos/test.mp4", // Fixed typo: "vidoes" → "videos"
          type: "video/mp4",
        },
      ],
      poster: "/videos/thumbnail.jpg", // Local poster
      tracks: [
        {
          kind: "chapters",
          src: "/chapters.vtt",
          srclang: "en",
          label: "Chapters",
          default: true,
        },
      ],
    },

    // HLS Stream (ImageKit or local HLS)
    hls: {
      controls: true,
      responsive: true,
      fluid: true,
      autoplay: false,
      muted: true,
      playbackRates: [0.25, 0.5, 1, 1.5, 2],
      sources: [
        {
          src: "https://ik.imagekit.io/roadsidecoder/yt/example.mp4/ik-master.m3u8?tr=sr-240_360_480_720_1080",
          type: "application/x-mpegURL",
        },
      ],
      poster:
        "https://ik.imagekit.io/roadsidecoder/yt/example.mp4/ik-thumbnail.jpg?tr=w-1200,h-680,so-5",
      tracks: [
        {
          kind: "chapters",
          src: "/chapters.vtt",
          srclang: "en",
          label: "Chapters",
          default: true,
        },
      ],
    },

    // Local HLS
    localHls: {
      controls: true,
      responsive: true,
      fluid: true,
      autoplay: false,
      muted: true,
      playbackRates: [0.25, 0.5, 1, 1.5, 2],
      sources: [
        {
          src: "/videos/ik-master.m3u8",
          type: "application/x-mpegURL",
        },
      ],
      poster: "/videos/thumbnail.jpg",
      tracks: [
        {
          kind: "chapters",
          src: "/chapters.vtt",
          srclang: "en",
          label: "Chapters",
          default: true,
        },
      ],
    },

    // YouTube - Note: Direct YouTube URLs won't work with Video.js
    // You need to extract the direct video URL or use YouTube's embed API
    youtube: {
      controls: true,
      responsive: true,
      fluid: true,
      autoplay: false,
      muted: true,
      playbackRates: [0.25, 0.5, 1, 1.5, 2],
      sources: [
        {
          // This won't work directly - YouTube blocks direct access
          // You'd need to use a service like youtube-dl or similar
          src: "https://www.youtube.com/watch?v=9v3gPbdcwwo",
          type: "video/mp4",
        },
      ],
      poster: "https://img.youtube.com/vi/9v3gPbdcwwo/maxresdefault.jpg",
    },
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Log when player events occur
    player.on("waiting", () => {
      console.log("Player is waiting");
    });

    player.on("loadedmetadata", () => {
      console.log("Video metadata loaded");
    });

    player.on("dispose", () => {
      console.log("Player will dispose");
    });

    player.on("error", (error) => {
      console.error("Player error:", error);
    });
  };

  const switchSource = (sourceType) => {
    setCurrentSource(sourceType);
    // Dispose current player and reinitialize with new source
    if (playerRef.current) {
      playerRef.current.dispose();
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>Video.js Player with Multiple Source Support</h2>
      
      {/* Source Selection Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => switchSource("local")}
          style={{
            margin: "5px",
            padding: "8px 16px",
            backgroundColor: currentSource === "local" ? "#007bff" : "#f8f9fa",
            color: currentSource === "local" ? "white" : "black",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Local MP4
        </button>
        
        <button
          onClick={() => switchSource("hls")}
          style={{
            margin: "5px",
            padding: "8px 16px",
            backgroundColor: currentSource === "hls" ? "#007bff" : "#f8f9fa",
            color: currentSource === "hls" ? "white" : "black",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ImageKit HLS
        </button>
        
        <button
          onClick={() => switchSource("localHls")}
          style={{
            margin: "5px",
            padding: "8px 16px",
            backgroundColor: currentSource === "localHls" ? "#007bff" : "#f8f9fa",
            color: currentSource === "localHls" ? "white" : "black",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Local HLS
        </button>
      </div>

      <div style={{ maxWidth: "800px" }}>
        <VideoJS 
          key={currentSource} // Force re-render when source changes
          options={videoSources[currentSource]} 
          onReady={handlePlayerReady} 
        />
      </div>

      {/* YouTube Embed Alternative */}
      <div style={{ marginTop: "40px" }}>
        <h3>YouTube Alternative (Embed)</h3>
        <div style={{ maxWidth: "800px", aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/9v3gPbdcwwo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          />
        </div>
      </div>

      {/* Troubleshooting Info */}
      <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h4>Troubleshooting Notes:</h4>
        <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
          <li><strong>Local MP4:</strong> Ensure "/videos/test.mp4" exists and server serves static files</li>
          <li><strong>Local HLS:</strong> Check that all .m3u8 and .ts files are present and server has correct MIME types</li>
          <li><strong>YouTube Direct:</strong> Won't work due to CORS - use iframe embed instead</li>
          <li><strong>ImageKit HLS:</strong> Should work as it's properly configured for streaming</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoJSPlayer;