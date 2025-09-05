import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function About ()  {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8">
        <BackToHome />

        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          About This Project
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This project was built as part of a{" "}
          <span className="font-semibold">Front-End Take-Home Assignment</span>{" "}
          for an EdTech + AI platform. The goal was to design a responsive web
          page that enables students to watch learning videos, add new ones, and
          manage their list.
        </p>

        {/* Requirements */}
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          📌 Requirements Implemented
        </h2>
        <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700 dark:text-gray-300">
          <li>Embedded YouTube player for video playback</li>
          <li>Form to add new videos with title, description, and URL</li>
          <li>Validation of YouTube links using YouTube oEmbed API</li>
          <li>Automatic normalization of YouTube & Shorts links</li>
          <li>Dynamic video list with name and description</li>
          <li>Delete button to remove videos from the list</li>
          <li>Centralized state management using React Context API</li>
        </ul>

        {/* Tech Stack */}
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          🛠️ Tech Stack
        </h2>
        <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700 dark:text-gray-300">
          <li>React (with Context API)</li>
          <li>Vite (fast dev environment)</li>
          <li>Tailwind CSS + shadcn/ui for UI components</li>
          <li>Framer Motion (for smooth animations)</li>
        </ul>

        {/* Thought Process */}
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          🚀 Thought Process
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          I approached the task by first fulfilling the core requirements:
          embedding a video player, creating an add-video form, and displaying a
          list of videos. To keep the app modular and scalable, I implemented
          centralized state management with the Context API.
          <br />
          <br />
          For validation, I used YouTube’s oEmbed API to ensure that only valid
          video URLs are added. I also included support for YouTube Shorts by
          converting their URLs into embeddable formats.
          <br />
          <br />
          To enhance the user experience, I applied Tailwind CSS and shadcn/ui
          for a modern interface and ensured the layout is fully responsive.
        </p>

        {/* GitHub */}
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          📂 GitHub Repository
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          You can view the full source code here:{" "}
          <a
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-medium underline"
          >
            GitHub Repository
          </a>
        </p>

        {/* Back button */}
        <BackToHome />
      </div>
    </div>
  );
};

// export default About;

// import React from 'react'

export function BackToHome() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center">
        <Button onClick={() => navigate("/")}>⬅ Back to Home</Button>
      </div>
    </div>
  );
}
