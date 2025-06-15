import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plane, 
  Power, 
  Signal, 
  Battery, 
  Clock,
  Wifi
} from 'lucide-react';

interface DroneControlsProps {
  isOnline: boolean;
  lastPing: string | null;
  onToggleConnection: () => void;
  className?: string;
}

const DroneControls: React.FC<DroneControlsProps> = ({
  isOnline,
  lastPing,
  onToggleConnection,
  className
}) => {
  return (
    <Card className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black max-w-md mx-auto border-0 shadow-2xl rounded-3xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span className={`text-green-600 text-2xl ${isOnline ? 'animate-pulse' : 'text-gray-400'}`} role="img" aria-label="plane">✈️</span>
          <span>Drone Control Center</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {/* Connection Toggle */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
              <span className="text-white text-xl" role="img" aria-label="power">
                {isOnline ? '🟢' : '⚪'}
              </span>
            </div>
            <div>
              <div className="font-semibold text-lg">Drone Status</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Connection control
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{isOnline ? 'Online' : 'Offline'}</span>
            <Switch 
              checked={isOnline} 
              onCheckedChange={onToggleConnection}
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-green-600" role="img" aria-label="signal">📶</span>
              <span className="text-sm font-medium">Signal Strength</span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"} className="text-base py-1 px-3">
              {isOnline ? '95%' : 'N/A'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-blue-600" role="img" aria-label="battery">🔋</span>
              <span className="text-sm font-medium">Battery Level</span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"} className="text-base py-1 px-3">
              {isOnline ? '87%' : 'N/A'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-purple-600" role="img" aria-label="wifi">📶</span>
              <span className="text-sm font-medium">Data Link</span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"} className="text-base py-1 px-3">
              {isOnline ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {lastPing && (
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-orange-500" role="img" aria-label="clock">⏰</span>
                <span className="text-sm font-medium">Last GPS Ping</span>
              </div>
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                {lastPing}
              </span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!isOnline}
              className="hover:scale-105 transition-transform duration-200 font-bold text-base rounded-lg"
            >
              Return Home
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!isOnline}
              className="hover:scale-105 transition-transform duration-200 font-bold text-base rounded-lg"
            >
              Land Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DroneControls;
