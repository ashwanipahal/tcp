// Disabling eslint for temporary fix
import React from 'react';
import PropTypes from 'prop-types';
import { PlatformProvider, usePlatformState } from './platform-context';
import { DeviceProvider, useDeviceState } from './device-context';

const InfoContext = React.createContext({});

function getInitialContextState() {
  return {
    platform: usePlatformState(),
    device: useDeviceState(),
  };
}

function InfoProvider({ children }) {
  return (
    // eslint-disable-next-line
    <InfoContext.Provider value={getInitialContextState()}>{children}</InfoContext.Provider>
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
  const { children } = props;
  return (
    <PlatformProvider>
      <DeviceProvider>
        <InfoProvider>{children}</InfoProvider>
      </DeviceProvider>
    </PlatformProvider>
  );
};

export default EnhancedProvider;

export { InfoProvider, useInfoState };

EnhancedProvider.propTypes = {
  children: PropTypes.node,
};

EnhancedProvider.defaultProps = {
  children: null,
};

InfoProvider.propTypes = {
  children: PropTypes.node,
};

InfoProvider.defaultProps = {
  children: null,
};
