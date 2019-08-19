import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';

import { SlotA, SlotB, SlotC, SlotD, SlotE, SlotF } from '../molecules';
import mock from '../../../../../../../core/src/services/abstractors/common/moduleN/mock';

const HomePageView = props => {
  const { slot_1: slotA, slot_2: slotB, slot_3: slotC, slot_4: slotD, slot_5: slotE } = props;

  return (
    <Fragment>
      <SlotA {...slotA} />
      <SlotB {...slotB} />
      <SlotC {...slotC} />
      <SlotD {...slotD} />
      <SlotE {...slotE} />
      <SlotF name="moduleN" {...mock.moduleN.composites} set={mock.moduleN.set} />
      <GetCandid />
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
  slot_5: PropTypes.shape({
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
  slot_5: {},
};

export default errorBoundary(HomePageView);
