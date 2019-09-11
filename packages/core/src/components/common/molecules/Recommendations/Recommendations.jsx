import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from './config';
import { Carousel } from '..';
import { Image, Anchor, Col, Row, Heading } from '../../atoms';
import { getIconPath } from '../../../../utils';
import withStyles from '../../hoc/withStyles';
import style from './Recommendations.style';

class Recommendations extends Component {
  componentDidMount() {
    const { loadRecommendations } = this.props;
    window.addEventListener('load', loadRecommendations);
  }

  render() {
    const { youMayAlsoLikeLabel, products, className } = this.props;

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
                products.map((product, index) => {
                  const { pdpUrl, name, imagePath, listPrice, offerPrice } = product;

                  return (
                    <Anchor
                      to={pdpUrl}
                      key={`${name}_${index.toString()}`}
                      className="recommended_product"
                    >
                      <div className="recommended_product--image">
                        <Image src={imagePath} />
                      </div>
                      <div className="recommended_product--title">{name}</div>
                      <div className="recommended_product--offerPrice">{offerPrice}</div>
                      <div className="recommended_product--listPrice">{`Was: ${listPrice}`}</div>
                    </Anchor>
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
};

export { Recommendations as RecommendationsVanilla };
export default withStyles(Recommendations, style);
