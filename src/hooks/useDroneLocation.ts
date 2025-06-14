
import { useState, useEffect } from 'react';

interface DroneLocation {
  lat: number;
  lng: number;
  timestamp?: string;
}

interface UseDroneLocationReturn {
  location: DroneLocation | null;
  isOnline: boolean;
  lastPing: string | null;
  error: string | null;
}

export const useDroneLocation = (refreshInterval = 2000): UseDroneLocationReturn => {
  const [location, setLocation] = useState<DroneLocation | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastPing, setLastPing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Simulate API call with mock data for demonstration
        // In production, replace with: const response = await fetch('/api/location');
        const mockLocation = {
          lat: 18.7465 + (Math.random() - 0.5) * 0.01, // Simulate movement around Kondapally
          lng: 78.5691 + (Math.random() - 0.5) * 0.01,
          timestamp: new Date().toISOString()
        };
        
        setLocation(mockLocation);
        setLastPing(new Date().toLocaleTimeString());
        setIsOnline(true);
        setError(null);
      } catch (err) {
        setError('Failed to fetch drone location');
        setIsOnline(false);
      }
    };

    fetchLocation(); // Initial fetch
    const interval = setInterval(fetchLocation, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { location, isOnline, lastPing, error };
};
