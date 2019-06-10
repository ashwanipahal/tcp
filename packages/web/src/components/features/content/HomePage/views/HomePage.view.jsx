import React, { Fragment } from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Accordion from '@tcp/core/src/components/common/molecules/Accordion';

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

const colSize1 = {
  small: 2,
  medium: 8,
  large: 2,
  xlarge: 2,
};

const colSize2 = {
  small: 2,
  medium: 8,
  large: 1,
  xlarge: 1,
};

const randomHTML = '<button class="asdfasdf" type="button">test133</button>';
const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <Accordion className={'Collapsible'} children={'AAAA'} title={'test'} />
    <Test className="test" />
    <Grid>
      <Row>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="variable-width">test1</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width" fullWidth>
            test
          </Button>
        </Col>
        <Col colSize={colSize1}>
          <Anchor to="/to" anchorVariation="primary" fontSizeVariation="large" noLink="false">
            ABCD
          </Anchor>
        </Col>
        <Col colSize={colSize2}>Random line5 takes 1 col in desktop</Col>
        <Col colSize={colSize}>
          <RichText richTextHtml={randomHTML} />
        </Col>
        <Col
          colSize={{
            small: 1,
            medium: 1,
            large: 3,
          }}
        >
          <TextBox id="abcd" name="abcdee" textIcon="icon-sms" />
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
    <SampleCarousel props={CarouselConfig.CAROUSEL_OPTIONS} />
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.arrayOf.isRequired,
};

export default HomePageView;
