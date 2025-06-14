import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Languages, 
  MapPin, 
  Clock, 
  User,
  Zap,
  MessageSquare
} from "lucide-react";
import AllComplaints from "./AllComplaints";

const VoiceComplaint = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Telugu");
  const [loaded, setLoaded] = useState(false);
  const [showAllComplaints, setShowAllComplaints] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const recentComplaints = [
    {
      id: "VC001",
      citizen: "Ramesh Goud",
      village: "Kondapally",
      issue: "Water supply irregular for 3 days",
      status: "processing",
      time: "2 mins ago",
      language: "Telugu",
      category: "Water Supply"
    },
    {
      id: "VC002", 
      citizen: "Lakshmi Devi",
      village: "Yellareddy",
      issue: "Street lights not working near temple",
      status: "assigned",
      time: "8 mins ago",
      language: "Telugu",
      category: "Infrastructure"
    },
    {
      id: "VC003",
      citizen: "Venkat Rao",
      village: "Armoor",
      issue: "Garbage not collected for a week",
      status: "resolved",
      time: "15 mins ago",
      language: "Hindi",
      category: "Sanitation"
    }
  ];

  const voiceBooths = [
    { id: "VB001", location: "Kondapally Market", status: "active", battery: 92, usage: "High" },
    { id: "VB002", location: "Yellareddy Temple", status: "active", battery: 78, usage: "Medium" },
    { id: "VB003", location: "Armoor Bus Stand", status: "maintenance", battery: 45, usage: "Low" },
    { id: "VB004", location: "Banswada School", status: "active", battery: 88, usage: "High" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "bg-blue-500";
      case "assigned": return "bg-orange-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getBoothStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600";
      case "maintenance": return "text-orange-600";
      case "offline": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  if (showAllComplaints) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowAllComplaints(false)}
            className="hover:scale-105 transition-transform duration-300"
          >
            ← Back to Voice System
          </Button>
          <h2 className="text-2xl font-bold">Complete Complaints Management</h2>
        </div>
        <AllComplaints />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Voice Recording Interface */}
      <Card className={`bg-gradient-to-br from-orange-50 to-blue-50 border-0 animate-slide-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Languages className="h-6 w-6 text-orange-600 animate-pulse" />
            Mana Mitram - Voice Complaint System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Button
                size="lg"
                className={`w-32 h-32 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-orange-500 hover:bg-orange-600'
                } text-white shadow-2xl transform hover:scale-110 transition-all duration-500 animate-glow`}
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? (
                  <MicOff className="h-12 w-12 animate-bounce" />
                ) : (
                  <Mic className="h-12 w-12" />
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-xl font-semibold text-gray-800 transition-all duration-500 ${isRecording ? 'animate-pulse' : ''}`}>
                {isRecording ? "Recording..." : "Tap to Start Recording"}
              </h3>
              <p className="text-gray-600 animate-fade-in">
                Speak in Telugu, Hindi, or English - AI will understand and help!
              </p>
            </div>

            {isRecording && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-2">
                  <Volume2 className="h-5 w-5 text-orange-600 animate-pulse" />
                  <Progress value={65} className="w-48" />
                  <span className="text-sm text-gray-600 animate-pulse">65%</span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto transform hover:scale-105 transition-all duration-300 animate-bounce-in">
                  <p className="text-sm text-gray-700 italic animate-fade-in">
                    "మా గ్రామంలో నీటి సమస్య ఉంది... పై[...]" 
                  </p>
                  <p className="text-xs text-gray-500 mt-2 animate-pulse">Detecting Telugu...</p>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1 hover:scale-105 transition-transform duration-300">
                <Zap className="h-3 w-3 animate-pulse" />
                AI-Powered
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 hover:scale-105 transition-transform duration-300">
                <Languages className="h-3 w-3" />
                Multi-language
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 hover:scale-105 transition-transform duration-300">
                <MessageSquare className="h-3 w-3" />
                Auto-categorized
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Voice Complaints */}
        <Card className={`bg-white/80 backdrop-blur-sm border-0 animate-slide-up`} style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600 animate-pulse" />
              Recent Voice Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint, index) => (
                <div 
                  key={complaint.id} 
                  className={`border-l-4 border-orange-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-orange-50 hover:border-l-8 hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 group">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                        <span className="font-semibold text-sm group-hover:text-blue-600 transition-colors duration-300">{complaint.citizen}</span>
                        <Badge variant="outline" className="text-xs animate-bounce-in">{complaint.language}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors duration-300" />
                        <span className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300">{complaint.village}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">{complaint.issue}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`${getStatusColor(complaint.status)} text-white text-xs animate-pulse`}>
                          {complaint.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                          <Clock className="h-3 w-3" />
                          {complaint.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-glow"
              onClick={() => setShowAllComplaints(true)}
            >
              View All Complaints
            </Button>
          </CardContent>
        </Card>

        {/* Voice Booth Status */}
        <Card className={`bg-white/80 backdrop-blur-sm border-0 animate-slide-up`} style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-green-600 animate-pulse" />
              Voice Booth Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {voiceBooths.map((booth, index) => (
                <div 
                  key={booth.id} 
                  className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-green-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="group">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold group-hover:text-green-600 transition-colors duration-300">{booth.id}</span>
                      <Badge 
                        variant={booth.status === 'active' ? 'default' : 'secondary'}
                        className={`${booth.status === 'active' ? 'animate-pulse' : ''} transition-all duration-300`}
                      >
                        {booth.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{booth.location}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500 group-hover:text-green-500 transition-colors duration-300">
                        Battery: {booth.battery}%
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                        Usage: {booth.usage}
                      </span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${booth.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'} transition-all duration-300`}>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-4 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 animate-bounce-in`} style={{ animationDelay: '0.9s' }}>
              <div className="text-center">
                <p className="text-sm font-semibold text-blue-800 animate-pulse">Network Health: 87%</p>
                <p className="text-xs text-blue-600">3 of 4 booths operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceComplaint;
