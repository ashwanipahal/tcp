import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from './config';
import { Carousel } from '..';
import { Col, Row, Heading } from '../../atoms';
import ButtonCTA from '../ButtonCTA';
import { getIconPath } from '../../../../utils';
import withStyles from '../../hoc/withStyles';
import style from './Recommendations.style';
import ModuleO from '../ModuleO';

class Recommendations extends Component {
  componentDidMount() {
    const { loadRecommendations } = this.props;
    window.addEventListener('load', loadRecommendations);
  }

  render() {
    const {
      headerLabel,
      products,
      className,
      loadedProductCount,
      onPickUpOpenClick,
      labels,
      priceOnly,
      showButton,
      ctaText,
      ctaTitle,
      ctaUrl,
    } = this.props;

    const priceOnlyClass = priceOnly ? 'price-only' : '';

    config.CAROUSEL_OPTIONS.prevArrow = (
      <button type="button" data-locator="moduleO_left_arrow" className="slick-prev" />
    );
    config.CAROUSEL_OPTIONS.nextArrow = (
      <button type="button" data-locator="moduleO_right_arrow" className="slick-prev" />
    );

    return (
      <section className={`${className} recommendations-tile`}>
        {products && (
          <React.Fragment>
            <Heading
              variant="h4"
              className={`recommendations-header ${priceOnlyClass}`}
              textAlign="center"
              dataLocator="moduleO_header_text"
            >
              {headerLabel}
            </Heading>
            <Row fullBleed>
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
              >
                <Carousel
                  options={config.CAROUSEL_OPTIONS}
                  inheritedStyles={Carousel}
                  carouselConfig={{
                    variation: 'big-arrows',
                    customArrowLeft: getIconPath('carousel-big-carrot-left'),
                    customArrowRight: getIconPath('carousel-big-carrot'),
                  }}
                >
                  {products &&
                    products.map((product, index) => {
                      const { generalProductId } = product;

                      return (
                        <ModuleO
                          key={`recommended_products_${index.toString()}`}
                          loadedProductCount={loadedProductCount}
                          generalProductId={generalProductId}
                          item={product}
                          isPerfectBlock
                          productsBlock={product}
                          onPickUpOpenClick={onPickUpOpenClick}
                          className={`${className} product-list ${priceOnlyClass}`}
                          labels={labels}
                          sequenceNumber={index + 1}
                        />
                      );
                    })}
                </Carousel>
              </Col>
            </Row>
            {showButton && (
              <div className="recommendaton-cta-container">
                <ButtonCTA
                  className="recommendation-cta"
                  uniqueKey="recommendation-button"
                  dataLocator={{
                    cta: 'moduleO_cta_btn',
                  }}
                  ctaInfo={{
                    ctaVariation: 'fixed-width',
                    link: {
                      url: ctaUrl,
                      title: ctaTitle,
                      text: ctaText,
                    },
                  }}
                />
              </div>
            )}
          </React.Fragment>
        )}
      </section>
    );
  }
}

Recommendations.propTypes = {
  loadRecommendations: PropTypes.func.isRequired,
  headerLabel: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
  className: PropTypes.string.isRequired,
  loadedProductCount: PropTypes.number.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  priceOnly: PropTypes.bool,
  showButton: PropTypes.bool,
  ctaText: PropTypes.string,
  ctaTitle: PropTypes.string,
  ctaUrl: PropTypes.string,
};

Recommendations.defaultProps = {
  priceOnly: false,
  showButton: false,
  ctaText: '',
  ctaTitle: '',
  ctaUrl: '',
};

export { Recommendations as RecommendationsVanilla };
export default withStyles(Recommendations, style);
