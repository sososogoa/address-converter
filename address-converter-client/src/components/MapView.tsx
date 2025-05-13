import { useEffect, useRef } from "react";

interface MapViewProps {
  lat: string;
  lng: string;
  onClickMap: (lat: string, lng: string) => void;
}

export default function MapView({ lat, lng, onClickMap }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  const toLatLng = (lat: string, lng: string) =>
    new kakao.maps.LatLng(Number(lat), Number(lng));

  const handleMapClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    const lat = String(mouseEvent.latLng.getLat());
    const lng = String(mouseEvent.latLng.getLng());
    onClickMap(lat, lng);
  };

  const initializeMap = () => {
    if (!mapRef.current) return;

    const center = toLatLng(lat, lng);
    const map = new kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });

    const marker = new kakao.maps.Marker({ position: center });
    marker.setMap(map);

    kakao.maps.event.addListener(map, "click", handleMapClick);

    mapInstance.current = map;
    markerRef.current = marker;
  };

  useEffect(() => {
    if (!window.kakao?.maps) return;
    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    const center = toLatLng(lat, lng);
    map.setCenter(center);
    marker.setPosition(center);
  }, [lat, lng]);

  return <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />;
}
