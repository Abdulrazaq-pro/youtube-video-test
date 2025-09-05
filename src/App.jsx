import { useVideoContext } from "./context/DataContext";
import { Button } from "@/components/ui/button";
import AddVideoDialog from "./components/Modal";
import ThumbnailButton from "./components/thumbnail-button-player";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const { videos, addVideo, deleteVideo, error, loading } = useVideoContext();

  return (
    <div className="min-h-screen w-screen flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="flex flex-col gap-8 w-full">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-start justify-between">
              {/* Left logo/brand area */}
              <div className="w-20 flex justify-start">
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-800 font-bold text-sm">YT</span>
                </div>
              </div>

              {/* Center content */}
              <div className="flex-1 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                  YouTube Studio
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Create, manage, and preview your YouTube video with ease
                </p>
              </div>

              {/* Right button */}
              <div className="w-20 flex justify-end">
                <Link to="/about" className="">
                  <Button
                    variant="outline"
                    size="default"
                    className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                  >
                    About
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden">
              {/* Mobile header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-600 font-bold text-sm">YT</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                >
                  About
                </Button>
              </div>

              {/* Mobile centered content */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                  YouTube Studio
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Create, manage, and preview your YouTube video with ease
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-8 bg-neutral-600 rounded-full"></div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Videos
              </span>
            </div>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
              {videos.length} {videos.length === 1 ? "video" : "videos"}
            </span>
          </div>

          <AddVideoDialog
            onAddVideo={addVideo}
            error={error}
            loading={loading}
            triggerButton="Add New Video"
          />
        </div>

        {/* Videos List */}
        {videos.length > 0 ? (
          <div className="space-y-6 grid lg:grid-cols-2 lg:gap-2">
            {videos.map((video) => (
              <div key={video.id} className="relative w-full">
                             {" "}
                <ThumbnailButton
                  youtubeId={video.url}
                  title={video.name}
                  description={video.description}
                />
                             {" "}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-75 hover:opacity-100"
                  onClick={() => deleteVideo(video.id)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        ) : (
          /* Enhanced Empty State */
          <div className="text-center py-20">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl  border border-gray-200 dark:border-gray-700 p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No videos yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Get started by adding your first YouTube video to create and
                preview amazing thumbnails.
              </p>
              <AddVideoDialog
                onAddVideo={addVideo}
                error={error}
                loading={loading}
                triggerButton="Add Your First Video"
              />
            </div>
          </div>
        )}

        {/* Enhanced Error State */}
        {error && (
          <div className="fixed bottom-6 right-6 bg-red-50/95 dark:bg-red-900/50 backdrop-blur-sm border border-red-200 dark:border-red-800 rounded-2xl p-4 shadow-2xl max-w-md animate-slideInRight">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                {error}
              </p>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
