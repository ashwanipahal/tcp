/* istanbul ignore file */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import { Button, Anchor } from '../../../atoms';
import { getLocator } from '../../../../../utils/index.native';
import { Carousel } from '../..';
import config from '../config';

import {
  Container,
  ImageItemWrapper,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  ButtonContainer,
  StyledImage,
  PromoContainer,
  HeaderContainer,
  SecondHeaderContainer,
  MessageContainer,
  Wrapper,
  ProductTabListContainer,
} from '../styles/ModuleQ.style.native';

import ProductTabList from '../../../organisms/StyliticsProductTabList';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';

const PRODUCT_IMAGE_WIDTH = 89;
const PRODUCT_IMAGE_HEIGHT = 110;
const PRODUCT_IMAGE_GUTTER = 16;
const PRODUCT_IMAGE_PER_SLIDE = 4;
const MODULE_HEIGHT = 142;
const MODULE_WIDTH = (PRODUCT_IMAGE_WIDTH + PRODUCT_IMAGE_GUTTER) * PRODUCT_IMAGE_PER_SLIDE;
const { IMG_DATA, TOTAL_IMAGES } = config;

const getCarouselSlide = (item, navigation) => {
  return (
    <ImageSlideWrapper>
      {item.map(productItem => {
        const {
          imageUrl: [imageUrl],
          uniqueId,
          product_name: productName,
          productItemIndex,
        } = productItem;

        return (
          <ImageItemWrapper key={uniqueId}>
            <Anchor
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  title: productName,
                  pdpUrl: uniqueId,
                  selectedColorProductId: uniqueId,
                  reset: true,
                })
              }
              navigation={navigation}
              testID={`${getLocator('moduleQ_product_image')}${productItemIndex}`}
            >
              <StyledImage
                alt={productName}
                host={LAZYLOAD_HOST_NAME.HOME}
                url={imageUrl}
                height={PRODUCT_IMAGE_HEIGHT}
                width={PRODUCT_IMAGE_WIDTH}
                imageConfig={IMG_DATA.productImgConfig[0]}
              />
            </Anchor>
          </ImageItemWrapper>
        );
      })}
    </ImageSlideWrapper>
  );
};

const ModuleQ = props => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedTabItem, setSelectedTabItem] = useState(null);

  const {
    styliticsProductTabList,
    navigation,
    layout,
    headerText,
    promoBanner,
    divTabs,
    bgClass,
  } = props;

  const { singleCTAButton: selectedSingleCTAButton } = selectedTabItem || {};
  let selectedProductList = styliticsProductTabList[selectedCategoryId] || [];
  selectedProductList = selectedProductList.slice(0, TOTAL_IMAGES);

  const selectedProductCarouselList = selectedProductList.reduce(
    (list, item, index) => {
      const lastList = list[list.length - 1];
      if (lastList.length === PRODUCT_IMAGE_PER_SLIDE) {
        list.push([{ ...item, productItemIndex: index }]);
      } else {
        lastList.push({ ...item, productItemIndex: index });
      }

      return list;
    },
    [[]]
  );

  const renderCarouselSlide = slideProps => {
    const { item } = slideProps;
    return getCarouselSlide(item, navigation);
  };

  const onProductTabChange = (categoryId, tabItem) => {
    setSelectedCategoryId(categoryId);
    setSelectedTabItem(tabItem);
  };

  return (
    <Container className={bgClass}>
      <MessageContainer layout={layout}>
        <Wrapper>
          {headerText[0] && (
            <HeaderContainer layout={layout}>
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
          <PromoContainer layout={layout}>
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
            width={MODULE_WIDTH}
            carouselConfig={{
              autoplay: false,
            }}
            autoplay={false}
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
};

ModuleQ.propTypes = {
  bgClass: PropTypes.string,
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
          uniqueId: PropTypes.string.isRequired,
          imageUrl: PropTypes.array.isRequired,
          seo_token: PropTypes.string,
        })
      )
    )
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  layout: PropTypes.string.isRequired,
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
