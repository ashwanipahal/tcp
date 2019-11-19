import React, { forwardRef, useEffect } from 'react';
import { string, node, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { useClickTracking, useSetAnalyticsDataOnClick } from '@tcp/core/src/analytics';

/**
 * This component can be used for dispatching click
 * tracking actions when it or its associated ref
 * element receives click events. This can be used with
 * or without children. If used without children, a ref
 * should be passed to it.
 *
 * @example
 * <ClickTracker name="brand_logo">
 *   <BrandLogo />
 * </ClickTracker>
 *
 * @example
 * const logo = useRef()
 * <BrandLogo ref={logo} />
 * <ClickTracker name="brand_logo" ref={logo} />
 */
const ClickTracker = forwardRef(
  ({ as: Component, name, clickData, pageData, children, dispatch, ...props }, ref) => {
    const track = useClickTracking(dispatch);
    const setAnalyticsDataOnClick = useSetAnalyticsDataOnClick(dispatch);

    const handleClick = () => {
      if (clickData) {
        setAnalyticsDataOnClick(clickData);
      }
      track(name);
      if (clickData) {
        setAnalyticsDataOnClick({});
      }
    };

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
  }
);

ClickTracker.propTypes = {
  as: string,
  name: string,
  children: node,
  clickData: shape({}),
  pageData: shape({}),
  dispatch: func.isRequired,
};

ClickTracker.defaultProps = {
  as: 'div',
  name: '',
  children: null,
  clickData: null,
  pageData: null,
};

export default connect()(ClickTracker);
