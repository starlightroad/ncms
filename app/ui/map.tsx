'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import mapboxgl, { FullscreenControl, Marker, type Map } from 'mapbox-gl';
import { updateMapLoadsCountAction } from '@/app/dashboard/actions';

mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

export default function MapboxMap({ markers }: { markers: { lng: number; lat: number }[] }) {
  const { resolvedTheme } = useTheme();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: `mapbox://styles/mapbox/${resolvedTheme === 'dark' ? 'dark-v11' : 'standard'}`,
      zoom: 13,
    });

    mapRef.current.addControl(new FullscreenControl());

    mapRef.current?.on('load', () => {
      if (markers.length === 2) {
        const [marker1, marker2] = markers;
        mapRef.current?.fitBounds(
          [
            { lng: marker1.lng, lat: marker1.lat },
            { lng: marker2.lng, lat: marker2.lat },
          ],
          {
            animate: false,
            padding: 72,
          },
        );
      } else {
        const [marker] = markers;
        mapRef.current?.setCenter([marker.lng, marker.lat]);
      }

      markers.forEach((marker) => {
        const newMarker = new Marker({ color: '#2563eb' }).setLngLat([marker.lng, marker.lat]);
        newMarker.addTo(mapRef.current as Map);
      });

      updateMapLoadsCountAction();
    });
  }, [resolvedTheme]);

  useEffect(() => {
    if (resolvedTheme) {
      const style = `mapbox://styles/mapbox/${resolvedTheme === 'dark' ? 'dark-v11' : 'standard'}`;
      mapRef.current?.setStyle(style);
    }
  }, [resolvedTheme]);

  return (
    <div
      ref={mapContainer}
      className="map-container relative col-span-6 row-span-2 h-full bg-card"
    ></div>
  );
}
