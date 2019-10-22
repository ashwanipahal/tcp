import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import ModuleO from '@tcp/core/src/components/common/molecules/ModuleO';
import ModuleP from '@tcp/core/src/components/common/molecules/ModuleP';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import { getScreenWidth, getLocator } from '@tcp/core/src/utils/index.native';
import { Button } from '@tcp/core/src/components/common/atoms';
import QuickViewModal from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.container';
import AddedToBagContainer from '@tcp/core/src/components/features/CnC/AddedToBag';
import PickupStoreModal from '@tcp/core/src/components/common/organisms/PickupStoreModal';
import { CarouselContainer, ButtonContainer } from './Recommendations.style';
import config from './config';

const PRODUCT_TILE_WIDTH = 182;
const MODULE_HEIGHT = 287;
const MODULE_WIDTH = getScreenWidth();

const loadVariation = (variation, variationProps) => itemProps => {
  const { isPlcc, onQuickViewOpenClick, priceOnly, navigation, ...others } = variationProps;
  const title = itemProps.item.name;
  const { viaModule } = config;
  if (variation === 'moduleO') {
    return (
      <ModuleO
        isPlcc={isPlcc}
        title={title}
        priceOnly={priceOnly}
        navigation={navigation}
        onQuickViewOpenClick={onQuickViewOpenClick}
        viaModule={viaModule}
        {...itemProps}
        {...others}
      />
    );
  }

  return (
    <ModuleP
      isPlcc={isPlcc}
      title={title}
      onQuickViewOpenClick={onQuickViewOpenClick}
      navigation={navigation}
      viaModule={viaModule}
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
    navigation,
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
              navigation,
              ...others,
            })}
            height={MODULE_HEIGHT}
            sliderWidth={MODULE_WIDTH}
            itemWidth={PRODUCT_TILE_WIDTH}
            loop
            activeSlideAlignment="start"
            inactiveSlideOpacity={1}
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
  const {
    variation,
    loadRecommendations,
    navigation,
    onPickUpOpenClick,
    isPickupModalOpen,
  } = props;
  const variationArray = variation.split(',');

  useEffect(fetchRecommendations(loadRecommendations), []);

  return (
    <View>
      {variationArray.map(value => renderRecommendationView(props, value))}
      <QuickViewModal navigation={navigation} onPickUpOpenClick={onPickUpOpenClick} />
      <AddedToBagContainer navigation={navigation} />
      {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
    </View>
  );
};

Recommendations.propTypes = {
  variation: PropTypes.string.isRequired,
  loadRecommendations: PropTypes.func.isRequired,
  onPickUpOpenClick: PropTypes.func,
  navigation: PropTypes.shape({}).isRequired,
  isPickupModalOpen: PropTypes.bool.isRequired,
};

Recommendations.defaultProps = {
  onPickUpOpenClick: () => {},
};

export default Recommendations;
