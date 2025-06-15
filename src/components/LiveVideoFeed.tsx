
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Pause, Play, Volume2, VolumeX, Maximize2, AlertTriangle } from 'lucide-react';

interface LiveVideoFeedProps {
  isOnline: boolean;
  className?: string;
}

const MOCK_VIDEO_URL = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({ isOnline, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state on mount or status change
    setHasError(false);
  }, [isOnline]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setHasError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const takeScreenshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const link = document.createElement('a');
        link.download = `drone-screenshot-${new Date().getTime()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Card className={`overflow-hidden ${className} bg-gradient-to-br from-[#171f33] via-[#242d42] to-[#232f52] shadow-2xl rounded-3xl border-0`}>
      <CardContent className="p-0">
        <div className="relative aspect-video flex flex-col justify-between rounded-3xl overflow-hidden">
          {/* Detected overlay */}
          <div className="absolute top-6 left-6 z-30 animate-fade-in">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/80 shadow-lg text-white text-base font-semibold select-none">
              <span className="bg-green-500 rounded-md flex items-center justify-center w-6 h-6 mr-1">
                <AlertTriangle className="w-4 h-4 text-white" />
              </span>
              Detected: <span className="font-bold">Water Body</span> <span className="text-xs text-gray-200 ml-2">(18.7465, 78.5691)</span>
            </div>
          </div>
          
          {/* Live badge */}
          <div className="absolute top-6 right-6 z-30">
            <Badge 
              variant={isOnline ? "default" : "destructive"}
              className={`text-white text-base px-4 py-1 rounded-xl shadow ${
                isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}
            >
              {isOnline ? 'LIVE' : 'OFFLINE'}
            </Badge>
          </div>

          {/* VIDEO Layer */}
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-3xl bg-gradient-to-br from-[#202333] to-[#212b44] transition-opacity duration-300"
              autoPlay
              muted={isMuted}
              loop
              controls={false}
              onError={() => setHasError(true)}
              style={{ display: hasError ? "none" : "block" }}
              // Note: Always show the video unless it fails to load
            >
              <source src={MOCK_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* DELUXE fallback overlay if mock video fails */}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#262d44] to-[#232c46] animate-fade-in">
                <Camera className="w-28 h-28 opacity-30 mb-2" />
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-1 animate-pulse tracking-tight">
                  Cannot load video feed
                </h3>
                <p className="mt-1 text-lg text-blue-200 font-medium">
                  Please check the video URL/<span className="underline">network</span>.
                </p>
              </div>
            )}
          </div>

          {/* Controls Overlay Bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex flex-row items-center justify-between bg-black/60 dark:bg-black/50 backdrop-blur-xl rounded-b-3xl px-7 py-5 shadow-2xl pointer-events-auto">
              {/* Play/Pause and Mute/Unmute */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={togglePlay}
                  className="bg-[#232d4a]/70 border-0 text-white hover:bg-blue-900/80 shadow flex items-center justify-center"
                  aria-label="Play/Pause"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                  className="bg-[#232d4a]/70 border-0 text-white hover:bg-blue-900/80 shadow flex items-center justify-center"
                  aria-label="Mute/Unmute"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
              
              {/* Screenshot and Fullscreen */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={takeScreenshot}
                  className="bg-[#232d4a]/70 border-0 text-white hover:bg-blue-900/80 font-medium px-4 shadow flex items-center gap-2"
                  aria-label="Screenshot"
                >
                  <Camera className="w-4 h-4 mr-1" />
                  Screenshot
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="bg-[#232d4a]/70 border-0 text-white hover:bg-blue-900/80 shadow flex items-center justify-center"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveVideoFeed;
