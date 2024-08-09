'use client';

import { useContext, useEffect, useRef } from 'react';
import mapboxgl, { FullscreenControl, type Map } from 'mapbox-gl';
import { MapContext } from '@/app/ui/dashboard/provider';

mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

export default function MapCard() {
  const { state, updateCoordinates, updateZoom } = useContext(MapContext);
  const { lng, lat, zoom } = state;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    mapRef.current.addControl(new FullscreenControl());

    mapRef.current.on('moveend', () => {
      const center = mapRef.current?.getCenter();

      if (center) {
        updateCoordinates(center.lng, center.lat);
      }
    });

    mapRef.current.on('zoomend', () => {
      const zoomLevel = mapRef.current?.getZoom();
      zoomLevel && updateZoom(zoomLevel);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="map-container relative col-span-6 row-span-2 rounded-xl border bg-white"
    ></div>
  );
}
