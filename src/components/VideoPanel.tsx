
import React from "react";
import DetectionOverlay from "@/components/DetectionOverlay";
import { Annotation } from "@/pages/GramaNetraDemo";

interface VideoPanelProps {
  latestDetection?: Annotation;
  annotations: Annotation[]; // user annotations only
}

const VIDEO_PLACEHOLDER = "/placeholder-drone-video.mp4";

const VideoPanel: React.FC<VideoPanelProps> = ({ latestDetection, annotations }) => (
  <div className="relative rounded-xl overflow-hidden shadow-2xl">
    {/* Video (could be replaced with an image, but MP4 is more 'live') */}
    <video 
      src={VIDEO_PLACEHOLDER}
      autoPlay
      loop
      muted
      className="w-full aspect-video object-cover"
    />
    {/* AI Detection Overlay */}
    {latestDetection && (
      <DetectionOverlay text={latestDetection.text} />
    )}
    {/* User annotation badge overlays (show last 2, stack bottom) */}
    <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
      {annotations.slice(-2).map((a, i) => (
        <span key={a.id} className="bg-blue-600/80 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in">
          {a.text}
        </span>
      ))}
    </div>
  </div>
);

export default VideoPanel;
