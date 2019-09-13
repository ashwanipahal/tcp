import React from 'react';
import PropTypes from 'prop-types';

import { Carousel, LinkText, style } from '../ModuleA.style';
import { Col, Row, DamImage } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import { PromoBanner, ButtonList } from '../..';
import { getIconPath, getLocator, isGymboree } from '../../../../../utils';

import config from '../ModuleA.config';

const bigCarrotIcon = 'carousel-big-carrot';
const bigCarrotIconGym = 'carousel-big-carrot-white';

const { ctaTypes, CAROUSEL_OPTIONS, IMG_DATA_TCP, IMG_DATA_GYM } = config;

class ModuleA extends React.Component {
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
    if (ribbonBanner.ribbonPlacement === 'left') {
      this.setState({ isRibbonLeftAligned: true });
    } else {
      this.setState({ isRibbonLeftAligned: false });
    }
  };

  onSlideChange = index => {
    this.setRibbonPosition(index);
  };

  render() {
    const { largeCompImageCarousel, ctaItems, ctaType, className } = this.props;
    const buttonListCtaType = ctaTypes[ctaType];
    const { isRibbonLeftAligned } = this.state;
    const isLinkList = buttonListCtaType === 'linkCTAList';
    const carouselIcon = isGymboree() ? bigCarrotIconGym : bigCarrotIcon;

    CAROUSEL_OPTIONS.prevArrow = (
      <button type="button" data-locator="moduleA_left_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.nextArrow = (
      <button type="button" data-locator="moduleA_right_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.hidePlayPause = largeCompImageCarousel.length === 1;

    return (
      <Row
        className={`${className} ${isGymboree() ? 'gymboree-module-a' : ''} ${
          isRibbonLeftAligned ? 'left-aligned-ribbon' : ''
        } moduleA`}
        fullBleed={{ small: true, medium: true, large: false }}
      >
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          <div>
            <Carousel
              options={CAROUSEL_OPTIONS}
              carouselConfig={{
                autoplay: true,
                dataLocatorCarousel: getLocator('carousel_banner'),
                dataLocatorPlay: getLocator('moduleA_play_button'),
                dataLocatorPause: getLocator('moduleA_pause_button'),
                customArrowLeft: getIconPath(carouselIcon),
                customArrowRight: getIconPath(carouselIcon),
              }}
            >
              {largeCompImageCarousel.map((item, i) => {
                const {
                  headerText,
                  linkedImage: [linkedImage],
                  promoBanner,
                  ribbonBanner,
                } = item;
                const imageConfig = isGymboree() ? IMG_DATA_GYM : IMG_DATA_TCP;
                return (
                  <div className="banner-slide">
                    <DamImage
                      imgData={linkedImage.image}
                      alt=""
                      imgConfigs={imageConfig}
                      data-locator={`${getLocator('moduleA_image')}${i}`}
                    />
                    <div className="banner-content">
                      <LinkText
                        type="heading"
                        component="h2"
                        fontSize={isLinkList ? ['fs32', 'fs32', 'fs64'] : 'fs16'}
                        headerText={headerText}
                        color={isGymboree() ? 'white' : ''}
                        className="link-text-wrapper"
                        dataLocator={`${getLocator('moduleA_header_text')}${i}`}
                      />
                      {promoBanner && (
                        <PromoBanner
                          promoBanner={promoBanner}
                          className="moduleA__promoBanner"
                          data-locator={`${getLocator('moduleA_promobanner_text')}${i}`}
                          fontSize="fs48"
                        />
                      )}
                    </div>
                    {ribbonBanner && (
                      <div className="ribbon-container">
                        <PromoBanner
                          promoBanner={ribbonBanner}
                          className="moduleA__ribbonBanner"
                          data-locator={`${getLocator('moduleA_ribbon_promobanner_text')}${i}`}
                          fontSize="fs48"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </Carousel>

            <div className={`button-list-container ${buttonListCtaType}`}>
              <ButtonList
                buttonsData={ctaItems}
                buttonListVariation={buttonListCtaType}
                dataLocatorDivisionImages={getLocator('moduleA_cta_image')}
                dataLocatorTextCta={getLocator('moduleA_cta_links')}
              />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

ModuleA.defaultProps = {
  largeCompImageCarousel: [],
  ctaItems: [],
  ctaType: 'stackedCTAList',
  className: '',
};

ModuleA.propTypes = {
  largeCompImageCarousel: PropTypes.shape([]),
  ctaItems: PropTypes.shape([]),
  ctaType: PropTypes.oneOf(['stackedCTAList', 'linkCTAList', 'scrollCTAList', 'imageCTAList']),
  className: PropTypes.string,
};

export default withStyles(errorBoundary(ModuleA), style);
export { ModuleA as ModuleAVanilla };
