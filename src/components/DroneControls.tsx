
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
    <Card className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className={`h-5 w-5 ${isOnline ? 'text-green-600 animate-pulse' : 'text-gray-400'}`} />
          Drone Control Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Toggle */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
              <Power className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium">Drone Status</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Connection control
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <Switch 
              checked={isOnline} 
              onCheckedChange={onToggleConnection}
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="flex items-center gap-2">
              <Signal className={`h-4 w-4 ${isOnline ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">Signal Strength</span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? '95%' : 'N/A'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="flex items-center gap-2">
              <Battery className={`h-4 w-4 ${isOnline ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">Battery Level</span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? '87%' : 'N/A'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="flex items-center gap-2">
              <Wifi className={`h-4 w-4 ${isOnline ? 'text-purple-500' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">Data Link</span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {lastPing && (
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
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
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!isOnline}
              className="hover:scale-105 transition-transform duration-200"
            >
              Return Home
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!isOnline}
              className="hover:scale-105 transition-transform duration-200"
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
