import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import Image from '@tcp/core/src/components/common/atoms/Image';
import ModuleD from '@tcp/core/src/components/common/molecules/ModuleD';

const HomePageView = props => {
  const { slot_1: slot1 } = props;
  return (
    <Fragment>
      <Image src="/static/images/hero.png" />
      <ModuleD {...slot1} />
    </Fragment>
  );
};

HomePageView.propTypes = {
  slot_1: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }).isRequired,
};

export default errorBoundary(HomePageView);
