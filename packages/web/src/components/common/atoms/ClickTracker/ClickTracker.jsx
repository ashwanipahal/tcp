import React, { forwardRef, useEffect } from 'react';
import { string, node, func } from 'prop-types';
import { connect } from 'react-redux';
import { useClickTracking } from '@tcp/core/src/analytics';

const ClickTracker = forwardRef(({ as: Component, name, children, dispatch, ...props }, ref) => {
  const track = useClickTracking(dispatch);
  const handleClick = () => track(name);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // If a ref us supplied, then track its click events.
    if (ref) {
      const target = ref.current;
      target.addEventListener('click', handleClick);
      return () => target.removeEventListener('click', handleClick);
    }
  }, [ref]);

  // If children are supplied, assume we want to track bubbling click events.
  return children ? (
    <Component onClick={handleClick} {...props}>
      {children}
    </Component>
  ) : null;
});

ClickTracker.propTypes = {
  as: string,
  name: string,
  children: node,
  dispatch: func.isRequired,
};

ClickTracker.defaultProps = {
  as: 'div',
  name: '',
  children: null,
};

export default connect()(ClickTracker);
