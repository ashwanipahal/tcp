import React from 'react';
import PropTypes from 'prop-types';

import { Carousel, LinkText, style } from '../ModuleA.style';
import { DamImage, Col, Row } from '../../../atoms';
import { PromoBanner } from '../..';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../config';

import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

const ModuleA = props => {
  const { largeCompImageCarousel, className } = props;

  const { CAROUSEL_OPTIONS } = config;

  CAROUSEL_OPTIONS.prevArrow = (
    <button type="button" data-locator="moduleA_left_arrow" className="slick-prev" />
  );
  CAROUSEL_OPTIONS.nextArrow = (
    <button type="button" data-locator="moduleA_right_arrow" className="slick-prev" />
  );
  CAROUSEL_OPTIONS.hidePlayPause = largeCompImageCarousel.length === 1;

  return (
    <Row className={className}>
      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
      >
        <Carousel
          options={CAROUSEL_OPTIONS}
          carouselConfig={{
            autoplay: true,
            dataLocatorPlay: getLocator('moduleK_play_button'),
            dataLocatorPause: getLocator('moduleK_pause_button'),
            customArrowLeft: getIconPath('carousel-big-carrot'),
            customArrowRight: getIconPath('carousel-big-carrot'),
          }}
        >
          {largeCompImageCarousel.map(item => {
            const {
              headerText,
              linkedImage: [linkedImage],
              promoBanner,
            } = item;
            return (
              <div className="banner-slide">
                <DamImage imgData={linkedImage.image} />
                <div className="banner-content">
                  <LinkText
                    fontWeight="black"
                    fontSize="fs52"
                    textAlign="center"
                    headerText={headerText}
                    dataLocator={getLocator('moduleA_header_text')}
                  />
                  <PromoBanner
                    promoBanner={promoBanner}
                    className="moduleA__promoBanner"
                    data-locator={getLocator('moduleA_promobanner_text')}
                    fontSize="fs48"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
};

ModuleA.defaultProps = {
  largeCompImageCarousel: [],
  className: '',
};

ModuleA.propTypes = {
  largeCompImageCarousel: PropTypes.shape([]),
  className: PropTypes.string,
};

export default errorBoundary(withStyles(ModuleA, style));
export { ModuleA as ModuleAVanilla };
