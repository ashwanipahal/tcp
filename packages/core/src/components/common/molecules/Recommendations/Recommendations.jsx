import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from './config';
import { Carousel } from '..';
import { Col, Row, Heading } from '../../atoms';
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
    } = this.props;

    return (
      <section className={className}>
        <Heading variant="h4" className="recommendations-header" textAlign="center">
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
                customArrowLeft: getIconPath('carousel-big-carrot'),
                customArrowRight: getIconPath('carousel-big-carrot'),
              }}
            >
              {products &&
                products.map(product => {
                  const { generalProductId } = product;

                  return (
                    <React.Fragment>
                      <ModuleO
                        loadedProductCount={loadedProductCount}
                        generalProductId={generalProductId}
                        item={product}
                        isPerfectBlock
                        productsBlock={product}
                        onPickUpOpenClick={onPickUpOpenClick}
                        className={`${className} product-list`}
                        labels={labels}
                      />
                    </React.Fragment>
                  );
                })}
            </Carousel>
          </Col>
        </Row>
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
};

export { Recommendations as RecommendationsVanilla };
export default withStyles(Recommendations, style);
