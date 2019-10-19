/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button, BodyCopy } from '../../../atoms';
import { PromoBanner } from '../..';
import { Carousel, LinkText, ImageGrid, style } from '../ModuleK.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import config from '../config';
import { getIconPath, getLocator } from '../../../../../utils';

const carouselConfig = {
  autoplay: true,
  dataLocatorPlay: getLocator('moduleK_play_button'),
  dataLocatorPause: getLocator('moduleK_pause_button'),
  customArrowLeft: getIconPath('carousel-big-carrot'),
  customArrowRight: getIconPath('carousel-big-carrot'),
};

/**
 * @class ModuleK - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs
 * This component is plug and play at any given slot in layout by passing required data
 * @param {composites} composites the list of data for header texts, links and images for component
 */
const ModuleK = props => {
  const {
    headerText,
    masonryGrid,
    className,
    accessibility: { playIconButton, pauseIconButton, previousButton, nextIconButton } = {},
  } = props;

  const { CAROUSEL_OPTIONS, IMG_DATA } = config;

  CAROUSEL_OPTIONS.prevArrow = (
    <button
      type="button"
      tabIndex="0"
      aria-label={previousButton}
      data-locator="moduleK_left_arrow"
      className="slick-prev"
    />
  );
  CAROUSEL_OPTIONS.nextArrow = (
    <button
      type="button"
      tabIndex="0"
      aria-label={nextIconButton}
      data-locator="moduleK_right_arrow"
      className="slick-prev"
    />
  );

  carouselConfig.autoplay = carouselConfig.autoplay && masonryGrid.length > 1;
  carouselConfig.pauseIconButtonLabel = pauseIconButton;
  carouselConfig.playIconButtonLabel = playIconButton;

  return (
    <BodyCopy component="div" className={`${className} moduleK`}>
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
          className="moduleK__header"
        >
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h2"
              type="heading"
              dataLocator={getLocator('moduleK_header_text')}
              inheritedStyles={LinkText}
            />
          )}
        </Col>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 10,
          }}
          offsetLeft={{
            small: 0,
            medium: 0,
            large: 1,
          }}
          className="moduleK__carousal"
        >
          <Carousel
            options={CAROUSEL_OPTIONS}
            inheritedStyles={Carousel}
            carouselConfig={carouselConfig}
          >
            {masonryGrid.map(({ promoBanner, mediaLinkedList, singleCTAButton }, index) => {
              const checkPromo = promoBanner && promoBanner.length;
              return (
                <React.Fragment>
                  {checkPromo && (
                    <PromoBanner
                      promoBanner={promoBanner}
                      className="moduleK__promoBanner"
                      data-locator={`${getLocator('moduleK_promobanner_text')}${index + 1}`}
                      fontSize="fs48"
                    />
                  )}
                  <ImageGrid
                    mediaLinkedList={mediaLinkedList}
                    className="image-grid"
                    colM={2}
                    dataLocator={`${getLocator('moduleK_image')}${index + 1}`}
                    dataLocatorContainer={`${getLocator('moduleK_image_set')}${index + 1}`}
                    promo={checkPromo}
                    imgConfigs={IMG_DATA.imgConfig}
                  />
                  <Col
                    colSize={{
                      small: 4,
                      medium: 2,
                      large: 3,
                    }}
                  >
                    {singleCTAButton && (
                      <Button
                        buttonVariation="fixed-width"
                        dataLocator={`${getLocator('moduleK_button_set')}${index + 1}`}
                        className="carousal-cta"
                        cta={singleCTAButton}
                      >
                        {singleCTAButton.text}
                      </Button>
                    )}
                  </Col>
                </React.Fragment>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </BodyCopy>
  );
};

ModuleK.propTypes = {
  className: PropTypes.string.isRequired,
  headerText: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
  masonryGrid: PropTypes.shape({}).isRequired,
  accessibility: PropTypes.shape({
    playIconButton: PropTypes.string,
    pauseIconButton: PropTypes.string,
    previousButton: PropTypes.string,
    nextIconButton: PropTypes.string,
  }).isRequired,
};

ModuleK.defaultProps = {
  accessibility: {},
};

ModuleK.propTypes = {
  accessibility: PropTypes.shape({
    playIconButton: PropTypes.string,
    pauseIconButton: PropTypes.string,
    previousButton: PropTypes.string,
    nextIconButton: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  masonryGrid: PropTypes.arrayOf(
    PropTypes.shape({
      mediaLinkedList: PropTypes.arrayOf(PropTypes.shape({})),
      promoBanner: PropTypes.arrayOf(
        PropTypes.shape({
          link: PropTypes.object,
          textItems: PropTypes.array,
        })
      ),
      singleCTAButton: PropTypes.shape({}),
    })
  ).isRequired,
};

export default withStyles(errorBoundary(ModuleK), style);
export { ModuleK as ModuleKVanilla };
