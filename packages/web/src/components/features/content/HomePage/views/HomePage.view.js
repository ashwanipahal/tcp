import React, { Fragment } from 'react';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Grid from '../../../../common/atoms/Grid';
import { NavBar, Test } from '../molecules';

// colCount is the number of columns the component needs to cover in each of the viewport
const config = {
  colCount: {
    small: 2,
    medium: 8,
    large: 3,
    xlarge: 3
  }
};

const config1 = {
  colCount: {
    small: 2,
    medium: 8,
    large: 2,
    xlarge: 2
  }
};

const config2 = {
  colCount: {
    small: 2,
    medium: 8,
    large: 1,
    xlarge: 1
  }
};

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <Test className="test" />
    <Grid>
      <Row noFlex>
        <Col isColInlineBlock colConfig={config}>Random line1 takes 3 col in desktop</Col>
        <Col isColInlineBlock colConfig={config}>Random line2 takes 3 col in desktop</Col>
        <Col isColInlineBlock colConfig={config}>Random line3 takes 3 col in desktop</Col>
        <Col isColInlineBlock colConfig={config1}>Random line4 takes 2 col in desktop</Col>
        <Col isColInlineBlock colConfig={config2}>Random line5 takes 1 col in desktop</Col>
      </Row>
    </Grid>
  </Fragment>
);

export default HomePageView;
