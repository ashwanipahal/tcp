/* eslint-disable react/prop-types */
/* eslint-disable complexity */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, DamImage, Row, Button, Anchor } from '../../../atoms';
import { ButtonList, LinkText, PromoBanner } from '../..';

import withStyles from '../../../hoc/withStyles';
import moduleEStyle, { Carousel } from '../styles/ModuleE.style';
import { getLocator, getIconPath, isGymboree } from '../../../../../utils';
import config from '../moduleE.config';

const bigCarrotIcon = 'carousel-big-carrot';
const bigCarrotIconGym = 'carousel-big-carrot-white';

const CarouselArrow = ({ arrowType, label, onClick }) => {
  return (
    <button
      type="button"
      tabIndex="0"
      aria-label={label}
      data-locator={`moduleE_${arrowType}_arrow`}
      className={`carousel-nav-arrow-button carousel-nav-${arrowType}-button`}
      onClick={onClick}
    >
      <svg width="15" height="52">
        <path
          fill="#1A1A1A"
          d="M.113 50.539a1 1 0 001.774.923l13-25a1 1 0 000-.923l-13-25a1 1 0 10-1.774.923L12.873 26 .113 50.54z"
        />
      </svg>
    </button>
  );
};

const Divider = ({ position }) => {
  return (
    <Col
      colSize={{
        small: 6,
        medium: 8,
        large: 12,
      }}
      ignoreGutter={{
        small: true,
        medium: true,
        large: true,
      }}
    >
      <Row
        fullBleed={{
          small: false,
          medium: false,
          large: true,
        }}
      >
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          <div className={`module-e-divider module-e-divider-${position}`} />
        </Col>
      </Row>
    </Col>
  );
};

