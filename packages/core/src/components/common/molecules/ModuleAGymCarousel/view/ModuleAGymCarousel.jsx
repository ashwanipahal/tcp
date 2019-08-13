import React from 'react';
import PropTypes from 'prop-types';

import { Carousel, LinkText, style } from '../ModuleAGymCarousel.style';
import { DamImage } from '../../../atoms';
import { PromoBanner, ButtonList } from '../..';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../ModuleAGymCarousel.config';

import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

const bigCarrotIcon = 'carousel-big-carrot';

class ModuleAGymCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRibbonLeftAligned: false,
    };
  }

  componentDidMount() {
    this.setRibbonPosition(0);
  }

  setRibbonPosition = index => {
    const { largeCompImageCarousel } = this.props;
    const [ribbonBanner] = largeCompImageCarousel[index].ribbonBanner;
    if (ribbonBanner.position === 'left') {
      this.setState({ isRibbonLeftAligned: true });
    } else {
      this.setState({ isRibbonLeftAligned: false });
    }
  };

  onSlideChange = index => {
    this.setRibbonPosition(index);
  };

  render() {
    const { largeCompImageCarousel, className, ctaItems, ctaType } = this.props;
    const { isRibbonLeftAligned } = this.state;

    const { CAROUSEL_OPTIONS } = config;

    CAROUSEL_OPTIONS.prevArrow = (
      <button type="button" data-locator="moduleA_left_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.nextArrow = (
      <button type="button" data-locator="moduleA_right_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.hidePlayPause = largeCompImageCarousel.length === 1;
    CAROUSEL_OPTIONS.afterChange = this.onSlideChange;

    return (
      <div className={`${className} ${isRibbonLeftAligned ? 'left-aligned-ribbon' : ''}`}>
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
              ribbonBanner,
            } = item;

            return (
              <div className="banner-slide" key={linkedImage.image.alt.replace(/\s/g, '_')}>
                <DamImage
                  className={`moduleA_image_${i}`}
                  imgData={linkedImage.image}
                  imgConfigs={config.IMG_DATA.crops}
                />
                <div className="banner-content">
                  <LinkText
                    fontWeight="black"
                    fontSize={['fs36', 'fs36', 'fs64']}
                    headerText={headerText}
                    className="link-text-wrapper"
                    data-locator={`${getLocator('moduleA_header_text')}${i}`}
                  />
                  <PromoBanner
                    promoBanner={promoBanner}
                    className="moduleA__promoBanner"
                    data-locator={`${getLocator('moduleA_promobanner_text')}${i}`}
                    color="white"
                    fontSize={['fs16', 'fs16', 'fs28']}
                  />
                </div>
                <div className="ribbon-container">
                  <PromoBanner
                    promoBanner={ribbonBanner}
                    className="moduleA__ribbonBanner"
                    data-locator={`${getLocator('moduleA_ribbon_promobanner_text')}${i}`}
                    fontSize="fs48"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
        <div className="bottom-blue-bar">
          <div className={`button-list-container ${ctaType}`}>
            <ButtonList buttonsData={ctaItems} buttonListVariation={ctaType} />
          </div>
        </div>
      </div>
    );
  }
}

ModuleAGymCarousel.defaultProps = {
  largeCompImageCarousel: [],
  ctaType: 'linkCTAList',
  ctaItems: [],
  className: '',
};

ModuleAGymCarousel.propTypes = {
  largeCompImageCarousel: PropTypes.arrayOf(PropTypes.shape({})),
  ctaType: PropTypes.oneOf(['stackedCTAList', 'linkCTAList', 'scrollCTAList', 'imageCTAList']),
  ctaItems: PropTypes.shape([]),
  className: PropTypes.string,
};

export default errorBoundary(withStyles(ModuleAGymCarousel, style));
export { ModuleAGymCarousel as ModuleAGymCarouselVanilla };
