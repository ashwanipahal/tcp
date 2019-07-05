import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';

const HomePageView = props => {
  const { slot_1: slotA, slot_2: slotB } = props;
  console.log(slotA);
  console.log(slotB);

  return (
    <Fragment>
      <h1>Hello App.</h1>
    </Fragment>
  );
};

HomePageView.propTypes = {
  slot_1: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_2: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
};

HomePageView.defaultProps = {
  slot_1: {},
  slot_2: {},
};

export default errorBoundary(HomePageView);
