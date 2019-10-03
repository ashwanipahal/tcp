/* istanbul ignore file */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import { Button, Anchor, BodyCopy } from '../../../atoms';
import { getLocator, getScreenWidth } from '../../../../../utils/index.native';
import { Carousel } from '../..';
import config from '../ModuleQ.config';

import {
  Container,
  ImageItemWrapper,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  OutfitItemsWrapper,
  ButtonContainer,
  StyledImage,
  OutfitItemTileWrapper,
  OutfitMainImageWrapper,
  OutfitMainTileWrapper,
  PromoContainer,
  HeaderContainer,
  SecondHeaderContainer,
  MessageContainer,
  Wrapper,
  ProductTabListContainer,
  RestOutfitItemCountWrapper,
} from '../styles/ModuleQ.style.native';

import ProductTabList from '../../../organisms/StyliticsProductTabList';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';

const MODULE_WIDTH = getScreenWidth();

const { TOTAL_IMAGES, CAROUSEL_OPTIONS } = config;
const {
  PRODUCT_IMAGE_WIDTH,
  PRODUCT_IMAGE_HEIGHT,
  MODULE_HEIGHT,
  OUTFIT_ITEM_IMAGE_HEIGHT,
  OUTFIT_ITEM_IMAGE_WIDTH,
  LOOP_CLONES_PER_SIDE,
  INACTIVE_SLIDE_SCALE,
  INACTIVE_SLIDE_OPACITY,
  ITEM_WIDTH,
} = CAROUSEL_OPTIONS.APP;
const getUrlWithHttp = url => url.replace(/(^\/\/)/, 'https:$1');

function getCarouselSlide(productItem, navigation, moduleQMainTile) {
  const { imageUrl, items, subItemsId, productItemIndex } = productItem;
  const totalOutfitItemsToShow = 2;
  const outfitItemsToShow = items.slice(0, totalOutfitItemsToShow);

  return (
    <ImageSlideWrapper>
      <ImageItemWrapper>
        <Anchor
          navigation={navigation}
          testID={`${getLocator('moduleQ_product_image')}${productItemIndex}`}
          onPress={() =>
            navigation.navigate('ProductDetail', {
              title: '',
              pdpUrl: subItemsId,
              selectedColorProductId: subItemsId,
              reset: true,
            })
          }
        >
          <OutfitMainTileWrapper>
            <OutfitMainImageWrapper>
              <StyledImage
                alt="Outfit Image"
                host={LAZYLOAD_HOST_NAME.HOME}
                url={getUrlWithHttp(imageUrl)}
                height={PRODUCT_IMAGE_HEIGHT}
                width={PRODUCT_IMAGE_WIDTH}
              />
            </OutfitMainImageWrapper>
            <BodyCopy
              text={`${moduleQMainTile}  ›`}
              fontSize="fs12"
              fontFamily="secondary"
              textAlign="center"
            />
          </OutfitMainTileWrapper>
          <OutfitItemsWrapper>
            {outfitItemsToShow.map(item => {
              const { name: alt, remoteId, smallImageUrl } = item;

              return (
                <OutfitItemTileWrapper>
                  <StyledImage
                    key={remoteId}
                    alt={alt}
                    host={LAZYLOAD_HOST_NAME.HOME}
                    url={getUrlWithHttp(smallImageUrl)}
                    height={OUTFIT_ITEM_IMAGE_HEIGHT}
                    width={OUTFIT_ITEM_IMAGE_WIDTH}
                  />
                </OutfitItemTileWrapper>
              );
            })}
            <OutfitItemTileWrapper>
              <RestOutfitItemCountWrapper
                width={OUTFIT_ITEM_IMAGE_WIDTH}
                height={OUTFIT_ITEM_IMAGE_HEIGHT}
              >
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs22"
                  textAlign="center"
                  fontWeight="extrabold"
                  text={`+${items.length - totalOutfitItemsToShow}`}
                />
              </RestOutfitItemCountWrapper>
            </OutfitItemTileWrapper>
          </OutfitItemsWrapper>
        </Anchor>
      </ImageItemWrapper>
    </ImageSlideWrapper>
  );
}

