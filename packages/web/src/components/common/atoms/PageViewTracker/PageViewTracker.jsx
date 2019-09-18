import { useEffect } from 'react';
import { string, node, func } from 'prop-types';
import { connect } from 'react-redux';
import { usePageTracking } from '@tcp/core/src/analytics';

function PageViewTracker({ name, children, dispatch }) {
  const track = usePageTracking(dispatch);

  useEffect(() => {
    track(name);
  }, [name]);

  return children;
}

PageViewTracker.propTypes = {
  name: string,
  dispatch: func.isRequired,
  children: node,
};

PageViewTracker.defaultProps = {
  name: '',
  children: null,
};

export default connect()(PageViewTracker);
