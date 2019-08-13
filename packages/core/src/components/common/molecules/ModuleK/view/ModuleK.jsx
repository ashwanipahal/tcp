// @flow
import React from 'react';
import { Col, Row, Button, BodyCopy, Anchor } from '../../../atoms';
import { PromoBanner } from '../..';
import { Carousel, LinkText, ImageGrid, style } from '../ModuleK.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';
import config from '../config';
import { getIconPath, getLocator } from '../../../../../utils';

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
 * @class ModuleK - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs
 * This component is plug and play at any given slot in layout by passing required data
 * @param {composites} composites the list of data for header texts, links and images for component
 */
class ModuleK extends React.PureComponent<Props, State> {
  render() {
    const { headerText, masonryGrid, className } = this.props;

    const { CAROUSEL_OPTIONS } = config;
    CAROUSEL_OPTIONS.prevArrow = (
      <button type="button" data-locator="moduleK_left_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.nextArrow = (
      <button type="button" data-locator="moduleK_right_arrow" className="slick-prev" />
    );
    CAROUSEL_OPTIONS.hidePlayPause = masonryGrid.length === 1;

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
              large: 8,
            }}
            offsetLeft={{
              small: 0,
              medium: 0,
              large: 2,
            }}
            className="moduleK__carousal"
          >
            <Carousel
              options={CAROUSEL_OPTIONS}
              inheritedStyles={Carousel}
              carouselConfig={{
                autoplay: true,
                dataLocatorPlay: getLocator('moduleK_play_button'),
                dataLocatorPause: getLocator('moduleK_pause_button'),
                customArrowLeft: getIconPath('carousel-big-carrot'),
                customArrowRight: getIconPath('carousel-big-carrot'),
              }}
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
                            dataLocator={`${getLocator('moduleK_button_set')}${index + 1}`}
                            className="carousal-cta"
                          >
                            {singleCTAButton.text}
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
