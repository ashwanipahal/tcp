import React from 'react';
import PropTypes from 'prop-types';

import { Carousel, LinkText, style } from '../ModuleATcpCarousel.style';
import { DamImage } from '../../../atoms';
import { PromoBanner, ButtonList } from '../..';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../ModuleATcpCarousel.config';

import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

const bigCarrotIcon = 'carousel-big-carrot';

const ModuleATcpCarousel = props => {
  const { largeCompImageCarousel, ctaItems, ctaType, className } = props;

  const { CAROUSEL_OPTIONS } = config;

  CAROUSEL_OPTIONS.prevArrow = (
    <button type="button" data-locator="moduleA_left_arrow" className="slick-prev" />
  );
  CAROUSEL_OPTIONS.nextArrow = (
    <button type="button" data-locator="moduleA_right_arrow" className="slick-prev" />
  );
  CAROUSEL_OPTIONS.hidePlayPause = largeCompImageCarousel.length === 1;

  return (
    <div className={className}>
      <Carousel
        options={CAROUSEL_OPTIONS}
        carouselConfig={{
          autoplay: true,
          dataLocatorPlay: getLocator('moduleA_play_button'),
          dataLocatorPause: getLocator('moduleA_pause_button'),
          customArrowLeft: getIconPath(bigCarrotIcon),
          customArrowRight: getIconPath(bigCarrotIcon),
        }}
      >
        {largeCompImageCarousel.map((item, i) => {
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
                  fontSize={['fs36', 'fs36', 'fs52']}
                  headerText={headerText}
                  className="link-text-wrapper"
                  data-locator={`${getLocator('moduleA_header_text')}${i}`}
                />
                <PromoBanner
                  promoBanner={promoBanner}
                  className="moduleA__promoBanner"
                  data-locator={`${getLocator('moduleA_promobanner_text')}${i}`}
                  fontSize="fs48"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
      <div className={`button-list-container ${ctaType}`}>
        <ButtonList buttonsData={ctaItems} buttonListVariation={ctaType} />
      </div>
    </div>
  );
};

ModuleATcpCarousel.defaultProps = {
  largeCompImageCarousel: [],
  ctaItems: [],
  ctaType: 'stackedCTAList',
  className: '',
};

ModuleATcpCarousel.propTypes = {
  largeCompImageCarousel: PropTypes.shape([]),
  ctaItems: PropTypes.shape([]),
  ctaType: PropTypes.oneOf(['stackedCTAList', 'linkCTAList', 'scrollCTAList', 'imageCTAList']),
  className: PropTypes.string,
};

export default errorBoundary(withStyles(ModuleATcpCarousel, style));
export { ModuleATcpCarousel as ModuleATcpCarouselVanilla };
