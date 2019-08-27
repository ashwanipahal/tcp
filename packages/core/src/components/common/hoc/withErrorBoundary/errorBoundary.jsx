/* eslint-disable no-param-reassign */
import React from 'react';
import { trackError } from '@tcp/core/src/utils/errorReporter.util';
import FallbackErrorComponent from './ErrorFallbackComponent';
import { DEFAULT_CLASS_NAME, LIFECYCLE_METHODS } from './config';

/**
 * Generate error component
 * @param {object} error
 * @param {string} componentName
 */
const renderErrorComponent = (error, componentName) => {
  return React.createElement(
    'div',
    {
      className: DEFAULT_CLASS_NAME,
    },
    FallbackErrorComponent.call(this, { errorMessage: error.message, componentName })
  );
};

const logError = ({ error, errorInfo }) => {
  trackError({
    error,
    extraData: {
      errorInfo,
    },
    tags: {
      component: 'ERROR_BOUNDARY',
    },
  });
};

/**
 * Generate error safe client component
 * @param {function} renderComponent generate component render
 * @param {string} componentName
 */
const renderClientSafeComponent = (renderComponent, componentName) => {
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
      // eslint-disable-next-line no-console
      console.log(error, errorInfo);
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
const functionalSafeComponent = WrappedComponent => {
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
const wrapMethod = (methodName, WrappedComponent) => {
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
      if (methodName === 'render') {
        logError({ error: err, errorInfo: WrappedComponent.name });
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
 * Generate error safe component
 * @param {*} WrappedComponent
 */
const SafeComponent = WrappedComponent => {
  if (!WrappedComponent.prototype.render) {
    return functionalSafeComponent(WrappedComponent);
  }
  LIFECYCLE_METHODS.forEach(method => wrapMethod(method, WrappedComponent));
  const renderComponent = passedProps => <WrappedComponent {...passedProps} />;
  return renderClientSafeComponent(renderComponent, WrappedComponent.name);
};

export default SafeComponent;
