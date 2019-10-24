import React from 'react';
import DeviceInfo from 'react-native-device-info';
import {usePlatformState} from './platform-context';
import {Dimensions} from 'react-native';

export {DeviceProvider, useDeviceState};

/**
 * TODO Implement remaining, platform-specific APIs:
 * see https://github.com/react-native-community/react-native-device-info
 */

export const DeviceContext = React.createContext();

function DeviceProvider({children, ...props}) {
  const platform = usePlatformState();
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    async function getDeviceInfo() {
      const deviceInfo = await getInitialContextState({platform, ...props});
      setState(deviceInfo);
    }
    getDeviceInfo();
  }, []);

  if (state === null) {
    return null;
  }

  return <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>;
}

function useDeviceState() {
  const context = React.useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDeviceState must be used within a DeviceProvider');
  }
  return context;
}

async function getCommonPlatformSettings() {
  const {height, width} = Dimensions.get('window');

  return {
    uniqueId: await DeviceInfo.getUniqueId(),
    appName: await DeviceInfo.getApplicationName(),
    buildId: await DeviceInfo.getBuildId(),
    buildNumber: await DeviceInfo.getBuildNumber(),
    bundleId: await DeviceInfo.getBundleId(),
    deviceId: await DeviceInfo.getDeviceId(),
    ipAddress: await DeviceInfo.getIpAddress(),
    macAddress: await DeviceInfo.getMacAddress(),
    manufacturer: await DeviceInfo.getManufacturer(),
    model: await DeviceInfo.getModel(),
    systemName: await DeviceInfo.getSystemName(),
    systemVersion: await DeviceInfo.getSystemVersion(),
    memoryInUse: await DeviceInfo.getUsedMemory(),
    memoryTotal: await DeviceInfo.getTotalMemory(),
    hasNotch: await DeviceInfo.hasNotch(),
    hasSmallScreen: width <= 340,
    hasShortScreen: height <= 600,
    isEmulator: await DeviceInfo.isEmulator(),
    screenWidth: width,
    screenHeight: height,
    screenAspectRatio: width < height ? height / width : width / height,
  };
}

async function getAndroidOnlySettings() {
  return {};
}

async function getIOSOnlySettings() {
  return {};
}

async function getInitialContextState({platform}) {
  return Object.assign(
    {},
    await getCommonPlatformSettings(),
    await (platform.isIOS ? getIOSOnlySettings : getAndroidOnlySettings)(),
  );
}
