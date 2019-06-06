import React, { Fragment } from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import CarouselConfig from '@tcp/web/config';
import { PropTypes } from 'prop-types';
import { Accordion, NavBar, SampleCarousel, Test } from '../molecules';

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
    <Accordion className={'Collapsible'} children={'AAAA'} title={'test'} />
    <Test className="test" />
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.array.isRequired,
};
export default HomePageView;
