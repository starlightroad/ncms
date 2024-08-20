'use client';

import { useContext, useEffect } from 'react';
import { MapContext } from '@/app/providers/map-provider';
import MapboxMap from '@/app/ui/map';

export default function MapCard({ pins }: { pins?: { lng: number; lat: number }[] }) {
  const { updateCoordinates, updateMarkers } = useContext(MapContext);

  useEffect(() => {
    if (pins?.length) {
      updateMarkers(pins);

      if (pins.length === 1) {
        const pin1 = pins[0];
        updateCoordinates(pin1.lng, pin1.lat);
      }
    }
  }, []);

  return <MapboxMap />;
}
