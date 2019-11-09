import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import ModuleO from '@tcp/core/src/components/common/molecules/ModuleO';
import ModuleP from '@tcp/core/src/components/common/molecules/ModuleP';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import { getScreenWidth, getLocator } from '@tcp/core/src/utils/index.native';
import { Button, BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import AddedToBagContainer from '@tcp/core/src/components/features/CnC/AddedToBag';
import PickupStoreModal from '@tcp/core/src/components/common/organisms/PickupStoreModal';
import {
  CarouselContainer,
  ButtonContainer,
  AccordionContainer,
  ImageStyleWrapper,
} from './Recommendations.style';
import config from './config';
import constant from './Recommendations.constant';

const downIcon = require('../../../../assets/images/carrot-small-down.png');
const upIcon = require('../../../../assets/images/carrot-small-up.png');

const PRODUCT_TILE_WIDTH = 182;
const MODULE_HEIGHT = 287;
const MODULE_WIDTH = getScreenWidth();

const loadVariation = (variation, variationProps) => itemProps => {
  const {
    isPlcc,
    onQuickViewOpenClick,
    priceOnly,
    navigation,
    isRecentlyViewed,
    ...others
  } = variationProps;
  const title = itemProps.item.name;
  const { RECOMMENDATION } = constant;
  if (variation === 'moduleO') {
    return (
      <ModuleO
        isPlcc={isPlcc}
        title={title}
        priceOnly={priceOnly}
        navigation={navigation}
        onQuickViewOpenClick={onQuickViewOpenClick}
        viaModule={RECOMMENDATION}
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
      viaModule={RECOMMENDATION}
      priceOnly={priceOnly}
      isRecentlyViewed={isRecentlyViewed}
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
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const {
    moduleOHeaderLabel,
    modulePHeaderLabel,
    products,
    isPlcc,
    onQuickViewOpenClick,
    priceOnly,
    showButton,
    navigation,
    isRecentlyViewed,
    isHeaderAccordion,
    handleAccordionToggle,
    ...others
  } = props;

  const params = config.params[variation];
  const headerLabel =
    variation === config.variations.moduleO ? moduleOHeaderLabel : modulePHeaderLabel;

  const showCarousel = isHeaderAccordion ? isAccordionOpen : true;

  return (
    products &&
    products.length > 0 && (
      <React.Fragment>
        {isHeaderAccordion ? (
          <AccordionContainer onPress={() => setIsAccordionOpen(!isAccordionOpen)}>
            <BodyCopy
              fontFamily="secondary"
              fontWeight="black"
              fontSize="fs14"
              isAccordionOpen={isAccordionOpen}
              text={headerLabel.toUpperCase()}
              textAlign="center"
            />
            <ImageStyleWrapper>
              <Anchor onPress={() => setIsAccordionOpen(!isAccordionOpen)}>
                <Image source={isAccordionOpen ? upIcon : downIcon} />
              </Anchor>
            </ImageStyleWrapper>
          </AccordionContainer>
        ) : (
          <Heading
            locator={params.dataLocator}
            text={headerLabel}
            fontFamily="primary"
            fontSize="fs20"
            fontWeight="semibold"
            textAlign="center"
            color="gray.900"
          />
        )}

        {showCarousel && (
          <CarouselContainer>
            <Carousel
              data={products}
              renderItem={loadVariation(variation, {
                priceOnly,
                isPlcc,
                onQuickViewOpenClick,
                navigation,
                isRecentlyViewed,
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
        )}
        {showButton && <ButtonView {...props} />}
      </React.Fragment>
    )
  );
};

const fetchRecommendations = (loadRecommendations, action) => () => {
  loadRecommendations(action);
  return () => {};
};

const Recommendations = props => {
  const {
    variation,
    loadRecommendations,
    navigation,
    isPickupModalOpen,
    page,
    portalValue,
    partNumber,
    categoryName,
    isAddedToBagOpen,
  } = props;
  const variationArray = variation.split(',');
  const action = {
    pageType: page || 'homepageTest',
    ...(partNumber && { partNumber }),
    ...(portalValue && { mbox: portalValue }),
    ...(categoryName && { categoryName }),
  };
  useEffect(fetchRecommendations(loadRecommendations, action), []);

  return (
    <View>
      {variationArray.map(value => renderRecommendationView(props, value))}
      {!isAddedToBagOpen ? <AddedToBagContainer navigation={navigation} /> : null}
      {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
    </View>
  );
};

Recommendations.propTypes = {
  variation: PropTypes.string.isRequired,
  loadRecommendations: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  isPickupModalOpen: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  portalValue: PropTypes.string,
  partNumber: PropTypes.string,
  categoryName: PropTypes.string,
  isAddedToBagOpen: PropTypes.bool,
};

Recommendations.defaultProps = {
  portalValue: '',
  partNumber: '',
  categoryName: '',
  isAddedToBagOpen: false,
};

export default Recommendations;
