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
      youMayAlsoLikeLabel,
      products,
      className,
      loadedProductCount,
      onPickUpOpenClick,
      labels,
      priceOnly,
      buttonConfig,
    } = this.props;

    const priceOnlyClass = priceOnly ? 'price-only' : '';

    return (
      <section className={className}>
        <Heading
          variant="h4"
          className={`recommendations-header ${priceOnlyClass}`}
          textAlign="center"
        >
          {youMayAlsoLikeLabel}
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
                autoplay: true,
                customArrowLeft: getIconPath('carrot-left-xl'),
                customArrowRight: getIconPath('carrot-right-xl'),
              }}
            >
              {products &&
                products.map((product, index) => {
                  const { generalProductId } = product;

                  return (
                    <React.Fragment>
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
                    </React.Fragment>
                  );
                })}
            </Carousel>
          </Col>
        </Row>
        {buttonConfig && (
          <div className="recommendaton-cta-container">
            <ButtonCTA
              className="recommendation-cta"
              uniqueKey="recommendation-button"
              ctaInfo={{
                ctaVariation: 'fixed-width',
                link: {
                  url: buttonConfig.url,
                  target: buttonConfig.target,
                  title: buttonConfig.title,
                  text: buttonConfig.text,
                },
              }}
            />
          </div>
        )}
      </section>
    );
  }
}

Recommendations.propTypes = {
  loadRecommendations: PropTypes.func.isRequired,
  youMayAlsoLikeLabel: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
  className: PropTypes.string.isRequired,
  loadedProductCount: PropTypes.number.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  priceOnly: PropTypes.bool,
  buttonConfig: PropTypes.shape({}),
};

Recommendations.defaultProps = {
  priceOnly: false,
  buttonConfig: false,
};

export { Recommendations as RecommendationsVanilla };
export default withStyles(Recommendations, style);
