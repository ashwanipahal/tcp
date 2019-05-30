import React, { Fragment } from 'react';
import Grid from '../../../../common/atoms/Grid';
import Col from '../../../../common/atoms/Col';
import { NavBar, Test } from '../molecules';

const config = {
  colCount: {
    small: 2,
    medium: 6,
    large: 3,
    xlarge: 3,
  },
  offset: {
    small: 2,
    medium: 2,
    large: 2,
    xlarge: 2,
  },
};

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <Test className="test" />
    <Grid>
      <Col colConfig={config}>AVXD</Col>
      <Col colConfig={config}>DFEW</Col>
      <Col colConfig={config}>RTFEE</Col>
      <Col colConfig={config}>FGGEE</Col>
      <Col colConfig={config}>GDFDV</Col>
      <Col colConfig={config}>FGBFF</Col>
    </Grid>
  </Fragment>
);

export default HomePageView;
