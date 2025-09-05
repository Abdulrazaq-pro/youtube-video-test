import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Thumbnail Image Component
const ThumbnailImage = ({ src, alt, loaded, onLoad, className = "" }) => {
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`
          object-cover w-full h-full transition-all duration-500
          group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
        onLoad={onLoad}
      />

      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
      )}
    </>
  );
};

// Badge Component for displaying metadata
const Badge = ({
  icon: Icon,
  text,
  position = "bottom-3 right-3",
  className = "",
}) => {
  return (
    <div
      className={`absolute ${position} flex items-center gap-1 bg-black/70 text-white text-sm font-medium px-2 py-1 rounded-md backdrop-blur-sm ${className}`}
    >
      {Icon && <Icon size={12} />}
      {text}
    </div>
  );
};

// Play Button Overlay Component
const PlayButtonOverlay = ({ size = "default" }) => {
  const iconSize = size === "small" ? 16 : 24;
  const padding = size === "small" ? "p-2" : "p-4";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        // whileHover={{ scale: 1.1 }}
        className={`${padding} rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/20`}
      >
        <Play size={iconSize} className="fill-gray-900 text-gray-900 ml-0.5" />
      </motion.div>
    </div>
  );
};

export { PlayButtonOverlay, Badge, ThumbnailImage };
