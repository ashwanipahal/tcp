/* eslint-disable no-param-reassign */
import React from 'react';
import logger from '@tcp/core/src/utils/loggerInstance';
import { trackError } from '@tcp/core/src/utils/errorReporter.util';
import FallbackErrorComponent from './ErrorFallbackComponent';
import { DEFAULT_CLASS_NAME, LIFECYCLE_METHODS } from './config';

/**
 * Generate error component
 * @param {object} error
 * @param {string} componentName
 */
export const renderErrorComponent = (error, componentName) => {
  return React.createElement(
    'div',
    {
      className: DEFAULT_CLASS_NAME,
    },
    FallbackErrorComponent.call(this, { errorMessage: error.message, componentName })
  );
};

export const logError = ({ error, errorInfo }) => {
  trackError({
    error,
    extraData: {
      errorInfo,
    },
    tags: ['ERROR_BOUNDARY'],
  });
  return true;
};

/**
 * Generate error safe client component
 * @param {function} renderComponent generate component render
 * @param {string} componentName
 */
export const renderClientSafeComponent = (renderComponent, componentName) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
      this.componentName = componentName;
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      logger.error(error, errorInfo);
      logError({ error, errorInfo });
    }

    render() {
      return renderComponent(this.props, this.state);
    }
  };
};

/**
 * Generate error safe functional component
 * @param {*} WrappedComponent
 */
export const functionalSafeComponent = WrappedComponent => {
  const renderComponent = (passedProps, passedState) => {
    try {
      const { hasError, error } = passedState;
      return hasError
        ? renderErrorComponent(error, WrappedComponent.name)
        : WrappedComponent(passedProps);
    } catch (err) {
      logError({ error: err, errorInfo: WrappedComponent.name });
      return renderErrorComponent(err, WrappedComponent.name);
    }
  };
  return renderClientSafeComponent(renderComponent, WrappedComponent.name);
};

/**
 * Create error safe component methods
 * @param {string} methodName
 * @param {*} WrappedComponent
 */
export const wrapMethod = (methodName, WrappedComponent) => {
  const originalMethod = WrappedComponent.prototype[methodName];
  if (!originalMethod) {
    return;
  }

  // define default state
  WrappedComponent.prototype.state = {
    hasError: false,
    error: null,
    ...WrappedComponent.prototype.state,
  };

  WrappedComponent.prototype[methodName] = function _componentMethod() {
    try {
      if (methodName === 'render') {
        const { hasError, error } = this.state;
        return hasError
          ? renderErrorComponent(error, WrappedComponent.name)
          : // eslint-disable-next-line prefer-rest-params
            originalMethod.apply(this, arguments);
      }
      // eslint-disable-next-line prefer-rest-params
      return originalMethod.apply(this, arguments);
    } catch (err) {
      logError({ error: err, errorInfo: WrappedComponent.name });
      if (methodName === 'render') {
        return renderErrorComponent(err, WrappedComponent.name);
      }
      if (methodName === 'shouldComponentUpdate') {
        return false;
      }
      return false;
    }
  };
};

/**
 * Generate error safe non functional component
 * @param {*} WrappedComponent
 */
export const nonFunctionalSafeComponent = WrappedComponent => {
  LIFECYCLE_METHODS.forEach(method => wrapMethod(method, WrappedComponent));
  const renderComponent = passedProps => <WrappedComponent {...passedProps} />;
  return renderClientSafeComponent(renderComponent, WrappedComponent.name);
};

/**
 * Generate error safe component
 * @param {*} WrappedComponent
 */
const SafeComponent = WrappedComponent =>
  !(WrappedComponent.prototype && WrappedComponent.prototype.render)
    ? functionalSafeComponent(WrappedComponent)
    : nonFunctionalSafeComponent(WrappedComponent);

export default SafeComponent;
