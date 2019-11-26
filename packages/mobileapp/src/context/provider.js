import React from 'react';
import { InfoProvider } from './info';
import { PermissionProvider } from './permissions';
import { ThemeProvider } from '@fabulas/astly';
import { ErrorBoundary, ErrorReportProvider } from './logging';
import { LocationProvider } from './location';
import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from '../reduxStore/store/initializeStore';

export const { store } = initializeStore();

export function AppProvider(props) {
  return (
    <InfoProvider>
      <PermissionProvider>
        <ThemeProvider theme={{}}>
          <LocationProvider>
            <ReduxProvider store={store}>
              <ErrorReportProvider>
                <ErrorBoundary>{props.children}</ErrorBoundary>
              </ErrorReportProvider>
            </ReduxProvider>
          </LocationProvider>
        </ThemeProvider>
      </PermissionProvider>
    </InfoProvider>
  );
}
