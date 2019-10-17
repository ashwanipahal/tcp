import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import ModuleO from '@tcp/core/src/components/common/molecules/ModuleO';
import ModuleP from '@tcp/core/src/components/common/molecules/ModuleP';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import { getScreenWidth } from '@tcp/core/src/utils/index.native';
import { CarouselContainer } from './Recommendations.style';
import config from './config';

const PRODUCT_IMAGE_WIDTH = 186;
const MODULE_HEIGHT = 287;
const MODULE_WIDTH = getScreenWidth();

const loadVariation = (variation, variationProps) => itemProps => {
  const { isPlcc, onQuickViewOpenClick, ...others } = variationProps;

  if (variation === 'moduleO') {
    return (
      <ModuleO
        isPlcc={isPlcc}
        onQuickViewOpenClick={onQuickViewOpenClick}
        {...itemProps}
        {...others}
      />
    );
  }

  return (
    <ModuleP
      isPlcc={isPlcc}
      onQuickViewOpenClick={onQuickViewOpenClick}
      {...itemProps}
      {...others}
    />
  );
};

const renderRecommendationView = (props, variation) => {
  const {
    moduleOHeaderLabel,
    modulePHeaderLabel,
    products,
    isPlcc,
    onQuickViewOpenClick,
    ...others
  } = props;

  const params = config.params[variation];
  const headerLabel =
    variation === config.variations.moduleO ? moduleOHeaderLabel : modulePHeaderLabel;

  return (
    products &&
    products.length > 0 && (
      <React.Fragment>
        <Heading
          locator={params.dataLocator}
          text={headerLabel}
          fontFamily="primary"
          fontSize="fs20"
          fontWeight="semibold"
          textAlign="center"
        />
        <CarouselContainer>
          <Carousel
            data={products}
            renderItem={loadVariation(variation, {
              isPlcc,
              onQuickViewOpenClick,
              ...others,
            })}
            height={MODULE_HEIGHT}
            sliderWidth={MODULE_WIDTH}
            itemWidth={PRODUCT_IMAGE_WIDTH}
            loop
            activeSlideAlignment="start"
          />
        </CarouselContainer>
      </React.Fragment>
    )
  );
};

const fetchRecommendations = loadRecommendations => () => {
  loadRecommendations();
  return () => {};
};

const Recommendations = props => {
  const { variation, loadRecommendations } = props;

  const variationArray = variation.split(',');

  useEffect(fetchRecommendations(loadRecommendations));

  return <View>{variationArray.map(value => renderRecommendationView(props, value))}</View>;
};

Recommendations.propTypes = {
  variation: PropTypes.string.isRequired,
  loadRecommendations: PropTypes.func.isRequired,
};
export default Recommendations;
