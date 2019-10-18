import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import ModuleO from '@tcp/core/src/components/common/molecules/ModuleO';
import ModuleP from '@tcp/core/src/components/common/molecules/ModuleP';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import { getScreenWidth, getLocator } from '@tcp/core/src/utils/index.native';
import { Button } from '@tcp/core/src/components/common/atoms';
import { CarouselContainer, ButtonContainer } from './Recommendations.style';
import config from './config';

const PRODUCT_IMAGE_WIDTH = 186;
const MODULE_HEIGHT = 287;
const MODULE_WIDTH = getScreenWidth();

const loadVariation = (variation, variationProps) => itemProps => {
  const { isPlcc, onQuickViewOpenClick, priceOnly, ...others } = variationProps;

  if (variation === 'moduleO') {
    return (
      <ModuleO
        isPlcc={isPlcc}
        priceOnly={priceOnly}
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

const ButtonView = buttonProps => {
  const { ctaText, ctaTitle, ctaUrl, navigation } = buttonProps;

  return (
    <ButtonContainer>
      <Button
        width="225px"
        accessibilityLabel={ctaTitle}
        text={ctaText}
        testID={getLocator('moduleD_button')}
        url={ctaUrl}
        navigation={navigation}
      />
    </ButtonContainer>
  );
};

const renderRecommendationView = (props, variation) => {
  const {
    moduleOHeaderLabel,
    modulePHeaderLabel,
    products,
    isPlcc,
    onQuickViewOpenClick,
    priceOnly,
    showButton,
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
              priceOnly,
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
        {showButton && <ButtonView {...props} />}
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