const ModuleE = props => {
  const {
    className,
    eyebrow: [eyebrow] = [],
    headerText,
    promoBanner,
    largeCompImageSimpleCarousel,
    ctaItems,
    ctaType,
    carouselCtaType,
    divCTALinks,
    linkedImage: [linkedImage] = [],
    accessibility: { playIconButton, pauseIconButton, previousButton, nextIconButton } = {},
  } = props;
  const { mediaLinkedList: eyebrowMediaLinkedList, promoBanner: eyebrowPromoBanner } =
    eyebrow || {};

  const { ctaTypes, IMG_DATA, CAROUSEL_OPTIONS } = config;
  const buttonListCtaType = ctaTypes[ctaType];
  const carouselIcon = isGymboree() ? bigCarrotIconGym : bigCarrotIcon;
  const [curCarouselSlideIndex, setCurCarouselSlideIndex] = useState(0);

  const carouselConfig = {
    autoplay: true,
    dataLocatorPlay: getLocator('moduleE_play_button'),
    dataLocatorPause: getLocator('moduleE_pause_button'),
    customArrowLeft: getIconPath(carouselIcon),
    customArrowRight: getIconPath(carouselIcon),
    dataLocatorCarousel: 'carousel_banner',
  };

  CAROUSEL_OPTIONS.prevArrow = <CarouselArrow arrowType="prev" label={previousButton} />;
  CAROUSEL_OPTIONS.nextArrow = <CarouselArrow arrowType="next" label={nextIconButton} />;
  carouselConfig.autoplay = carouselConfig.autoplay && largeCompImageSimpleCarousel.length > 1;
  carouselConfig.pauseIconButtonLabel = pauseIconButton;
  carouselConfig.playIconButtonLabel = playIconButton;

  CAROUSEL_OPTIONS.afterChange = index => {
    setCurCarouselSlideIndex(index);
  };

  return (
    <Row
      className={className}
      fullBleed={{
        small: true,
        medium: true,
      }}
    >
      {eyebrow ? null : <Divider position="top" />}

      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
        ignoreGutter
      >
        {/* ---------- Eyebrow Image Start ----------- */}
        {eyebrow && (
          <Row fullBleed>
            <Col
              colSize={{
                small: 2,
                medium: 3,
                large: 5,
              }}
              ignoreGutter
            >
              <DamImage
                imgConfigs={IMG_DATA.eyeBrowImgConfig}
                imgData={eyebrowMediaLinkedList[0].image}
                data-locator={`${getLocator('moduleE_eyebrowImage_img')}_left`}
                link={eyebrowMediaLinkedList[0].link}
                className="module-e-img-full-width"
              />
            </Col>
            <Col
              colSize={{
                small: 2,
                medium: 2,
                large: 2,
              }}
              ignoreGutter
            >
              <PromoBanner
                promoBanner={eyebrowPromoBanner}
                dataLocator={getLocator('moduleE_eyebrow_text')}
              />
            </Col>
            <Col
              colSize={{
                small: 2,
                medium: 3,
                large: 5,
              }}
              ignoreGutter
            >
              <DamImage
                imgConfigs={IMG_DATA.eyeBrowImgConfig}
                imgData={eyebrowMediaLinkedList[1].image}
                data-locator={`${getLocator('moduleE_eyebrowImage_img')}_right`}
                link={eyebrowMediaLinkedList[1].link}
                className="module-e-img-full-width"
              />
            </Col>
          </Row>
        )}
        {/* ---------- Eyebrow Image End ----------- */}

        {/* ---------- Header Text Start ----------- */}
        <LinkText
          className="module-e-header-text"
          headerText={headerText}
          dataLocator={getLocator('moduleE_header_text')}
        />
        {/* ---------- Header Text End ----------- */}

        {/* ---------- Promo Text Start ----------- */}
        {promoBanner && (
          <PromoBanner promoBanner={promoBanner} dataLocator={getLocator('moduleE_header_text')} />
        )}
        {/* ---------- Promo Text End ----------- */}

        {/* ----------- Promo Image Area Start----------- */}
        {linkedImage && (
          <Anchor
            dataLocator={`${getLocator('moduleE_promo_area_img_cta')}`}
            className={`promo-area-image-link ${
              carouselCtaType === 'button' ? 'promo-area-image-link-spaced' : ''
            }`}
            url={linkedImage.link.url}
          >
            <DamImage
              imgConfigs={IMG_DATA.promoAreaImgConfig}
              imgData={linkedImage.image}
              data-locator={`${getLocator('moduleE_promo_area_img')}`}
              className="module-e-img-full-width"
            />
          </Anchor>
        )}
        {/* ----------- Promo Image Area End----------- */}

        {/* ---------- Carousel Image layout Start ----------- */}
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 8,
            }}
          >
            <Carousel options={CAROUSEL_OPTIONS} carouselConfig={carouselConfig}>
              {largeCompImageSimpleCarousel.map(({ image, singleCTAButton }, index) => {
                const { url, text } = singleCTAButton || {};
                return (
                  <div>
                    <DamImage
                      imgConfigs={IMG_DATA.carouselImgConfig}
                      imgData={image}
                      data-locator={`${getLocator('moduleE_small_image_img')}${index + 1}`}
                      className="module-e-img-full-width"
                    />
                    {carouselCtaType === 'link' && singleCTAButton && (
                      <Anchor
                        dataLocator={`${getLocator('moduleE_small_image_cta')}${index + 1}`}
                        className="carousel-cta-link"
                        url={url}
                        title={text}
                        underline
                      >
                        {text}
                      </Anchor>
                    )}
                  </div>
                );
              })}
            </Carousel>

            {carouselCtaType === 'button' &&
              largeCompImageSimpleCarousel[curCarouselSlideIndex].singleCTAButton && (
                <Row
                  fullBleed={{
                    small: !!eyebrow,
                    medium: false,
                    large: true,
                  }}
                >
                  <Col
                    colSize={{
                      small: 6,
                      medium: 8,
                      large: 12,
                    }}
                  >
                    <Button
                      buttonVariation="fixed-width"
                      dataLocator={`${getLocator(
                        'moduleE_small_image_cta'
                      )}${curCarouselSlideIndex}`}
                      className={`carousel-cta-button ${
                        eyebrow ? 'carousel-cta-button-with-eybrow-img' : ''
                      }`}
                      cta={largeCompImageSimpleCarousel[curCarouselSlideIndex].singleCTAButton}
                    >
                      {largeCompImageSimpleCarousel[curCarouselSlideIndex].singleCTAButton.text}
                    </Button>
                  </Col>
                </Row>
              )}

            {/* ---------- Cta Button List Start ----------- */}
            {ctaItems && (
              <ButtonList
                buttonsData={ctaItems}
                buttonListVariation={buttonListCtaType}
                dataLocatorDivisionImages={getLocator('moduleE_cta_image')}
                dataLocatorTextCta={getLocator('moduleE_cta_links')}
                className="button-list-container-alternate"
              />
            )}
            {/* ---------- Cta Button List End ----------- */}
          </Col>

          {/* ---------- Small Composite Image Start ----------- */}
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 4,
            }}
          >
            <Row
              fullBleed={{
                small: false,
                medium: false,
                large: true,
              }}
            >
              {divCTALinks.map(({ image, link, styled }, index) => {
                const divCtaLinkHeaderText = [{ textItems: [{ ...styled }], link }];

                return (
                  <Col
                    colSize={{
                      small: 3,
                      medium: 4,
                      large: 12,
                    }}
                    ignoreGutter={{
                      large: true,
                    }}
                  >
                    <div className={`small-composite-image small-composite-image-${index}`}>
                      <DamImage
                        imgConfigs={IMG_DATA.smallImgConfig}
                        imgData={image}
                        data-locator={`${getLocator('moduleE_small_img')}${index + 1}`}
                        className="module-e-img-full-width"
                      />

                      <LinkText
                        className="small-composite-image-header"
                        headerText={divCtaLinkHeaderText}
                        dataLocator={`${getLocator('moduleE_small_img_header_text')}${index + 1}`}
                      />

                      <Button
                        buttonVariation="variable-width"
                        dataLocator={`${getLocator('moduleE_small_img_cta')}${index + 1}`}
                        className="carousel-cta"
                        cta={link}
                      >
                        {link.text}
                      </Button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>

          {/* ---------- Small Composite Image End ----------- */}
        </Row>
        {/* ---------- Carousel Image layout End ----------- */}
      </Col>

      {eyebrow ? null : <Divider position="bottom" />}
    </Row>
  );
};

ModuleE.defaultProps = {
  className: '',
  promoBanner: null,
  eyebrow: [],
  ctaType: 'stackedCTAButtons',
  ctaItems: [],
  linkedImage: [],
};

ModuleE.propTypes = {
  className: PropTypes.string,
  accessibility: PropTypes.shape({
    playIconButton: PropTypes.string,
    pauseIconButton: PropTypes.string,
  }).isRequired,
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
      link: PropTypes.object,
      icon: PropTypes.object,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
      link: PropTypes.object,
    })
  ),
  eyebrow: PropTypes.arrayOf(
    PropTypes.shape({
      mediaLinkedList: PropTypes.arrayOf(PropTypes.object),
    })
  ),
  largeCompImageSimpleCarousel: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
  divCTALinks: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      styled: PropTypes.object,
      link: PropTypes.object,
    })
  ).isRequired,
  linkedImage: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ),
  ctaItems: PropTypes.arrayOf(PropTypes.object),
  ctaType: PropTypes.oneOf(['stackedCTAButtons', 'linkCTAList', 'scrollCTAList', 'imageCTAList']),
  carouselCtaType: PropTypes.oneOf(['button', 'link']).isRequired,
};

export default withStyles(ModuleE, moduleEStyle);
export { ModuleE as ModuleEVanilla };
