
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Download, 
  Maximize, 
  Play, 
  Pause,
  Volume2,
  VolumeX 
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
      // In production, set the HLS stream URL here
      // videoRef.current.src = 'your-hls-stream-url';
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
    <Card className={`overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 ${className}`}>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-black">
          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge 
              variant={isOnline ? "default" : "destructive"}
              className={`${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'} text-white`}
            >
              {isOnline ? '🔴 LIVE' : '⚫ OFFLINE'}
            </Badge>
          </div>

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            onError={() => setHasError(true)}
          >
            {/* Fallback for demo - in production, use HLS stream */}
            <source src="/placeholder-drone-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay for demo when no video */}
          {(!isOnline || hasError) && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">
                  {!isOnline ? 'Drone Offline' : 'Connecting to Live Feed...'}
                </p>
                <p className="text-sm opacity-75 mt-2">
                  HLS stream will appear here in production
                </p>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlay}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMute}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={takeScreenshot}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Camera className="h-4 w-4 mr-1" />
                Screenshot
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveVideoFeed;
