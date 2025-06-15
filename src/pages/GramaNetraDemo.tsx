
import React, { useState } from "react";
import VideoPanel from "@/components/VideoPanel";
import MapPanel from "@/components/MapPanel";

// Types
export interface Annotation {
  id: string;
  text: string;
  coords: { lat: number; lng: number };
  type: "user" | "ai";
}

// Demo area GPS center
const MOCK_CENTER = { lat: 18.7465, lng: 78.5691 };

// Example detected objects — for realistic rotation
const AI_LABELS = [
  "Water Body Detected",
  "Person Detected",
  "Trash Identified",
  "Open Drain Detected",
  "Water Stagnation",
  "Road Crack Found",
  "Vehicle Detected",
  "Construction Activity",
];

// Random coords generator near the center
function randomNearbyCoords(center: { lat: number; lng: number }, maxDelta = 0.004) {
  return {
    lat: center.lat + (Math.random() - 0.5) * maxDelta,
    lng: center.lng + (Math.random() - 0.5) * maxDelta,
  };
}

const GramaNetraDemo: React.FC = () => {
  // Main annotation state
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [mapboxToken, setMapboxToken] = useState("");

  // Simulate an AI detection every 9 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      const labelIdx = Math.floor(Math.random() * AI_LABELS.length);
      setAnnotations((prev) => [
        ...prev,
        {
          id: "ai-" + Date.now(),
          text: "Detected: " + AI_LABELS[labelIdx],
          coords: randomNearbyCoords(MOCK_CENTER, 0.002),
          type: "ai",
        },
      ]);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Handle user annotation submission
  const handleSubmitAnnotation = (text: string) => {
    setAnnotations((prev) => [
      ...prev,
      {
        id: "user-" + Date.now(),
        text,
        coords: randomNearbyCoords(MOCK_CENTER, 0.0012), // Tighter cluster for user points
        type: "user",
      },
    ]);
  };

  // The latest AI detection for overlay
  const latestDetection = [...annotations].reverse().find((a) => a.type === "ai");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-200 dark:from-black dark:to-blue-950 flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-3 bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          GramaNetra AI Demo
        </div>
        <div className="text-xs text-gray-500">All data is simulated (local only)</div>
      </header>
      {/* Main Split Panel */}
      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 transition-all">
        {/* Left: Video + Observation Entry */}
        <div className="md:w-1/2 w-full flex flex-col items-stretch justify-stretch p-2 md:p-6 gap-4">
          <VideoPanel 
            latestDetection={latestDetection} 
            annotations={annotations.filter(a => a.type === "user")}
          />
        </div>
        {/* Right: Map Panel */}
        <div className="md:w-1/2 w-full flex flex-col justify-stretch items-stretch p-2 md:p-6 gap-4">
          <MapPanel 
            annotations={annotations}
            mapboxToken={mapboxToken}
            setMapboxToken={setMapboxToken}
            center={MOCK_CENTER}
          />
        </div>
      </div>
      {/* Input always at bottom on mobile, under video on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:static px-2 pb-3 pt-2 md:pb-0 bg-gradient-to-t from-white/95 dark:from-black/95 via-white/80 dark:via-black/80 to-transparent">
        <div className="max-w-lg mx-auto">
          <AnnotationInput onSubmit={handleSubmitAnnotation} />
        </div>
      </div>
    </div>
  );
};

import AnnotationInput from "@/components/AnnotationInput";
export default GramaNetraDemo;
