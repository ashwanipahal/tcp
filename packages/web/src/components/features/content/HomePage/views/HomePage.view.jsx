import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CarouselConfig from '@tcp/web/config';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Row from '@tcp/core/src/components/common/atoms/Row';

import TextBoxVanilla from '@tcp/core/src/components/common/atoms/TextBox';
import { NavBar, SampleCarousel } from '../molecules';

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <SampleCarousel props={CarouselConfig.CAROUSEL_OPTIONS} />
    <Grid>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 8 }}>
          <TextBoxVanilla id="abcd" name="abcdee" />
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 6 }}>
          <input id="fcdd" name="ddde" />
        </Col>
      </Row>
    </Grid>
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.arrayOf.isRequired,
};

export default HomePageView;
