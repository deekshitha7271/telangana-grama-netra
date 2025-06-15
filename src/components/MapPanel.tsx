
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Annotation } from "@/pages/GramaNetraDemo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Show markers for both user (blue) and AI (yellow)
const markerColors = {
  ai: "#FFD600",
  user: "#2563eb",
};

interface MapPanelProps {
  annotations: Annotation[];
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  center: { lat: number; lng: number };
}

const MapPanel: React.FC<MapPanelProps> = ({ annotations, mapboxToken, setMapboxToken, center }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  // Store marker refs to clear
  const markerRefs = useRef<mapboxgl.Marker[]>([]);

  // Init map when token is set
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [center.lng, center.lat],
      zoom: 16.2,
      pitch: 45,
    });

    // Controls
    mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
    mapRef.current.scrollZoom.disable();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [mapboxToken, center.lat, center.lng]);

  // Update markers on annotations
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Remove old markers
    markerRefs.current.forEach((m) => m.remove());
    markerRefs.current = [];

    annotations.forEach((ann, i) => {
      const el = document.createElement("div");
      el.className = "rounded-full border-2 shadow-lg flex items-center justify-center";
      el.style.width = "36px";
      el.style.height = "36px";
      el.style.background = markerColors[ann.type];
      el.innerHTML = `
        <span style="display:flex;align-items:center;justify-content:center;font-weight:bold;padding:0px 3px; color:${ann.type==='user'?'#fff':'#333'};font-size:1.15rem;">
          📍
        </span>
      `;
      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([ann.coords.lng, ann.coords.lat])
        .setPopup(new mapboxgl.Popup({ offset: 12, closeOnClick: true }).setHTML(`
          <div style="font-size:1rem"><b>${ann.type === "user" ? "Note" : "AI"}</b>: ${ann.text}</div>
          <div style="font-size:0.85rem;color:#888;">${ann.coords.lat.toFixed(5)}, ${ann.coords.lng.toFixed(5)}</div>
        `))
        .addTo(map);
      markerRefs.current.push(marker);
    });
  }, [annotations]);

  return (
    <div className="h-full w-full">
      {!mapboxToken ? (
        <div className="flex flex-col items-center justify-center h-full rounded-xl bg-gradient-to-br from-blue-200 to-green-200 dark:from-blue-900 dark:to-green-900 shadow-lg p-6 gap-6">
          <Badge className="mb-1 px-3 py-1">Enter Mapbox Public Token to see Map</Badge>
          <Input
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG..."
            className="max-w-xs font-mono"
          />
          <div className="text-xs text-gray-500 mt-2">
            Get your token at{" "}
            <a href="https://mapbox.com/" target="_blank" className="text-blue-600 underline">
              mapbox.com
            </a>
          </div>
        </div>
      ) : (
        <div className="relative h-[60vh] min-h-[300px] w-full rounded-xl shadow-xl">
          <div ref={mapContainer} className="absolute inset-0 rounded-xl" />
          {/* Fallback info */}
          <div className="absolute bottom-2 left-2 bg-white/70 text-sm rounded-md px-2 py-1 flex items-center gap-1 shadow">
            <MapPin className="h-5 w-5 text-blue-500" />
            {annotations.length === 0
              ? "No observations yet"
              : `${annotations.length} marker${annotations.length > 1 ? "s" : ""} visible`}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPanel;
