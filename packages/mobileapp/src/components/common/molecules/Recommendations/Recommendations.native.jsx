import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import config from './config';

const PRODUCT_IMAGE_WIDTH = 89;
const PRODUCT_IMAGE_GUTTER = 16;
const PRODUCT_IMAGE_PER_SLIDE = 4;
const MODULE_HEIGHT = 142;
const MODULE_WIDTH = (PRODUCT_IMAGE_WIDTH + PRODUCT_IMAGE_GUTTER) * PRODUCT_IMAGE_PER_SLIDE;

const loadVariation = () => () => {
  return null;
};

const renderRecommendationView = (props, variation) => {
  const { moduleOHeaderLabel, modulePHeaderLabel, products } = props;

  const params = config.params[variation];
  const headerLabel =
    variation === config.variations.moduleO ? moduleOHeaderLabel : modulePHeaderLabel;

  return (
    products &&
    products.length > 0 && (
      <React.Fragment>
        <Heading locator={params.dataLocator} text={headerLabel} />
        <View>
          <Carousel
            data={products}
            renderItem={loadVariation()}
            height={MODULE_HEIGHT}
            width={MODULE_WIDTH}
            carouselConfig={{
              autoplay: false,
            }}
            autoplay={false}
          />
        </View>
      </React.Fragment>
    )
  );
};

const fetchRecommendations = loadRecommendations => () => {
  loadRecommendations();
  return () => {};
};

const Recommendations = props => {
  const { variations, loadRecommendations } = props;

  const variationArray = variations.split(',');

  useEffect(fetchRecommendations(loadRecommendations));

  return <View>{variationArray.map(variation => renderRecommendationView(props, variation))}</View>;
};

Recommendations.propTypes = {
  variations: PropTypes.string.isRequired,
  loadRecommendations: PropTypes.func.isRequired,
};
export default Recommendations;
