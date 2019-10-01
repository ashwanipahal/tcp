import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { Carousel } from '@tcp/core/src/components/common/molecules';
import { Col, Row, Heading } from '@tcp/core/src/components/common/atoms';
import ButtonCTA from '@tcp/core/src/components/common/molecules/ButtonCTA';
import { getIconPath } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import config from './config';
import style from './Recommendations.style';

/**
 * This method loads different variations for Recommendation Module dynamically
 */
const RecommendationComponentVariation = dynamic(
  {
    modules: () => ({
      ModuleO: import('@tcp/core/src/components/common/molecules/ModuleO').then(mod => mod.default),
      ModuleP: import('@tcp/core/src/components/common/molecules/ModuleP').then(mod => mod.default),
    }),
    render: (dynamicComponentProps, { ModuleO, ModuleP }) => {
      switch (dynamicComponentProps.variation) {
        case config.variations.moduleO:
          return <ModuleO {...dynamicComponentProps} />;
        case config.variations.moduleP:
          return <ModuleP {...dynamicComponentProps} />;
        default:
          return <ModuleO {...dynamicComponentProps} />;
      }
    },
  },
  { ssr: false }
);

class Recommendations extends Component {
  componentDidMount() {
    const { loadRecommendations } = this.props;
    window.addEventListener('load', loadRecommendations);
  }

  componentWillUnmount() {
    const { loadRecommendations } = this.props;
    window.removeEventListener('load', loadRecommendations);
  }

  loadVariation(variation) {
    const {
      products,
      className,
      loadedProductCount,
      onPickUpOpenClick,
      labels,
      priceOnly,
    } = this.props;

    const priceOnlyClass = priceOnly ? 'price-only' : '';

    return products.map((product, index) => {
      const { generalProductId } = product;

      return (
        <RecommendationComponentVariation
          key={`recommended_products_${variation}_${generalProductId}`}
          loadedProductCount={loadedProductCount}
          generalProductId={generalProductId}
          item={product}
          isPerfectBlock
          productsBlock={product}
          onPickUpOpenClick={onPickUpOpenClick}
          className={`${className} product-list ${priceOnlyClass}`}
          labels={labels}
          sequenceNumber={index + 1}
          variation={variation}
        />
      );
    });
  }

  renderRecommendationVariation(variation) {
    const {
      moduleOHeaderLabel,
      modulePHeaderLabel,
      products,
      priceOnly,
      showButton,
      ctaText,
      ctaTitle,
      ctaUrl,
    } = this.props;

    const priceOnlyClass = priceOnly ? 'price-only' : '';
    const params = config.params[variation];
    const headerLabel = config.variations.moduleO ? moduleOHeaderLabel : modulePHeaderLabel;

    return (
      products &&
      products.length && (
        <React.Fragment>
          <Heading
            variant="h4"
            className={`recommendations-header ${priceOnlyClass}`}
            textAlign="center"
            dataLocator={params.dataLocator}
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
              {products.length >= 4 ? (
                <Carousel
                  className={`${variation}-variation`}
                  options={config.CAROUSEL_OPTIONS}
                  inheritedStyles={Carousel}
                  carouselConfig={{
                    variation: 'big-arrows',
                    customArrowLeft: getIconPath('carousel-big-carrot-left'),
                    customArrowRight: getIconPath('carousel-big-carrot'),
                    dataLocatorCarousel: `${variation}-variation`,
                  }}
                >
                  {this.loadVariation(variation)}
                </Carousel>
              ) : (
                <div className={`no-carousel-container ${variation}-variation`}>
                  {this.loadVariation(variation)}
                </div>
              )}
            </Col>
          </Row>
          {showButton && (
            <div className="recommendation-cta-container">
              <ButtonCTA
                className="recommendation-cta"
                uniqueKey="recommendation-button"
                dataLocator={{
                  cta: params.dataLocatorCTA,
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
      )
    );
  }

  render() {
    const { className, variations } = this.props;

    config.CAROUSEL_OPTIONS.prevArrow = (
      <button type="button" data-locator="moduleO_left_arrow" className="slick-prev" />
    );
    config.CAROUSEL_OPTIONS.nextArrow = (
      <button type="button" data-locator="moduleO_right_arrow" className="slick-prev" />
    );

    const variation = variations.split(',');

    return variation.map(value => {
      return (
        <section className={`${className} recommendations-tile`}>
          {this.renderRecommendationVariation(value)}
        </section>
      );
    });
  }
}

Recommendations.propTypes = {
  loadRecommendations: PropTypes.func.isRequired,
  moduleOHeaderLabel: PropTypes.string.isRequired,
  modulePHeaderLabel: PropTypes.string.isRequired,
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
  variations: PropTypes.string,
};

Recommendations.defaultProps = {
  priceOnly: false,
  showButton: false,
  ctaText: '',
  ctaTitle: '',
  ctaUrl: '',
  variations: '',
};

export { Recommendations as RecommendationsVanilla };
export default withStyles(errorBoundary(Recommendations), style);
