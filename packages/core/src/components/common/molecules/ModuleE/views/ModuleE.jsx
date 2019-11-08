import React from 'react';
import PropTypes from 'prop-types';

import { Col, DamImage, Row, Button } from '../../../atoms';
import { ButtonList, LinkText, PromoBanner } from '../..';

import withStyles from '../../../hoc/withStyles';
import moduleEStyle, { Carousel } from '../styles/ModuleE.style';
import { getLocator, getIconPath, isGymboree } from '../../../../../utils';
import config from '../moduleE.config';

const bigCarrotIcon = 'carousel-big-carrot';
const bigCarrotIconGym = 'carousel-big-carrot-white';

const ModuleE = props => {
  const {
    className,
    eyebrow: [eyebrow] = [],
    headerText,
    promoBanner,
    largeCompImageSimpleCarousel,
    ctaItems,
    ctaType,
    divCTALinks,
    linkedImage: [linkedImage] = [],
    accessibility: { playIconButton, pauseIconButton, previousButton, nextIconButton } = {},
  } = props;
  const { mediaLinkedList: eyebrowMediaLinkedList, promoBanner: eyebrowPromoBanner } =
    eyebrow || {};
  const { ctaTypes, IMG_DATA, CAROUSEL_OPTIONS } = config;
  const buttonListCtaType = ctaTypes[ctaType];
  const carouselIcon = isGymboree() ? bigCarrotIconGym : bigCarrotIcon;

  const carouselConfig = {
    autoplay: true,
    dataLocatorPlay: getLocator('moduleE_play_button'),
    dataLocatorPause: getLocator('moduleE_pause_button'),
    customArrowLeft: getIconPath(carouselIcon),
    customArrowRight: getIconPath(carouselIcon),
    dataLocatorCarousel: 'carousel_banner',
  };

  CAROUSEL_OPTIONS.prevArrow = (
    <button
      type="button"
      tabIndex="0"
      aria-label={previousButton}
      data-locator="moduleE_left_arrow"
      className="slick-prev"
    />
  );
  CAROUSEL_OPTIONS.nextArrow = (
    <button
      type="button"
      tabIndex="0"
      aria-label={nextIconButton}
      data-locator="moduleE_right_arrow"
      className="slick-prev"
    />
  );
  carouselConfig.autoplay = carouselConfig.autoplay && largeCompImageSimpleCarousel.length > 1;
  carouselConfig.pauseIconButtonLabel = pauseIconButton;
  carouselConfig.playIconButtonLabel = playIconButton;

  return (
    <Row className={className}>
      <Col
        colSize={{
          small: 4,
          medium: 8,
          large: 12,
        }}
        ignoreGutter
      >
        {/* ---------- Eyebrow Image Start ----------- */}
        {eyebrow && (
          <Row>
            <Col
              colSize={{
                small: 4,
                medium: 8,
                large: 5,
              }}
              ignoreGutter
            >
              <DamImage
                imgConfigs={IMG_DATA.eyeBrowImgConfig}
                imgData={eyebrowMediaLinkedList[0].image}
                data-locator={`${getLocator('moduleE_eyebrowImage_img')}_left`}
                link={eyebrowMediaLinkedList[0].link}
              />
            </Col>
            <Col
              colSize={{
                small: 4,
                medium: 8,
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
                small: 4,
                medium: 8,
                large: 5,
              }}
              ignoreGutter
            >
              <DamImage
                imgConfigs={IMG_DATA.eyeBrowImgConfig}
                imgData={eyebrowMediaLinkedList[1].image}
                data-locator={`${getLocator('moduleE_eyebrowImage_img')}_right`}
                link={eyebrowMediaLinkedList[1].link}
              />
            </Col>
          </Row>
        )}
        {/* ---------- Eyebrow Image End ----------- */}

        {/* ---------- Header Text Start ----------- */}
        <LinkText headerText={headerText} dataLocator={getLocator('moduleE_header_text')} />
        {/* ---------- Header Text End ----------- */}

        {/* ---------- Promo Text Start ----------- */}
        {promoBanner && (
          <PromoBanner promoBanner={promoBanner} dataLocator={getLocator('moduleE_header_text')} />
        )}
        {/* ---------- Promo Text End ----------- */}

        {/* ----------- Promo Image Area Start----------- */}
        {linkedImage && (
          <DamImage
            imgConfigs={IMG_DATA.promoAreaImgConfig}
            imgData={linkedImage.image}
            link={linkedImage.link}
            data-locator={`${getLocator('moduleE_promo_area_img')}`}
          />
        )}
        {/* ----------- Promo Image Area End----------- */}

        {/* ---------- Carousel Image layout Start ----------- */}
        <Row>
          <Col
            colSize={{
              small: 4,
              medium: 8,
              large: 8,
            }}
          >
            <Carousel options={CAROUSEL_OPTIONS} carouselConfig={carouselConfig}>
              {largeCompImageSimpleCarousel.map(({ image, singleCTAButton }, index) => {
                return (
                  <div>
                    <DamImage
                      imgConfigs={IMG_DATA.carouselImgConfig}
                      imgData={image}
                      data-locator={`${getLocator('moduleE_small_image_img')}${index + 1}`}
                    />
                    {/* {singleCTAButton && (
                      <Button
                        buttonVariation="fixed-width"
                        dataLocator={`${getLocator('moduleE_small_image_cta')}${index + 1}`}
                        className="carousal-cta"
                        cta={singleCTAButton}
                      >
                        {singleCTAButton.text}
                      </Button>
                    )} */}
                  </div>
                );
              })}
            </Carousel>

            {/* TODO: UPDATE THE INDEX AS THE CAROUSEL IMAGE CHANGE */}
            {largeCompImageSimpleCarousel[0].singleCTAButton && (
              <Button
                buttonVariation="fixed-width"
                dataLocator={`${getLocator('moduleE_small_image_cta')}${0}`}
                className="carousal-cta"
                cta={largeCompImageSimpleCarousel[0].singleCTAButton}
              >
                {largeCompImageSimpleCarousel[0].singleCTAButton.text}
              </Button>
            )}
          </Col>

          {/* ---------- Small Composite Image Start ----------- */}
          <Col
            colSize={{
              small: 4,
              medium: 8,
              large: 4,
            }}
          >
            <Row>
              {divCTALinks.map(({ image, link, styled }, index) => {
                const divCtaLinkHeaderText = [{ textItems: [{ ...styled }], link }];

                return (
                  <Col
                    colSize={{
                      small: 2,
                      medium: 4,
                      large: 12,
                    }}
                    ignoreGutter={{
                      large: true,
                    }}
                  >
                    <div className="small-composite-image">
                      <DamImage
                        imgConfigs={IMG_DATA.smallImgConfig}
                        imgData={image}
                        data-locator={`${getLocator('moduleE_small_img')}${index + 1}`}
                      />

                      <LinkText
                        headerText={divCtaLinkHeaderText}
                        dataLocator={`${getLocator('moduleE_small_img_header_text')}${index + 1}`}
                      />

                      <Button
                        buttonVariation="fixed-width"
                        dataLocator={`${getLocator('moduleE_small_img_cta')}${index + 1}`}
                        className="carousal-cta"
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

        {ctaItems && (
          <ButtonList
            buttonsData={ctaItems}
            buttonListVariation={buttonListCtaType}
            dataLocatorDivisionImages={getLocator('moduleE_cta_image')}
            dataLocatorTextCta={getLocator('moduleE_cta_links')}
            className="button-list-container-alternate"
          />
        )}
      </Col>
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
