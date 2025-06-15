
import React from "react";
import { AlertTriangle } from "lucide-react";

interface DetectionOverlayProps {
  text: string;
}

const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ text }) => (
  <div className="absolute top-4 right-4 z-20 bg-yellow-500/90 text-black px-4 py-2 rounded-lg flex items-center gap-2 shadow-xl animate-bounce-in">
    <AlertTriangle className="h-5 w-5" />
    <span className="font-bold">{text}</span>
  </div>
);

export default DetectionOverlay;
