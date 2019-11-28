import React from 'react';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from '@fabulas/astly';
import { Provider as ReduxProvider } from 'react-redux';
import { InfoProvider } from './info';
import { PermissionProvider } from './permissions';
import { ErrorBoundary, ErrorReportProvider } from './logging';
import { LocationProvider } from './location';
import { initializeStore } from '../reduxStore/store/initializeStore';

export const { store } = initializeStore();

export function AppProvider(props) {
  const { children } = props;
  return (
    <InfoProvider>
      <PermissionProvider>
        <ThemeProvider theme={{}}>
          <LocationProvider>
            <ReduxProvider store={store}>
              <ErrorReportProvider>
                <ErrorBoundary>{children}</ErrorBoundary>
              </ErrorReportProvider>
            </ReduxProvider>
          </LocationProvider>
        </ThemeProvider>
      </PermissionProvider>
    </InfoProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
