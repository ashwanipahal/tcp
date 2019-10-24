import React from 'react';
import {PlatformProvider, usePlatformState} from './platform-context';
import {DeviceProvider, useDeviceState} from './device-context';

export {InfoProvider, useInfoState};

const InfoContext = React.createContext({});

function getInitialContextState(props) {
  return {
    platform: usePlatformState(),
    device: useDeviceState(),
  };
}

function InfoProvider({children, ...props}) {
  return (
    <InfoContext.Provider value={getInitialContextState(props)}>{children}</InfoContext.Provider>
  );
}

function useInfoState() {
  const context = React.useContext(InfoContext);
  if (context === undefined) {
    throw new Error('useInfoState must be used within a InfoProvider');
  }
  return context;
}

const EnhancedProvider = props => {
  return (
    <PlatformProvider>
      <DeviceProvider>
        <InfoProvider>{props.children}</InfoProvider>
      </DeviceProvider>
    </PlatformProvider>
  );
};

export default EnhancedProvider;
