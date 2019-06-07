import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CarouselConfig from '@tcp/web/config';
import { NavBar, SampleCarousel } from '../molecules';

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <SampleCarousel props={CarouselConfig.CAROUSEL_OPTIONS} />
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.arrayOf.isRequired,
};

export default HomePageView;
