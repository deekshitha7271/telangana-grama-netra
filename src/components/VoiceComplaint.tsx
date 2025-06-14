
import { useState } from "react";
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

const VoiceComplaint = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Telugu");

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

  return (
    <div className="space-y-6">
      {/* Voice Recording Interface */}
      <Card className="bg-gradient-to-br from-orange-50 to-blue-50 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Languages className="h-6 w-6 text-orange-600" />
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
                } text-white shadow-2xl`}
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? (
                  <MicOff className="h-12 w-12" />
                ) : (
                  <Mic className="h-12 w-12" />
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {isRecording ? "Recording..." : "Tap to Start Recording"}
              </h3>
              <p className="text-gray-600">
                Speak in Telugu, Hindi, or English - AI will understand and help!
              </p>
            </div>

            {isRecording && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Volume2 className="h-5 w-5 text-orange-600" />
                  <Progress value={65} className="w-48" />
                  <span className="text-sm text-gray-600">65%</span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-700 italic">
                    "మా గ్రామంలో నీటి సమస్య ఉంది... పై[...]" 
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Detecting Telugu...</p>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                AI-Powered
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Languages className="h-3 w-3" />
                Multi-language
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Auto-categorized
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Voice Complaints */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Recent Voice Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="border-l-4 border-orange-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="font-semibold text-sm">{complaint.citizen}</span>
                        <Badge variant="outline" className="text-xs">{complaint.language}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{complaint.village}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2">{complaint.issue}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`${getStatusColor(complaint.status)} text-white text-xs`}>
                          {complaint.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {complaint.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              View All Complaints
            </Button>
          </CardContent>
        </Card>

        {/* Voice Booth Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-green-600" />
              Voice Booth Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {voiceBooths.map((booth) => (
                <div key={booth.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-green-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{booth.id}</span>
                      <Badge variant={booth.status === 'active' ? 'default' : 'secondary'}>
                        {booth.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{booth.location}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">Battery: {booth.battery}%</span>
                      <span className="text-xs text-gray-500">Usage: {booth.usage}</span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${booth.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`}>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm font-semibold text-blue-800">Network Health: 87%</p>
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
