
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Drone, 
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
        {drones.map((drone) => (
          <Card key={drone.id} className="bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Drone className={`h-5 w-5 ${drone.status === 'active' ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="font-semibold">{drone.id}</span>
                </div>
                <Badge variant={drone.status === 'active' ? 'default' : 'secondary'}>
                  {drone.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  <span>{drone.battery}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4" />
                  <span>{drone.signal}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs text-gray-600">{drone.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Village Scanning Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Village Monitoring Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {villages.map((village, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{village.name}</h4>
                      <Badge variant={village.status === 'completed' ? 'default' : 'secondary'}>
                        {village.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Population: {village.population.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getStatusColor(village.status)}`}>
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
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Live Issue Detection
              <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detectedIssues.map((issue) => (
                <div key={issue.id} className="border-l-4 border-orange-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{issue.type}</h4>
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)}`}></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{issue.location}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{issue.detected}</span>
                    <span>{issue.coordinates}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              <Camera className="h-4 w-4 mr-2" />
              View Drone Footage
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Scanning Display */}
      <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
        <CardContent className="p-6">
          <div className="text-center">
            <Drone className="h-12 w-12 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold mb-2">Currently Scanning: {scanningVillage}</h3>
            <p className="text-blue-100">AI-powered anomaly detection in progress...</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>YOLOv8 Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>Computer Vision ON</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DroneMonitoring;
