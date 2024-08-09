'use client';

import { createContext, useReducer } from 'react';

type Action =
  | { type: 'UPDATE_COORDS'; payload: { lng: number; lat: number } }
  | { type: 'UPDATE_ZOOM'; payload: number };

type State = {
  lng: number;
  lat: number;
  zoom: number;
};

const initState: State = {
  lng: -80.27,
  lat: 26.27,
  zoom: 9,
};

const reducer = (state: typeof initState, action: Action): typeof initState => {
  switch (action.type) {
    case 'UPDATE_COORDS':
      return { ...state, lng: action.payload.lng, lat: action.payload.lat };
    case 'UPDATE_ZOOM':
      return { ...state, zoom: action.payload };
    default:
      return state;
  }
};

type Context = {
  state: typeof initState;
  updateCoordinates: (lng: number, lat: number) => void;
  updateZoom: (zoom: number) => void;
};

export const MapContext = createContext<Context>({
  state: initState,
  updateCoordinates: (lng: number, lat: number) => {},
  updateZoom: (zoom: number) => {},
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

  return (
    <MapContext.Provider value={{ state, updateCoordinates, updateZoom }}>
      {children}
    </MapContext.Provider>
  );
}
