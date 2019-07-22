import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import ModuleK from '@tcp/core/src/components/common/molecules/ModuleK';
import moduleKMock from '@tcp/core/src/services/abstractors/common/moduleK/mock';
import SlotA from '../molecules/SlotA';
import SlotB from '../molecules/SlotB';

const HomePageView = props => {
  const { slot_1: slotA, slot_2: slotB } = props;
  return (
    <Fragment>
      <SlotA {...slotA} />
      <SlotB {...slotB} />
      <ModuleK {...moduleKMock.moduleK.composites} />
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
