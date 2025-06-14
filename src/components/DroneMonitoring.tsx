
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Camera,
  Battery,
  Signal
} from "lucide-react";

const DroneMonitoring = () => {
  const [activeDrones, setActiveDrones] = useState(8);
  const [scanningVillage, setScanningVillage] = useState("Kondapally");
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const villages = [
    { name: "Kondapally", status: "scanning", issues: 3, population: 2400 },
    { name: "Yellareddy", status: "completed", issues: 1, population: 1800 },
    { name: "Armoor", status: "queued", issues: 0, population: 3200 },
    { name: "Banswada", status: "scanning", issues: 5, population: 2100 },
  ];

  const detectedIssues = [
    {
      id: 1,
      type: "Water Stagnation",
      location: "Near Primary School",
      severity: "high",
      detected: "2 mins ago",
      coordinates: "18.7465°N, 78.5691°E"
    },
    {
      id: 2,
      type: "Road Damage",
      location: "Main Street Junction",
      severity: "medium",
      detected: "5 mins ago",
      coordinates: "18.7422°N, 78.5634°E"
    },
    {
      id: 3,
      type: "Garbage Accumulation",
      location: "Market Area",
      severity: "low",
      detected: "8 mins ago",
      coordinates: "18.7389°N, 78.5712°E"
    }
  ];

  const drones = [
    { id: "D001", battery: 85, signal: 95, status: "active", location: "Kondapally Sector A" },
    { id: "D002", battery: 72, signal: 88, status: "active", location: "Kondapally Sector B" },
    { id: "D003", battery: 91, signal: 92, status: "returning", location: "Yellareddy Complete" },
    { id: "D004", battery: 45, signal: 78, status: "charging", location: "Base Station" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScanningVillage(villages[Math.floor(Math.random() * villages.length)].name);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500";
      case "medium": return "bg-orange-500";
      case "low": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scanning": return "text-blue-600";
      case "completed": return "text-green-600";
      case "queued": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Drone Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {drones.map((drone, index) => (
          <Card 
            key={drone.id} 
            className={`bg-white/80 backdrop-blur-sm border-0 transform hover:scale-105 hover:shadow-xl transition-all duration-500 animate-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-4 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Plane className={`h-5 w-5 ${drone.status === 'active' ? 'text-green-600 animate-pulse' : 'text-gray-400'} group-hover:animate-bounce transition-all duration-300`} />
                  <span className="font-semibold group-hover:text-blue-600 transition-colors duration-300">{drone.id}</span>
                </div>
                <Badge 
                  variant={drone.status === 'active' ? 'default' : 'secondary'}
                  className={`${drone.status === 'active' ? 'animate-pulse' : ''} transition-all duration-300`}
                >
                  {drone.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 group-hover:text-green-600 transition-colors duration-300">
                  <Battery className="h-4 w-4" />
                  <span>{drone.battery}%</span>
                  <div className={`ml-auto w-12 h-2 bg-gray-200 rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full ${drone.battery > 60 ? 'bg-green-500' : drone.battery > 30 ? 'bg-orange-500' : 'bg-red-500'} transition-all duration-1000 animate-progress`}
                      style={{ width: `${drone.battery}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
                  <Signal className="h-4 w-4" />
                  <span>{drone.signal}%</span>
                  <div className="ml-auto flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 h-3 rounded ${i < (drone.signal / 25) ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 group-hover:text-purple-600 transition-colors duration-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors duration-300">{drone.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Village Scanning Status */}
        <Card className={`bg-white/80 backdrop-blur-sm border-0 animate-slide-up`} style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600 animate-pulse" />
              Village Monitoring Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {villages.map((village, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 transform hover:scale-105 hover:shadow-lg transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="group">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold group-hover:text-blue-600 transition-colors duration-300">{village.name}</h4>
                      <Badge 
                        variant={village.status === 'completed' ? 'default' : 'secondary'}
                        className={`${village.status === 'scanning' ? 'animate-pulse' : ''} transition-all duration-300`}
                      >
                        {village.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      Population: {village.population.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right group">
                    <div className={`text-lg font-bold ${getStatusColor(village.status)} group-hover:scale-110 transition-all duration-300`}>
                      {village.issues}
                    </div>
                    <div className="text-xs text-gray-500">issues found</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Issue Detection */}
        <Card className={`bg-white/80 backdrop-blur-sm border-0 animate-slide-up`} style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600 animate-pulse" />
              Live Issue Detection
              <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detectedIssues.map((issue, index) => (
                <div 
                  key={issue.id} 
                  className={`border-l-4 border-orange-500 pl-4 py-2 hover:bg-orange-50 hover:border-l-8 transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between group">
                    <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{issue.type}</h4>
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)} animate-pulse`}></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1 group-hover:text-gray-800 transition-colors duration-300">{issue.location}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="group-hover:text-orange-500 transition-colors duration-300">{issue.detected}</span>
                    <span className="font-mono group-hover:text-blue-500 transition-colors duration-300">{issue.coordinates}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-glow">
              <Camera className="h-4 w-4 mr-2 animate-pulse" />
              View Drone Footage
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Scanning Display */}
      <Card className={`bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 animate-gradient animate-slide-up`} style={{ animationDelay: '0.6s' }}>
        <CardContent className="p-6">
          <div className="text-center">
            <Plane className="h-12 w-12 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold mb-2 animate-pulse">Currently Scanning: {scanningVillage}</h3>
            <p className="text-blue-100 animate-fade-in">AI-powered anomaly detection in progress...</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="flex items-center gap-2 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <CheckCircle className="h-5 w-5 animate-pulse" />
                <span>YOLOv8 Active</span>
              </div>
              <div className="flex items-center gap-2 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <Eye className="h-5 w-5 animate-pulse" />
                <span>Computer Vision ON</span>
              </div>
            </div>
            
            {/* Scanning Progress Indicator */}
            <div className="mt-6 w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-white animate-progress" style={{ width: '67%' }}></div>
            </div>
            <p className="text-xs text-blue-100 mt-2">Scanning Progress: 67% Complete</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DroneMonitoring;
