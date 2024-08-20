'use client';

import { Marker } from 'mapbox-gl';
import { createContext, useReducer } from 'react';

type Coordinates = { lng: number; lat: number };

type Action =
  | { type: 'UPDATE_STYLE'; payload: string }
  | { type: 'UPDATE_COORDS'; payload: Coordinates }
  | { type: 'UPDATE_ZOOM'; payload: number }
  | { type: 'UPDATE_MARKERS'; payload: Coordinates[] };

type State = {
  lng: number;
  lat: number;
  zoom: number;
  style: string;
  markers: { marker: Marker; coords: Coordinates }[];
};

const initState: State = {
  lng: -80.27,
  lat: 26.27,
  zoom: 13,
  style: 'mapbox://styles/mapbox/streets-v12',
  markers: [],
};

const reducer = (state: typeof initState, action: Action): typeof initState => {
  switch (action.type) {
    case 'UPDATE_COORDS':
      return { ...state, lng: action.payload.lng, lat: action.payload.lat };
    case 'UPDATE_ZOOM':
      return { ...state, zoom: action.payload };
    case 'UPDATE_MARKERS': {
      const markers = action.payload.map((marker) => {
        const newMarker = new Marker({ color: '#2563eb' }).setLngLat([marker.lng, marker.lat]);

        return {
          marker: newMarker,
          coords: {
            lng: marker.lng,
            lat: marker.lat,
          },
        };
      });

      return {
        ...state,
        markers: [...markers],
      };
    }
    case 'UPDATE_STYLE': {
      return {
        ...state,
        style: action.payload,
      };
    }
    default:
      return state;
  }
};

type Context = {
  state: typeof initState;
  updateCoordinates: (lng: number, lat: number) => void;
  updateZoom: (zoom: number) => void;
  updateMarkers: (markers: { lng: number; lat: number }[]) => void;
  updateStyle: (style: string) => void;
};

export const MapContext = createContext<Context>({
  state: initState,
  updateCoordinates: (lng: number, lat: number) => {},
  updateZoom: (zoom: number) => {},
  updateMarkers: (markers) => {},
  updateStyle: (style) => {},
});

export default function MapProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const updateCoordinates = (lng: number, lat: number) => {
    dispatch({
      type: 'UPDATE_COORDS',
      payload: { lng, lat },
    });
  };

  const updateZoom = (zoom: number) => {
    dispatch({
      type: 'UPDATE_ZOOM',
      payload: zoom,
    });
  };

  const updateMarkers = (markers: { lng: number; lat: number }[]) => {
    dispatch({
      type: 'UPDATE_MARKERS',
      payload: markers,
    });
  };

  const updateStyle = (style: string) => {
    dispatch({
      type: 'UPDATE_STYLE',
      payload: style,
    });
  };

  const value = {
    state,
    updateCoordinates,
    updateZoom,
    updateMarkers,
    updateStyle,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
