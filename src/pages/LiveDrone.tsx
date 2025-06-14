
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useDroneLocation } from '@/hooks/useDroneLocation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LiveVideoFeed from '@/components/LiveVideoFeed';
import DroneMap from '@/components/DroneMap';
import DroneControls from '@/components/DroneControls';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Plane,
  MapPin,
  Camera,
  Zap
} from 'lucide-react';

const LiveDrone = () => {
  const { isDark, toggleTheme } = useTheme();
  const { location, isOnline, lastPing, error } = useDroneLocation();
  const [forceOffline, setForceOffline] = useState(false);

  const effectiveOnlineStatus = isOnline && !forceOffline;

  const handleToggleConnection = () => {
    setForceOffline(!forceOffline);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-slate-900 dark:to-indigo-900 transition-colors duration-500">
      {/* Navigation Header */}
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.history.back()}
                className="hover:scale-105 transition-transform duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Plane className={`h-6 w-6 ${effectiveOnlineStatus ? 'text-green-600 animate-pulse' : 'text-gray-400'}`} />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Live Drone Monitor
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge 
                variant={effectiveOnlineStatus ? "default" : "destructive"}
                className={`${effectiveOnlineStatus ? 'bg-green-500 animate-pulse' : 'bg-red-500'} text-white`}
              >
                {effectiveOnlineStatus ? '🔴 LIVE' : '⚫ OFFLINE'}
              </Badge>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="hover:scale-110 transition-transform duration-300"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Next-Gen Surveillance
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time drone monitoring with advanced AI-powered tracking and live video streaming
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Camera, label: 'Video Quality', value: '4K Ultra HD', color: 'text-blue-600' },
            { icon: MapPin, label: 'GPS Accuracy', value: '±1 meter', color: 'text-green-600' },
            { icon: Zap, label: 'Latency', value: '<100ms', color: 'text-yellow-600' },
            { icon: Plane, label: 'Flight Time', value: '45 mins', color: 'text-purple-600' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Video Feed - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <LiveVideoFeed 
              isOnline={effectiveOnlineStatus}
              className="h-full"
            />
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <DroneControls
              isOnline={effectiveOnlineStatus}
              lastPing={lastPing}
              onToggleConnection={handleToggleConnection}
            />
          </div>

          {/* Map - Full width on mobile, spans remaining space on desktop */}
          <div className="lg:col-span-3">
            <DroneMap
              location={location}
              isOnline={effectiveOnlineStatus}
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 GramaNetra Live Drone System - Powered by Advanced AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LiveDrone;
