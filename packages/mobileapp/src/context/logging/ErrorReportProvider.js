// Disabling eslint for temporary fix
import React from 'react';
import rg4js from 'raygun4js';
// eslint-disable-next-line
import { useInfoState } from '../index';

export const ErrorReportContext = React.createContext();
// eslint-disable-next-line
function ErrorReportProvider({ children, ...props }) {
  const info = useInfoState();

  const serviceRef = React.useRef(
    // eslint-disable-next-line
    initRaygun({
      apiKey: 'W1Hxa4blNaRqscJ9Y5A0Q',
      instanceData: info,
    })
  );
  const service = serviceRef.current;

  function initRaygun(config) {
    const { envId, apiKey, appType, instanceData } = config;
    const { device, platform, location } = instanceData;
    const { uniqueId, ipAddress } = device;
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

  async function report({ error }) {
    service('send', {
      error,
    });
  }

  return (
    // eslint-disable-next-line
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

export { ErrorReportProvider, useErrorReporter };
