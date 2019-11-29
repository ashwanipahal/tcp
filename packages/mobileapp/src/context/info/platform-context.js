// Disabling eslint for temporary fix
import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';

export const PlatformContext = React.createContext({});

function getInitialContextState() {
  return {
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
  };
}

function PlatformProvider({ children, ...props }) {
  const state = getInitialContextState();
  return (
    // eslint-disable-next-line
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

PlatformProvider.propTypes = {
  children: PropTypes.node,
};
PlatformProvider.defaultProps = {
  children: null,
};

export { PlatformProvider, usePlatformState };
