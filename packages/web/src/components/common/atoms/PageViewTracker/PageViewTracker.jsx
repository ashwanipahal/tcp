import { useEffect } from 'react';
import { string, node, func } from 'prop-types';
import { connect } from 'react-redux';
import { usePageTracking } from '@tcp/core/src/analytics';

/**
 * This component can be used to dispatch page tracking
 * actions when it mounts. This should only be used for
 * cases where the `RouteTracker` is insufficient. For
 * example, when we need to track a certain area of the
 * UI as a "page" even when it acts independently from
 * the route URL (e.g., modal dialogs).
 *
 * @example
 * <SomeModal>
 *   <PageViewTracker name="some_modal">
 *     <div>Modal contents</div>
 *   </PageViewTracker>
 * </SomeModal>
 *
 * @example
 * <SomeModal>
 *   <PageViewTracker name="some_modal" />
 *   <div>Modal contents</div>
 * </SomeModal>
 */
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