const ModuleQ = props => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedTabItem, setSelectedTabItem] = useState(null);

  const {
    styliticsProductTabList,
    navigation,
    headerText,
    promoBanner,
    divTabs,
    bgClass,
    autoplayInterval,
    accessibility: { moduleQMainTile = 'Shop This Look' },
  } = props;

  const { singleCTAButton: selectedSingleCTAButton } = selectedTabItem || {};
  let selectedProductList = styliticsProductTabList[selectedCategoryId] || [];
  selectedProductList = selectedProductList.slice(0, TOTAL_IMAGES);

  /* Add productItemIndex for the testIDs */
  const selectedProductCarouselList = selectedProductList.map((item, index) => {
    return { ...item, productItemIndex: index };
  });

  const renderCarouselSlide = slideProps => {
    const { item } = slideProps;
    return getCarouselSlide(item, navigation, moduleQMainTile);
  };

  const onProductTabChange = (categoryId, tabItem) => {
    setSelectedCategoryId(categoryId);
    setSelectedTabItem(tabItem);
  };

  return (
    <Container bgClass={bgClass}>
      <MessageContainer>
        <Wrapper>
          {headerText[0] && (
            <HeaderContainer>
              <LinkText
                navigation={navigation}
                headerText={[headerText[0]]}
                testID={getLocator('moduleQ_header_text_0')}
                useStyle
              />
            </HeaderContainer>
          )}
          {headerText[1] && (
            <SecondHeaderContainer>
              <LinkText
                navigation={navigation}
                headerText={[headerText[1]]}
                testID={getLocator('moduleQ_header_text_1')}
                renderComponentInNewLine
                useStyle
              />
            </SecondHeaderContainer>
          )}
        </Wrapper>

        {promoBanner && (
          <PromoContainer>
            <PromoBanner
              testID={getLocator('moduleQ_promobanner_text')}
              promoBanner={promoBanner}
              navigation={navigation}
            />
          </PromoContainer>
        )}
      </MessageContainer>
      <ProductTabListContainer>
        <ProductTabList
          onProductTabChange={onProductTabChange}
          tabItems={divTabs}
          navigation={navigation}
          testID={getLocator('moduleQ_cta_link')}
        />
      </ProductTabListContainer>

      <ImageSlidesWrapper>
        {selectedProductList.length ? (
          <Carousel
            data={selectedProductCarouselList}
            renderItem={renderCarouselSlide}
            height={MODULE_HEIGHT}
            options={{
              loopClonesPerSide: LOOP_CLONES_PER_SIDE,
              inactiveSlideScale: INACTIVE_SLIDE_SCALE,
              inactiveSlideOpacity: INACTIVE_SLIDE_OPACITY,
              sliderWidth: MODULE_WIDTH,
              itemWidth: ITEM_WIDTH,
              autoplay: CAROUSEL_OPTIONS.autoplay,
            }}
            autoplayInterval={autoplayInterval * 1000}
            paginationProps={{
              containerStyle: { paddingVertical: 5 },
            }}
            showDots
          />
        ) : null}
      </ImageSlidesWrapper>

      {selectedSingleCTAButton ? (
        <ButtonContainer>
          <Button
            buttonVariation="variable-width"
            width="225px"
            text={selectedSingleCTAButton.text}
            url={selectedSingleCTAButton.url}
            navigation={navigation}
            testID={getLocator('moduleQ_cta_btn')}
          />
        </ButtonContainer>
      ) : null}
    </Container>
  );
};

ModuleQ.defaultProps = {
  bgClass: '',
  promoBanner: null,
  autoplayInterval: 1,
  accessibility: {},
};

ModuleQ.propTypes = {
  bgClass: PropTypes.string,
  autoplayInterval: PropTypes.number,
  accessibility: PropTypes.shape({}),
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ),
  styliticsProductTabList: PropTypes.oneOfType(
    PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          imageUrl: PropTypes.array.isRequired,
          items: PropTypes.array,
          largeImageUrl: PropTypes.string,
          pdpUrl: PropTypes.string,
        })
      )
    )
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
};

export default ModuleQ;
export { ModuleQ as ModuleQVanilla };
