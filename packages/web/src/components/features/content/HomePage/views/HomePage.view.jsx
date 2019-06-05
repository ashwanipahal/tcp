import React, { Fragment } from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { PropTypes } from 'prop-types';
import { NavBar, Test } from '../molecules';

// colCount is the number of columns the component needs to cover in each of the viewport
const colSize = {
  small: 1,
  medium: 1,
  large: 1,
  xlarge: 1,
};

const colSize1 = {
  small: 1,
  medium: 1,
  large: 1,
  xlarge: 1,
};

const colSize2 = {
  small: 1,
  medium: 1,
  large: 1,
  xlarge: 1,
};

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <Test className="test" />
    <Grid>
      <Row>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="variable-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize1}>
          <Anchor redirectTo="/to" anchorVariation="primary">
            <a href="/test">sfdsdsd</a>
          </Anchor>
        </Col>
        <Col colSize={colSize2}>Random line5 takes 1 col in desktop</Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
      </Row>
    </Grid>
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.string.isRequired,
};
export default HomePageView;
