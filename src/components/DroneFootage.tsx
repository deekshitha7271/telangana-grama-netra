
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Play, 
  Pause, 
  Download, 
  Maximize, 
  Volume2, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  MapPin,
  Clock,
  AlertTriangle,
  Eye,
  Plane
} from "lucide-react";

const DroneFootage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [selectedFootage, setSelectedFootage] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const footageData = [
    {
      id: "DF001",
      location: "Kondapally - Water Stagnation Detection",
      timestamp: "2024-06-14 14:30:22",
      duration: "02:45",
      resolution: "4K",
      droneId: "D001",
      issuesDetected: 3,
      thumbnail: "/placeholder.svg",
      status: "analyzed",
      aiConfidence: 96
    },
    {
      id: "DF002", 
      location: "Yellareddy - Infrastructure Scan",
      timestamp: "2024-06-14 13:15:11",
      duration: "04:12",
      resolution: "4K",
      droneId: "D002",
      issuesDetected: 1,
      thumbnail: "/placeholder.svg",
      status: "processing",
      aiConfidence: 89
    },
    {
      id: "DF003",
      location: "Armoor - Road Damage Assessment",
      timestamp: "2024-06-14 12:45:33",
      duration: "03:28",
      resolution: "4K", 
      droneId: "D003",
      issuesDetected: 5,
      thumbnail: "/placeholder.svg",
      status: "analyzed",
      aiConfidence: 94
    }
  ];

  const detectedObjects = [
    { type: "Water Stagnation", confidence: 96, timestamp: "00:45", coordinates: "18.7465°N, 78.5691°E" },
    { type: "Road Crack", confidence: 89, timestamp: "01:23", coordinates: "18.7422°N, 78.5634°E" },
    { type: "Garbage Pile", confidence: 94, timestamp: "02:01", coordinates: "18.7389°N, 78.5712°E" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev < 165 ? prev + 1 : 0); // 165 seconds = 2:45
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Video Player */}
      <Card className="bg-gradient-to-br from-gray-900 to-blue-900 text-white border-0 animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-blue-400 animate-pulse" />
            AI-Enhanced Drone Footage Viewer
            <Badge className="bg-green-500 text-white animate-pulse">LIVE AI ANALYSIS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center animate-pulse">
                    <Eye className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                    <p className="text-xl font-semibold">AI Vision Processing</p>
                    <p className="text-blue-300">4K Drone Footage - {footageData[selectedFootage].location}</p>
                  </div>
                </div>
                
                {/* AI Detection Overlays */}
                <div className="absolute top-4 left-4 space-y-2">
                  {detectedObjects.map((obj, index) => (
                    <div key={index} className="bg-red-500/80 backdrop-blur-sm rounded px-2 py-1 text-xs animate-pulse">
                      <AlertTriangle className="h-3 w-3 inline mr-1" />
                      {obj.type} ({obj.confidence}%)
                    </div>
                  ))}
                </div>

                {/* Real-time Coordinates */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded px-3 py-1 text-xs">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  18.7465°N, 78.5691°E
                </div>
              </div>

              {/* Video Controls */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm">{formatTime(currentTime)} / {footageData[selectedFootage].duration}</span>
                  <Progress value={(currentTime / 165) * 100} className="flex-1" />
                  <div className="flex items-center gap-1">
                    <Volume2 className="h-4 w-4" />
                    <Progress value={volume} className="w-16" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <ZoomIn className="h-4 w-4 mr-1" />
                    Zoom In
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <ZoomOut className="h-4 w-4 mr-1" />
                    Zoom Out
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Rewind 10s
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Maximize className="h-4 w-4 mr-1" />
                    Fullscreen
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Analysis Panel */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  Real-time AI Detection
                </h3>
                <div className="space-y-3">
                  {detectedObjects.map((obj, index) => (
                    <div key={index} className="border-l-4 border-red-400 pl-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{obj.type}</span>
                        <Badge className="bg-red-500">{obj.confidence}%</Badge>
                      </div>
                      <div className="text-xs text-blue-300 mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {obj.timestamp} | {obj.coordinates}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={startAIAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Eye className="h-4 w-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Enhanced AI Analysis
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-3">Footage Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Drone ID:</span>
                    <span className="text-blue-300">{footageData[selectedFootage].droneId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="text-green-300">{footageData[selectedFootage].resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Confidence:</span>
                    <span className="text-yellow-300">{footageData[selectedFootage].aiConfidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issues Found:</span>
                    <span className="text-red-300">{footageData[selectedFootage].issuesDetected}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footage Library */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-600" />
            Drone Footage Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {footageData.map((footage, index) => (
              <div 
                key={footage.id}
                className={`cursor-pointer border-2 rounded-lg p-4 transition-all duration-300 hover:shadow-lg ${
                  selectedFootage === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedFootage(index)}
              >
                <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{footage.location}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{footage.duration}</span>
                    <Badge variant={footage.status === 'analyzed' ? 'default' : 'secondary'}>
                      {footage.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {footage.timestamp}
                  </div>
                  {footage.issuesDetected > 0 && (
                    <div className="flex items-center gap-1 text-xs text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      {footage.issuesDetected} issues detected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DroneFootage;
