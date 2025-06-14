
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Navigation } from 'lucide-react';

interface DroneLocation {
  lat: number;
  lng: number;
}

interface DroneMapProps {
  location: DroneLocation | null;
  isOnline: boolean;
  className?: string;
}

const DroneMap: React.FC<DroneMapProps> = ({ location, isOnline, className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [isOutOfBounds, setIsOutOfBounds] = useState(false);

  // Geo-fence boundaries (around Kondapally)
  const geofence = {
    north: 18.76,
    south: 18.73,
    east: 78.58,
    west: 78.55
  };

  useEffect(() => {
    if (location) {
      const outOfBounds = 
        location.lat > geofence.north ||
        location.lat < geofence.south ||
        location.lng > geofence.east ||
        location.lng < geofence.west;
      
      setIsOutOfBounds(outOfBounds);
    }
  }, [location]);

  const initializeMap = () => {
    if (!mapboxToken) {
      alert('Please enter a valid Mapbox token');
      return;
    }
    setShowTokenInput(false);
    // Here you would initialize the actual Mapbox map with the token
    console.log('Initializing map with token:', mapboxToken);
  };

  return (
    <Card className={`bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-blue-600" />
          Real-time GPS Tracking
          {isOutOfBounds && (
            <Badge variant="destructive" className="animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              OUT OF BOUNDS
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showTokenInput ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Mapbox Public Token
              </label>
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-xs"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
              </p>
            </div>
            <Button onClick={initializeMap} className="w-full">
              Initialize Map
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Map Container */}
            <div 
              ref={mapContainer}
              className="w-full h-64 bg-gradient-to-br from-blue-200 to-green-200 dark:from-blue-800 dark:to-green-800 rounded-lg flex items-center justify-center relative overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Map placeholder with drone indicator */}
              <div className="text-center">
                <div className="relative">
                  <MapPin className={`h-12 w-12 mx-auto mb-2 ${isOnline ? 'text-green-600 animate-bounce' : 'text-gray-400'}`} />
                  {isOnline && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className="text-sm font-medium">Live Map Integration</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Mapbox map will render here
                </p>
              </div>
            </div>

            {/* Location Info */}
            {location && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/50 dark:bg-black/50 rounded-lg p-3">
                  <div className="font-medium text-gray-700 dark:text-gray-300">Latitude</div>
                  <div className="font-mono text-lg">{location.lat.toFixed(6)}°</div>
                </div>
                <div className="bg-white/50 dark:bg-black/50 rounded-lg p-3">
                  <div className="font-medium text-gray-700 dark:text-gray-300">Longitude</div>
                  <div className="font-mono text-lg">{location.lng.toFixed(6)}°</div>
                </div>
              </div>
            )}

            {/* Geo-fence Status */}
            <div className={`p-3 rounded-lg border-2 ${isOutOfBounds ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-500 bg-green-50 dark:bg-green-900/20'}`}>
              <div className="flex items-center gap-2">
                {isOutOfBounds ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <MapPin className="h-4 w-4 text-green-600" />
                )}
                <span className="font-medium">
                  {isOutOfBounds ? 'Outside Geo-fence' : 'Within Safe Zone'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DroneMap;
