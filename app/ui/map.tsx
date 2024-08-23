'use client';

import { useContext, useEffect, useRef } from 'react';
import mapboxgl, { FullscreenControl, type Map } from 'mapbox-gl';
import { MapContext } from '@/app/providers/map-provider';

mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

export default function MapboxMap() {
  const { state, updateCoordinates, updateZoom } = useContext(MapContext);
  const { lng, lat, zoom, markers } = state;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  mapRef.current?.on('load', () => {
    if (markers.length === 2) {
      const [marker1, marker2] = markers;
      mapRef.current?.fitBounds([marker1.coords, marker2.coords], {
        animate: false,
        padding: 72,
      });
    } else {
      mapRef.current?.setCenter([lng, lat]);
    }

    markers.forEach((marker) => marker.marker.addTo(mapRef.current as Map));
  });

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: zoom,
    });

    mapRef.current.addControl(new FullscreenControl());
  }, [lng, lat, zoom, updateCoordinates, updateZoom]);

  return (
    <div
      ref={mapContainer}
      className="map-container relative col-span-6 row-span-2 h-full bg-card"
    ></div>
  );
}
