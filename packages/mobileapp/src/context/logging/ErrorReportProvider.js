import React from 'react';
import rg4js from 'raygun4js';
import env from 'react-native-config';
import { useInfoState } from '../index';

export { ErrorReportProvider, useErrorReporter };

export const ErrorReportContext = React.createContext();

function ErrorReportProvider({ children, ...props }) {
  const info = useInfoState();

  const serviceRef = React.useRef(
    initRaygun({
      apiKey: 'W1Hxa4blNaRqscJ9Y5A0Q',
      instanceData: info,
    })
  );
  const service = serviceRef.current;

  function initRaygun(config) {
    const { envId, apiKey, appType, isDevelopment, instanceData } = config;
    const { device, platform, location } = instanceData;
    const { buildId, uniqueId, ipAddress, buildNumber } = device;
    rg4js('enableCrashReporting', true);
    rg4js('apiKey', apiKey);
    rg4js('setVersion', envId);
    rg4js('options', {
      clientIp: ipAddress,
    });
    rg4js('withCustomData', { brand: appType });
    rg4js('setUser', {
      identifier: uniqueId,
      uuid: uniqueId,
    });
    rg4js('withCustomData', {
      ...device,
      ...platform,
      ...location,
    });
    rg4js('boot');
    return rg4js;
  }

  async function report({ error, context }) {
    service('send', {
      error: error,
    });
  }

  return (
    <ErrorReportContext.Provider
      value={{
        report,
        service,
      }}
    >
      {children}
    </ErrorReportContext.Provider>
  );
}

function useErrorReporter() {
  const context = React.useContext(ErrorReportContext);
  if (context === undefined) {
    throw new Error('useErrorReporter must be used within a ErrorReportProvider');
  }
  return context;
}
