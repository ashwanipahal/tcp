import React from 'react';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import { useInfoState } from '../info';

export { PermissionProvider, usePermissionState };

export const PermissionContext = React.createContext();

async function getInitialContextState({ platform }) {
  const { isIOS } = platform;
  if (isIOS) {
    return {
      locationWhenInUse: await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
      locationAlways: await check(PERMISSIONS.IOS.LOCATION_ALWAYS),
    };
  } else {
    return {};
  }
}

function PermissionProvider({ children, ...props }) {
  const info = useInfoState();
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    async function getPermissionsInfo() {
      const permissions = await getInitialContextState({ ...info, ...props });
      setState(permissions);
    }
    getPermissionsInfo();
  }, []);

  if (state === null) {
    return null;
  }

  return (
    <PermissionContext.Provider
      value={{ ...state, permissions: PERMISSIONS, requestPermission: request }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

function usePermissionState() {
  context = React.useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissionState must be used within a PermissionProvider');
  }
  return context;
}
