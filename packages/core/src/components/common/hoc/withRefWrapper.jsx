import React, { forwardRef } from 'react';

/**
 * This HOC is only needed for components that are either class-based or have no
 * convenient parent element to use forwardRef with. This should be used sparingly.
 *
 * @param {React.Component} Component base component
 * @param {String} RootElement element or component to use as a wrapper
 * @param {String} displayName HOC display name
 */
export default function withRefWrapper(Component, RootElement = 'div', displayName = '') {
  const HOC = forwardRef((props, ref) => (
    <RootElement ref={ref}>
      <Component {...props} />
    </RootElement>
  ));
  HOC.displayName = displayName || `withRefWrapper(${Component.displayName || Component.name})`;
  return HOC;
}
