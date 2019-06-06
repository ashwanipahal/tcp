import React, { Fragment } from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import CarouselConfig from '@tcp/web/config';
import { PropTypes } from 'prop-types';
import { NavBar, SampleCarousel, Test } from '../molecules';

// colCount is the number of columns the component needs to cover in each of the viewport
const colSize = {
  small: 2,
  medium: 8,
  large: 3,
  xlarge: 3,
};
const offsetRight = {
  small: 2,
  medium: 2,
  large: 4,
  xlarge: 4,
};

const colSize1 = {
  small: 2,
  medium: 8,
  large: 2,
  xlarge: 2,
};

const offsetLeft1 = {
  large: 2,
  xlarge: 2,
};

const colSize2 = {
  small: 2,
  medium: 8,
  large: 1,
  xlarge: 1,
};

const offsetLeft2 = {
  small: 2,
  medium: 2,
};

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <Test className="test" />
    <Grid>
      <Row noFlex>
        <Col isColInlineBlock colSize={colSize} offsetRight={offsetRight}>
          Random line1 takes 3 col in desktop
        </Col>
        <Col isColInlineBlock colSize={colSize} offsetLeft={offsetRight}>
          Random line2 takes 3 col in desktop
        </Col>
        <Col isColInlineBlock colSize={colSize} offsetLeft={offsetRight}>
          Random line3 takes 3 col in desktop
        </Col>
        <Col isColInlineBlock colSize={colSize1} offsetLeft={offsetLeft1}>
          Random line4 takes 2 col in desktop
        </Col>
        <Col isColInlineBlock colSize={colSize2} offsetLeft={offsetLeft2}>
          Random line5 takes 1 col in desktop
        </Col>
      </Row>
    </Grid>
    <SampleCarousel props={CarouselConfig.CAROUSEL_OPTIONS} />
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.string.isRequired,
};
export default HomePageView;
