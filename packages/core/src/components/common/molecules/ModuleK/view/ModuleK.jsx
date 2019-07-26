// @flow
import React from 'react';
import { Col, Row, Button, BodyCopy, Anchor } from '../../../atoms';
import { Carousel, PromoTextBanner, LinkText, ImageGrid, style } from '../ModuleK.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';
import config from '../config';
import { getIconPath } from '../../../../../utils';

type Props = {
  className: string,
  headerText: Array<Object>,
  promoTextBanner: Array<Object>,
  masonryGrid: Object,
};

type State = {
  current: number,
  next: number,
};

/**
 * @class ModuleH - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs
 * This component is plug and play at any given slot in layout by passing required data
 * @param {composites} composites the list of data for header texts, links and images for component
 */
class ModuleK extends React.PureComponent<Props, State> {
  render() {
    const {
      headerText,
      promoTextBanner: outerPromoTextBanner,
      masonryGrid,
      className,
    } = this.props;
    const { CAROUSEL_OPTIONS } = config;
    CAROUSEL_OPTIONS.prevArrow = (
      <button type="button" data-locator="moduleK_left_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.nextArrow = (
      <button type="button" data-locator="moduleK_right_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.hidePlayPause = masonryGrid.length === 1;

    return (
      <BodyCopy fontFamily="primary" className={className}>
        <Row className="module-k">
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            className="module-k__header"
          >
            {headerText.length && (
              <LinkText
                headerText={headerText}
                component="div"
                fontSize="fs48"
                fontWeight="black"
                dataLocator="moduleK_header_text"
              />
            )}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            offsetRight={{
              small: 0,
              medium: 0,
              large: 0,
            }}
            className="module-k__promoBanner"
          >
            {outerPromoTextBanner && (
              <PromoTextBanner
                promoTextBanner={outerPromoTextBanner}
                fontSize="fs48"
                dataLocator="moduleK_promobanner_text"
              />
            )}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 8,
            }}
            offsetLeft={{
              small: 0,
              medium: 0,
              large: 2,
            }}
            className="module-k__carousal"
          >
            <Carousel
              options={CAROUSEL_OPTIONS}
              carouselConfig={{
                autoplay: true,
                dataLocatorPlay: 'moduleK_play_button',
                dataLocatorPause: 'moduleK_pause_button',
                customArrowLeft: getIconPath('carousel-big-carrot'),
                customArrowRight: getIconPath('carousel-big-carrot'),
              }}
            >
              {masonryGrid.map(({ promoTextBanner, mediaList, singleCTAButton }, index) => {
                return (
                  <React.Fragment>
                    {promoTextBanner.length && (
                      <PromoTextBanner
                        promoTextBanner={promoTextBanner}
                        className="module-k__promoBanner"
                        fontSize="fs48"
                      />
                    )}
                    <ImageGrid
                      mediaList={mediaList}
                      className="image-grid"
                      colM={2}
                      dataLocator="moduleK_image_"
                    />
                    <Col
                      colSize={{
                        small: 4,
                        medium: 2,
                        large: 3,
                      }}
                    >
                      {singleCTAButton && (
                        <Anchor {...singleCTAButton}>
                          <Button
                            buttonVariation="fixed-width"
                            dataLocator={`moduleK_button_set_${index}`}
                            className="carousal-cta"
                          >
                            {singleCTAButton.text || `Shop Now`}
                          </Button>
                        </Anchor>
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
  }
}

export default errorBoundary(withStyles(ModuleK, style));
export { ModuleK as ModuleKVanilla };
