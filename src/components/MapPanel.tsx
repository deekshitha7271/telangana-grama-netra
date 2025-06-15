
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Annotation } from "@/pages/GramaNetraDemo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search } from "lucide-react";

// Constants for marker colors
const markerColors = {
  ai: "#FFD600",
  user: "#2563eb",
  search: "#2ec4b6",
};

interface MapPanelProps {
  annotations: Annotation[];
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  center: { lat: number; lng: number };
}

interface SearchMarker {
  lat: number;
  lng: number;
  label: string;
}

const MapPanel: React.FC<MapPanelProps> = ({
  annotations,
  mapboxToken,
  setMapboxToken,
  center,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  // Store marker refs to clear
  const markerRefs = useRef<mapboxgl.Marker[]>([]);
  // For search marker
  const searchMarkerRef = useRef<mapboxgl.Marker | null>(null);
  // Search UI state
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchMarker | null>(null);

  // Init map on mount (token only needed for rendering tiles)
  useEffect(() => {
    if (!mapContainer.current) return;
    // Minimal fallback for token
    mapboxgl.accessToken =
      mapboxToken ||
      "pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2xubjdudTNxMGd4MjNkbXRocXdtYnM3YiJ9.sNHkOdiChllrI2mq7LfIoA";

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [center.lng, center.lat],
      zoom: 16.2,
      pitch: 45,
    });

    mapRef.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );
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
    // Remove old annotation markers
    markerRefs.current.forEach((m) => m.remove());
    markerRefs.current = [];

    annotations.forEach((ann) => {
      const el = document.createElement("div");
      el.className = "rounded-full border-2 shadow-lg flex items-center justify-center";
      el.style.width = "36px";
      el.style.height = "36px";
      el.style.background = markerColors[ann.type];
      el.innerHTML = `
        <span style="display:flex;align-items:center;justify-content:center;font-weight:bold;padding:0px 3px; color:${
          ann.type === "user" ? "#fff" : "#333"
        };font-size:1.15rem;">
          📍
        </span>
      `;
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat([ann.coords.lng, ann.coords.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 12, closeOnClick: true }).setHTML(`
          <div style="font-size:1rem"><b>${
            ann.type === "user" ? "Note" : "AI"
          }</b>: ${ann.text}</div>
          <div style="font-size:0.85rem;color:#888;">${ann.coords.lat.toFixed(
            5
          )}, ${ann.coords.lng.toFixed(5)}</div>
        `)
        )
        .addTo(map);
      markerRefs.current.push(marker);
    });
  }, [annotations]);

  // Add/remove search marker on search result
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Remove previous search marker
    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
      searchMarkerRef.current = null;
    }
    if (searchResult) {
      const el = document.createElement("div");
      el.className =
        "rounded-full border-2 border-white shadow-xl flex items-center justify-center animate-jump bg-teal-400";
      el.style.width = "44px";
      el.style.height = "44px";
      el.innerHTML = `
        <span style="display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.55rem;">📍</span>
      `;
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
        color: markerColors.search,
      })
        .setLngLat([searchResult.lng, searchResult.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 14, closeOnClick: true }).setHTML(`
            <div style="font-size:1rem;">
              <b>${searchResult.label}</b>
            </div>
            <div style="font-size:0.85rem;color:#666;">
              ${searchResult.lat.toFixed(6)}, ${searchResult.lng.toFixed(6)}
            </div>
          `)
        )
        .addTo(map);
      searchMarkerRef.current = marker;
      // Optionally open popup on place search
      marker.togglePopup();
    }
  }, [searchResult]);

  // Location Search with OSM Nominatim API
  const handleLocationSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim() || !mapRef.current) return;
    setIsSearching(true);
    setSearchError(null);

    try {
      // Nominatim public endpoint
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchText.trim()
      )}`;
      const response = await fetch(url, {
        headers: { "Accept-Language": "en" },
      });
      const results = await response.json();
      if (!results || !results.length) {
        setSearchError("Location not found.");
        setIsSearching(false);
        setSearchResult(null);
        return;
      }
      // Pick the top result
      const result = results[0];
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);
      setSearchResult({ lat, lng, label: result.display_name });
      // Fly to result
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 16,
        essential: true,
      });
      setIsSearching(false);
      setSearchError(null);
    } catch (err) {
      setSearchError("Search unavailable. Check internet connection.");
      setIsSearching(false);
      setSearchResult(null);
    }
  };

  return (
    <div className="h-full w-full">
      {/* Map + Search UI */}
      <div className="relative h-[60vh] min-h-[300px] w-full rounded-xl shadow-xl">
        {/* Search Box */}
        <form
          onSubmit={handleLocationSearch}
          className="absolute top-2 left-2 z-20 flex gap-1 items-center bg-white/90 dark:bg-black/60 rounded-lg shadow-sm p-1.5 pr-2 max-w-[340px] w-full animate-fade-in"
          style={{ backdropFilter: "blur(2px)" }}
          autoComplete="off"
        >
          <Search className="h-5 w-5 text-blue-500 mr-1 ml-1" />
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search location…"
            className="bg-transparent border-0 focus:ring-0 text-base px-0"
            disabled={isSearching}
            autoFocus
          />
          <button
            type="submit"
            className="ml-1 text-sm font-semibold text-blue-600 hover:underline disabled:opacity-60"
            disabled={isSearching || !searchText.trim()}
            aria-label="Search"
          >
            {isSearching ? "..." : "Go"}
          </button>
        </form>
        {/* Error message below search */}
        {searchError && (
          <div className="absolute left-2 top-14 z-20 px-3 py-1 rounded-md bg-red-100 text-red-700 text-xs shadow">
            {searchError}
          </div>
        )}
        <div ref={mapContainer} className="absolute inset-0 rounded-xl" />
        {/* Place info for search */}
        {searchResult && (
          <div className="absolute top-16 left-2 bg-teal-50/90 text-teal-800 dark:bg-teal-900/80 dark:text-teal-100 text-xs rounded-md px-3 py-1 flex items-center gap-1 shadow z-20 animate-fade-in-fast">
            <MapPin className="h-3 w-3 mr-1" />
            {searchResult.label}
          </div>
        )}
        {/* Fallback info */}
        <div className="absolute bottom-2 left-2 bg-white/70 text-sm rounded-md px-2 py-1 flex items-center gap-1 shadow">
          <MapPin className="h-5 w-5 text-blue-500" />
          {annotations.length === 0
            ? "No observations yet"
            : `${annotations.length} marker${annotations.length > 1 ? "s" : ""} visible`}
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
