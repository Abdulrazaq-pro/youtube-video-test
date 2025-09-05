

import { useVideoContext } from "./context/DataContext";
import { Button } from "@/components/ui/button";
import AddVideoDialog from "./components/Modal";
import ThumbnailButton from "./components/thumbnail-button-player";

const Demo = () => {
  const { videos, addVideo, deleteVideo, error, loading } = useVideoContext();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="flex flex-col gap-6 p-8 max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          Auto YouTube Thumbnail Demo
        </h1>

        {/* Add Video Dialog */}
        <div className="flex justify-center mb-4">
          <AddVideoDialog
            onAddVideo={addVideo}
            error={error}
            loading={loading}
            triggerButton="Add New Video"
          />
        </div>

        <div className="space-y-2.5">
          {/* Dynamic Videos from Context */}
          {videos.map((video) => (
            <div key={video.id} className="relative w-full">
              <ThumbnailButton
                youtubeId={video.url}
                title={video.name}
                description={video.description}
              />
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

        {/* <iframe
          src="https://www.youtube.com/embed/RVSMBpySCek?autoplay=1&rel=0"
          className="w-full h-64"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="bhjdcd"
        /> */}

        {/* <Test /> */}

        {/* <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          <p>YouTube thumbnails are automatically extracted!</p>
          <p>
            Just provide the{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
              youtubeId
            </code>{" "}
            prop.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Demo;
