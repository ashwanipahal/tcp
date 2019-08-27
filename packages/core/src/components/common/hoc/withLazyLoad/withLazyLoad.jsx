import React from 'react';
import ReactComponentLazyLoader from 'react-component-lazy-loader';
import { DEFAULT_LAZY_LOAD_CONFIG } from './lazyLoad.config';

/**
 * @summary An HOC to load component/image/picture when it appears in view port.
 * @param {Object} WrappedComponent - Component which needs to be lazily loaded.
 *  WrappedComponent must have a static property lazyLoadConfig in object shape,
 *  if any default config of Lazyload component needs to be over-ridden.
 *  @returns {Function} - returns a new component around which the LazyComponent is wrapped.
 */
export const withLazyLoad = WrappedComponent => {
  return props => {
    const componentProps = WrappedComponent.lazyLoadConfig || {};
    const lazyLoadProps = { ...DEFAULT_LAZY_LOAD_CONFIG, ...componentProps };
    return (
      <ReactComponentLazyLoader {...lazyLoadProps}>
        <WrappedComponent {...props} />
      </ReactComponentLazyLoader>
    );
  };
};

export default withLazyLoad;
