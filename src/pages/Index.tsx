import { useState, useEffect } from "react";
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400 rounded-full opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="animate-float absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="animate-float absolute top-40 right-20 w-3 h-3 bg-orange-300/40 rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="animate-float absolute bottom-20 left-1/4 w-2 h-2 bg-blue-300/30 rounded-full" style={{ animationDelay: '1s' }}></div>
          <div className="animate-float absolute top-60 right-1/3 w-1 h-1 bg-white/40 rounded-full" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <div className={`text-center text-white transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 transform hover:scale-105 transition-transform duration-300">
              <Heart className="h-4 w-4 text-orange-300 animate-pulse" />
              <span className="text-sm font-medium">Made for Telangana's Villages</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent animate-fade-in">
              <span className="inline-block hover:animate-pulse">G</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.1s' }}>r</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.2s' }}>a</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.3s' }}>m</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.4s' }}>a</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.5s' }}>N</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.6s' }}>e</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.7s' }}>t</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.8s' }}>r</span>
              <span className="inline-block hover:animate-pulse" style={{ animationDelay: '0.9s' }}>a</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-4 text-blue-100 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.3s' }}>
              India's First AI-Powered Rural Governance OS
            </p>
            <p className={`text-lg mb-8 text-blue-200 max-w-3xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.6s' }}>
              Drone + Vernacular AI + IoT platform that detects, documents, and delivers 
              real-time governance support in remote Telangana villages
            </p>
            <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.9s' }}>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-glow"
                onClick={() => setActiveView("drone")}
              >
                <Plane className="mr-2 h-5 w-5 animate-bounce" />
                Launch Monitoring
              </Button>
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-glow"
                onClick={() => window.location.href = '/live-drone'}
              >
                <Eye className="mr-2 h-5 w-5 animate-pulse" />
                Live Drone Feed
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                onClick={() => setActiveView("voice")}
              >
                <Mic className="mr-2 h-5 w-5" />
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
            <Card 
              key={index} 
              className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center group">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color} group-hover:animate-bounce transition-all duration-300`} />
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-4xl transition-all duration-300">{stat.value}</div>
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
            <TabsTrigger value="overview" className="transition-all duration-300 hover:scale-105">Overview</TabsTrigger>
            <TabsTrigger value="drone" className="transition-all duration-300 hover:scale-105">Drone Monitor</TabsTrigger>
            <TabsTrigger value="voice" className="transition-all duration-300 hover:scale-105">Voice System</TabsTrigger>
            <TabsTrigger value="grievances" className="transition-all duration-300 hover:scale-105">Grievances</TabsTrigger>
            <TabsTrigger value="analytics" className="transition-all duration-300 hover:scale-105">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${feature.color} text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-2xl transition-all duration-300">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Status */}
            <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-0 animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600 animate-pulse" />
                  Live System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Drone Coverage</span>
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300">94%</span>
                    </div>
                    <Progress value={94} className="h-2 transition-all duration-1000 animate-progress" />
                  </div>
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Voice Booth Uptime</span>
                      <span className="text-sm text-gray-600 group-hover:text-green-600 transition-colors duration-300">98%</span>
                    </div>
                    <Progress value={98} className="h-2 transition-all duration-1000 animate-progress" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Resolution Rate</span>
                      <span className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors duration-300">87%</span>
                    </div>
                    <Progress value={87} className="h-2 transition-all duration-1000 animate-progress" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drone" className="mt-8 animate-fade-in">
            <DroneMonitoring />
          </TabsContent>

          <TabsContent value="voice" className="mt-8 animate-fade-in">
            <VoiceComplaint />
          </TabsContent>

          <TabsContent value="grievances" className="mt-8 animate-fade-in">
            <GrievanceDashboard />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8 animate-fade-in">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
