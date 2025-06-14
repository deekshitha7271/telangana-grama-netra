
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plane, 
  Mic, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Eye,
  Zap,
  Heart
} from "lucide-react";
import DroneMonitoring from "@/components/DroneMonitoring";
import VoiceComplaint from "@/components/VoiceComplaint";
import GrievanceDashboard from "@/components/GrievanceDashboard";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const Index = () => {
  const [activeView, setActiveView] = useState("overview");

  const stats = [
    { label: "Villages Monitored", value: "247", icon: MapPin, color: "text-blue-600" },
    { label: "Active Complaints", value: "89", icon: AlertTriangle, color: "text-orange-600" },
    { label: "Resolved Today", value: "156", icon: CheckCircle, color: "text-green-600" },
    { label: "Citizens Served", value: "12.4K", icon: Users, color: "text-purple-600" },
  ];

  const features = [
    {
      icon: Plane,
      title: "Autonomous Drone Sweeps",
      description: "AI-powered drones scan villages for infrastructure issues, health risks, and maintenance needs",
      color: "bg-blue-500"
    },
    {
      icon: Mic,
      title: "Mana Mitram Voice Booths",
      description: "Solar-powered Telugu voice kiosks for instant citizen grievance registration",
      color: "bg-orange-500"
    },
    {
      icon: Eye,
      title: "Grievance Radar Dashboard",
      description: "Real-time heatmaps and AI-powered issue flagging for immediate official attention",
      color: "bg-green-500"
    },
    {
      icon: Zap,
      title: "Auto Escalation System",
      description: "Smart escalation to higher officials with citizen feedback loops and transparency",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Heart className="h-4 w-4 text-orange-300" />
              <span className="text-sm font-medium">Made for Telangana's Villages</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              GramaNetra
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              India's First AI-Powered Rural Governance OS
            </p>
            <p className="text-lg mb-8 text-blue-200 max-w-3xl mx-auto">
              Drone + Vernacular AI + IoT platform that detects, documents, and delivers 
              real-time governance support in remote Telangana villages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
                onClick={() => setActiveView("drone")}
              >
                Launch Monitoring
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                onClick={() => setActiveView("voice")}
              >
                Mana Mitram Voice
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drone">Drone Monitor</TabsTrigger>
            <TabsTrigger value="voice">Voice System</TabsTrigger>
            <TabsTrigger value="grievances">Grievances</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${feature.color} text-white group-hover:scale-110 transition-transform`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Status */}
            <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Live System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Drone Coverage</span>
                      <span className="text-sm text-gray-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Voice Booth Uptime</span>
                      <span className="text-sm text-gray-600">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Resolution Rate</span>
                      <span className="text-sm text-gray-600">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drone" className="mt-8">
            <DroneMonitoring />
          </TabsContent>

          <TabsContent value="voice" className="mt-8">
            <VoiceComplaint />
          </TabsContent>

          <TabsContent value="grievances" className="mt-8">
            <GrievanceDashboard />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
