import React from 'react';
import {Platform} from 'react-native';

export {PlatformProvider, usePlatformState};

export const PlatformContext = React.createContext({});

function getInitialContextState(props) {
  return {
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
  };
}

function PlatformProvider({children, ...props}) {
  const state = getInitialContextState(props);
  return (
    <PlatformContext.Provider value={state} {...props}>
      {children}
    </PlatformContext.Provider>
  );
}

function usePlatformState() {
  const context = React.useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatformState must be used within a PlatformProvider');
  }
  return context;
}
