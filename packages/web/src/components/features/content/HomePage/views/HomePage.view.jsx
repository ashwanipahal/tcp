import React, { Fragment } from 'react';
import { NavBar, Test } from '../molecules';

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <Test className="test" />
  </Fragment>
);

export default HomePageView;
