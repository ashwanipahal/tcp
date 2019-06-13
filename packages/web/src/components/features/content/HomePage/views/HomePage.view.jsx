import React, { Fragment } from 'react';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import Image from '@tcp/core/src/components/common/atoms/Image';

const HomePageView = () => (
  <Fragment>
    <Image src="/static/images/hero.png" />
  </Fragment>
);

export default errorBoundary(HomePageView);
