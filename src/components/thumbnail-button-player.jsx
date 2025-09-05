import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Clock, Eye } from 'lucide-react'

const DEFAULT_VIDEO_FALLBACK_URL = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYqvMy4kaWD2STgaJv9iAfGNzF5E06KYRULuoj'
const DEFAULT_VIDEO_THUMBNAIL = 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'

const getYouTubeThumbnail = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
const getYouTubeEmbedUrl = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`

export default function ThumbnailButton ({
  videoUrl,
  youtubeId,
  thumbnailUrl,
  title = 'Play Video',
  description,
  duration,
  views,
  className = ''
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonRect, setButtonRect] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const buttonRef = useRef(null)

  const isYouTube = !!youtubeId

  const finalThumbnail = thumbnailUrl || (isYouTube ? getYouTubeThumbnail(youtubeId) : DEFAULT_VIDEO_THUMBNAIL)

  const finalVideoUrl = isYouTube && youtubeId ? getYouTubeEmbedUrl(youtubeId) : videoUrl || DEFAULT_VIDEO_FALLBACK_URL

  const handleOpenModal = () => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect())
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => setIsModalOpen(false)

  const getTransformOrigin = () => {
    if (!buttonRect) return 'center center'

    const centerX = buttonRect.left + buttonRect.width / 2
    const centerY = buttonRect.top + buttonRect.height / 2

    return `${centerX}px ${centerY}px`
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseModal()
    }
    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isModalOpen])

  return (
    <>
      <motion.button
        ref={buttonRef}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleOpenModal}
        className={`
          relative w-full overflow-hidden rounded-2xl bg-white dark:bg-gray-900 
          shadow-lg hover:shadow-2xl transition-all duration-300
          group focus:outline-none focus:ring-4 focus:ring-blue-500/20
          border border-gray-200 dark:border-gray-700 hover:cursor-pointer
          ${className}
        `}
        aria-label={title}
      >
        {/* Mobile Layout (Stacked) */}
        <div className="block md:hidden">
          {/* Thumbnail Container */}
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={finalThumbnail}
              alt="Video thumbnail"
              className={`
                object-cover w-full h-full transition-all duration-500
                group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
            )}

            {/* Gradient overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /> */}

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-white/20"
              >
                <Play
                  size={24}
                  className="fill-gray-900 text-gray-900 ml-1"
                />
              </motion.div>
            </div>

            {/* Duration badge */}
            {duration && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white text-sm font-medium px-2 py-1 rounded-md backdrop-blur-sm">
                <Clock size={12} />
                {duration}
              </div>
            )}

            {/* Views badge */}
            {views && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white text-sm font-medium px-2 py-1 rounded-md backdrop-blur-sm">
                <Eye size={12} />
                {views}
              </div>
            )}

            {/* YouTube Badge */}
            {isYouTube && (
              <div className="absolute top-3 right-3">
                <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                  YouTube
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 text-left">
              {title}
            </h3>
            
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 text-left">
                {description}
              </p>
            )}

            {/* Action hint */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Click to play
              </span>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <Play size={14} className="text-blue-500" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (Horizontal) */}
        <div className="hidden md:flex items-center p-4 gap-4">
          {/* Thumbnail Container */}
          <div className="relative w-48 h-28 flex-shrink-0 overflow-hidden rounded-xl">
            <img
              src={finalThumbnail}
              alt="Video thumbnail"
              className={`
                object-cover w-full h-full transition-all duration-500
                group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse rounded-xl" />
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/20"
              >
                <Play
                  size={16}
                  className="fill-gray-900 text-gray-900 ml-0.5"
                />
              </motion.div>
            </div>

            {/* Duration badge */}
            {duration && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded backdrop-blur-sm">
                <Clock size={10} />
                {duration}
              </div>
            )}

            {/* YouTube Badge */}
            {/* {isYouTube && (
              <div className="absolute top-2 right-2">
                <div className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded shadow-lg">
                  YT
                </div>
              </div>
            )} */}
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 text-left">
              {title}
            </h3>
            
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 text-left mb-3">
                {description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {views && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Eye size={14} />
                    {views}
                  </div>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  Click to play
                </span>
              </div>
              
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <Play size={16} className="text-blue-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Video Modal"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.1, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.1, rotateX: -90 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                scale: { duration: 0.4 },
                rotateX: { duration: 0.3 }
              }}
              className="relative w-full max-w-6xl aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-600"
              style={{ transformOrigin: getTransformOrigin() }}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleCloseModal}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm transition-all duration-200 hover:cursor-pointer"
                aria-label="Close video"
              >
                <X size={24} />
              </motion.button>

              {/* Video Title Overlay */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6 z-10 max-w-md"
              >
                <h3 className="text-white font-semibold text-lg mb-1 drop-shadow-lg">
                  {title}
                </h3>
                {/* {isYouTube && (
                  <div className="inline-flex items-center gap-1 bg-red-600/90 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                    YouTube Video
                  </div>
                )} */}
              </motion.div>

              {/* Video Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full h-full"
              >
                {isYouTube ? (
                  <iframe
                    src={finalVideoUrl}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={title}
                  />
                ) : (
                  <video
                    src={finalVideoUrl}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}