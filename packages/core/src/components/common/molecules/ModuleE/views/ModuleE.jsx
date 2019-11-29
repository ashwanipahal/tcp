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

// Carousel Next and Prev Arrows
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

CarouselArrow.propTypes = {
  arrowType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Build Top and Bottom divider
const Divider = ({ position, disabled }) => {
  return disabled ? null : (
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

Divider.propTypes = {
  position: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

/* Returns Promo Area Image. Extracting this due to eslint complexity */
const getLinkedImage = (linkedImage, carouselCtaType, IMG_DATA) => {
  return (
    linkedImage && (
      <Anchor
        dataLocator={`${getLocator('moduleE_promo_area_img_cta')}`}
        className={`promo-area-image-link ${
          carouselCtaType === 'button' ? 'promo-area-image-link-spaced' : ''
        }`}
        url={linkedImage.link.url}
        target={linkedImage.link.target}
        title={linkedImage.link.title}
      >
        <DamImage
          imgConfigs={IMG_DATA.promoAreaImgConfig}
          imgData={linkedImage.image}
          videoData={linkedImage.video}
          dataLocator={`${getLocator('moduleE_promo_area_img')}`}
          className="module-e-img-full-width"
        />
      </Anchor>
    )
  );
};

/* Null check for eyebrow object  */
const getEyebrowObj = eyebrow => {
  return (eyebrow && eyebrow[0]) || {};
};

const ModuleE = props => {
  const {
    className,
    eyebrow,
    headerText,
    promoBanner,
    largeCompImageSimpleCarousel,
    ctaItems,
    ctaType,
    carouselCtaType,
    divCTALinks,
    linkedImage: linkedImages,
    accessibility: { playIconButton, pauseIconButton, previousButton, nextIconButton } = {},
    moduleClassName,
  } = props;

  const linkedImage = linkedImages && linkedImages[0];
  const {
    mediaLinkedList: eyebrowMediaLinkedList,
    promoBanner: eyebrowPromoBanner,
  } = getEyebrowObj(eyebrow);

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
      className={`${className} ${moduleClassName}`}
      fullBleed={{
        small: true,
        medium: true,
      }}
    >
      <Divider disabled={!!eyebrow} position="top" />

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
                dataLocator={`${getLocator('moduleE_eyebrowImage_img')}_left`}
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
                dataLocator={`${getLocator('moduleE_eyebrowImage_img')}_right`}
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
          <PromoBanner promoBanner={promoBanner} dataLocator={getLocator('moduleE_promo_text')} />
        )}
        {/* ---------- Promo Text End ----------- */}

        {/* ----------- Promo Image Area Start----------- */}
        {getLinkedImage(linkedImage, carouselCtaType, IMG_DATA)}

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
              {largeCompImageSimpleCarousel.map(({ image, video, singleCTAButton }, index) => {
                const { url, text, target } = singleCTAButton || {};
                return (
                  <div>
                    <DamImage
                      imgConfigs={IMG_DATA.carouselImgConfig}
                      imgData={image}
                      dataLocator={`${getLocator('moduleE_carousel_image_img')}${index + 1}`}
                      className="module-e-img-full-width"
                      link={singleCTAButton}
                      videoData={video}
                    />
                    {carouselCtaType === 'link' && singleCTAButton && (
                      <Anchor
                        dataLocator={`${getLocator('moduleE_carousel_image_link_cta')}${index + 1}`}
                        className="carousel-cta-link"
                        url={url}
                        title={text}
                        target={target}
                        underline
                        anchorVariation="primary"
                        fontSizeVariation="large"
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
                        'moduleE_carousel_image_button_cta'
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

            {ctaItems && (
              <ButtonList
                buttonsData={ctaItems}
                buttonListVariation={buttonListCtaType}
                dataLocatorDivisionImages={getLocator('moduleE_cta_image')}
                dataLocatorTextCta={getLocator('moduleE_cta_links')}
                dataLocatorDropDown={getLocator('moduleE_dropdown')}
                className="button-list-container-alternate"
              />
            )}
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
              {divCTALinks.map(({ image, link, video, styled }, index) => {
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
                        dataLocator={`${getLocator('moduleE_small_img')}${index + 1}`}
                        className="module-e-img-full-width"
                        link={link}
                        videoData={video}
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
                        fullWidth={false}
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

      <Divider disabled={eyebrow} position="bottom" />
    </Row>
  );
};

ModuleE.defaultProps = {
  className: '',
  promoBanner: null,
  eyebrow: null,
  ctaType: 'stackedCTAButtons',
  ctaItems: [],
  linkedImage: null,
  moduleClassName: '',
};

ModuleE.propTypes = {
  className: PropTypes.string,
  accessibility: PropTypes.shape({}).isRequired,
  headerText: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  promoBanner: PropTypes.arrayOf(PropTypes.shape({})),
  eyebrow: PropTypes.arrayOf(PropTypes.shape({})),
  largeCompImageSimpleCarousel: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  divCTALinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  linkedImage: PropTypes.arrayOf(PropTypes.shape({})),
  ctaItems: PropTypes.arrayOf(PropTypes.object),
  ctaType: PropTypes.oneOf(['stackedCTAButtons', 'linkCTAList', 'scrollCTAList', 'imageCTAList']),
  carouselCtaType: PropTypes.oneOf(['button', 'link']).isRequired,
  moduleClassName: PropTypes.string,
};

export default withStyles(ModuleE, moduleEStyle);
export { ModuleE as ModuleEVanilla };
