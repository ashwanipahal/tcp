import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';
import { SlotA, SlotB, SlotC, SlotD } from '../molecules';

const HomePageView = props => {
  const { slot_1: slotA, slot_2: slotB, slot_3: slotC, slot_4: slotD } = props;
  return (
    <Fragment>
      <GetCandid />
      <SlotA {...slotA} />
      <SlotB {...slotB} />
      <SlotC {...slotC} />
      <SlotD {...slotD} />
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
  slot_3: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_4: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
};

HomePageView.defaultProps = {
  slot_1: {},
  slot_2: {},
  slot_3: {},
  slot_4: {},
};

export default errorBoundary(HomePageView);
