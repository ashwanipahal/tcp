import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import { usePermissionState } from '../permissions';
import { request } from 'react-native-permissions';

export { LocationProvider, useLocationState };

export const LocationContext = React.createContext();

function locationReducer(state, action) {
  console.log('action', action);
  switch (action.type) {
    case 'LOCATION/REQUESTED':
      return { isLoading: true };
    case 'LOCATION/SUCCESS':
      return { isLoading: false, ...action.payload };
    case 'LOCATION/FAIL':
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function LocationProvider({ children, ...props }) {
  const permissions = usePermissionState();
  const { locationWhenInUse } = permissions;
  const [state, dispatch] = React.useReducer(locationReducer, {});

  React.useEffect(() => {
    async function getLocationInfo() {
      if (locationWhenInUse === 'denied') {
        return;
      }
      dispatch({ type: 'LOCATION/REQUESTED' });
      if (locationWhenInUse === 'granted') {
        Geolocation.watchPosition(
          position => {
            dispatch({ type: 'LOCATION/SUCCESS', payload: position });
          },
          error => {
            dispatch({ type: 'LOCATION/ERROR', payload: error });
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else if (locationWhenInUse === 'unavailable') {
        await request(permissions.IOS.LOCATION_WHEN_IN_USE);
      }
    }
    getLocationInfo();
  }, [locationWhenInUse]);

  return <LocationContext.Provider value={state}>{children}</LocationContext.Provider>;
}

function useLocationState() {
  context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationState must be used within a LocationProvider');
  }
  return context;
}
