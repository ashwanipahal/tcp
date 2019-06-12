import React, { Fragment } from 'react';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';

const HomePageView = () => <Fragment>Home Page</Fragment>;

export default errorBoundary(HomePageView);
