import React, { forwardRef } from 'react';

export default function withRefWrapper(Component, RootElement = 'div', displayName = '') {
  const HOC = forwardRef((props, ref) => (
    <RootElement ref={ref}>
      <Component {...props} />
    </RootElement>
  ));
  HOC.displayName = displayName || `withRefWrapper(${Component.displayName || Component.name})`;
  return HOC;
}
