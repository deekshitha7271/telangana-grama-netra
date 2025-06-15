
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  // Lucide icon selection limited per system context
} from 'lucide-react';

interface LiveVideoFeedProps {
  isOnline: boolean;
  className?: string;
}

const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({ isOnline, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current && isOnline) {
      setHasError(false);
    }
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
    <Card className={`overflow-hidden ${className} bg-gradient-to-br from-[#161c29] via-[#2e2b4a] to-[#2b3660] shadow-2xl rounded-3xl border-0`}>
      <CardContent className="p-0">
        <div className="relative aspect-video flex flex-col justify-between rounded-3xl overflow-hidden">
          {/* Status Badge */}
          <div className="absolute top-6 left-6 z-10">
            <Badge 
              variant={isOnline ? "default" : "destructive"}
              className={`${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'} text-white text-base px-4 py-1 rounded-xl shadow-lg`}
            >
              {isOnline ? '🟢 LIVE' : '🔴 OFFLINE'}
            </Badge>
          </div>

          {/* Video or Fallback */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-3xl"
            autoPlay
            muted={isMuted}
            loop
            onError={() => setHasError(true)}
            style={{ display: isOnline && !hasError ? "block" : "none" }}
          >
            <source src="/placeholder-drone-video.mp4" type="video/mp4" />
          </video>

          {/* Beautiful fallback overlay, matches your screenshot closely */}
          {(!isOnline || hasError) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#23202c] to-[#223868]">
              <div className="flex flex-col items-center justify-center">
                {/* Camera icon fallback - using emoji here due to icon selection limits */}
                <span style={{ fontSize: 84, opacity: 0.35 }} role="img" aria-label="camera">📷</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-4 animate-pulse">
                  Connecting to Live Feed...
                </h3>
                <p className="mt-2 text-base text-gray-400 font-medium">
                  HLS stream will appear here in production
                </p>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none">
            <div className="flex flex-row items-center justify-between bg-black/40 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl max-w-full pointer-events-auto">
              {/* Start/Stop and Mute buttons */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={togglePlay}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow"
                  aria-label="Play/Pause"
                >
                  {/* Play or Pause icon as emoji due to icon limit */}
                  <span>{isPlaying ? '⏸' : '▶️'}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow"
                  aria-label="Mute/Unmute"
                >
                  {/* Speaker icon as emoji */}
                  <span>{isMuted ? '🔇' : '🔈'}</span>
                </Button>
              </div>

              {/* Screenshot and Fullscreen buttons */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={takeScreenshot}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-medium px-4 shadow"
                  aria-label="Screenshot"
                >
                  <span role="img" aria-label="camera" className="mr-2">📷</span>
                  Screenshot
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow"
                  aria-label="Fullscreen"
                >
                  {/* Fullscreen icon as emoji */}
                  <span>⛶</span>
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


