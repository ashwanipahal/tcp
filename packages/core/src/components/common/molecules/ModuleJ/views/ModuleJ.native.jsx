/* eslint-disable no-useless-constructor */
/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import { Button, Anchor, DamImage, Skeleton } from '../../../atoms';
import { getLocator, validateColor } from '../../../../../utils/index.native';
import { Carousel } from '../..';
import config from '../moduleJ.config';

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
  ImageContainer,
  MessageContainer,
  Border,
  Wrapper,
  StyledProductTabList,
} from '../styles/ModuleJ.style.native';

import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';

const PRODUCT_IMAGE_WIDTH = 89;
const PRODUCT_IMAGE_HEIGHT = 110;
const PRODUCT_IMAGE_GUTTER = 16;
const PRODUCT_IMAGE_PER_SLIDE = 4;
const MODULE_HEIGHT = 142;
const MODULE_WIDTH = (PRODUCT_IMAGE_WIDTH + PRODUCT_IMAGE_GUTTER) * PRODUCT_IMAGE_PER_SLIDE;
const { IMG_DATA, TOTAL_IMAGES } = config;
class ModuleJ extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: null,
      selectedTabItem: {},
    };
  }

  onProductTabChange = (catId, tabItem) => {
    this.setState({
      selectedCategoryId: catId,
      selectedTabItem: tabItem,
    });
  };

  renderCarouselSlide = slideProps => {
    const { item } = slideProps;
    const { navigation, productTabList } = this.props;
    const { selectedCategoryId } = this.state;
    let selectedProductList = productTabList[selectedCategoryId];
    selectedProductList = selectedProductList ? selectedProductList.slice(0, TOTAL_IMAGES) : [];

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
            <ImageItemWrapper
              key={uniqueId}
              isFullMargin={productItemIndex === selectedProductList.length - 1}
            >
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
                testID={`${getLocator('moduleJ_product_image')}${productItemIndex}`}
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

  renderCarousel = () => {
    const { selectedCategoryId } = this.state;
    const { productTabList } = this.props;
    let selectedProductList = productTabList[selectedCategoryId] || [];
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
    if (selectedProductList.length === 0) {
      return (
        <Skeleton
          row={1}
          col={3}
          width={PRODUCT_IMAGE_WIDTH}
          height={PRODUCT_IMAGE_HEIGHT}
          rowProps={{ justifyContent: 'space-around' }}
        />
      );
    }
    return (
      <ImageSlidesWrapper>
        {selectedProductList.length ? (
          <Carousel
            data={selectedProductCarouselList}
            renderItem={this.renderCarouselSlide}
            height={MODULE_HEIGHT}
            width={MODULE_WIDTH}
            carouselConfig={{
              autoplay: false,
            }}
            autoplay={false}
          />
        ) : null}
      </ImageSlidesWrapper>
    );
  };

  render() {
    const { selectedTabItem: { singleCTAButton: selectedSingleCTAButton } = {} } = this.state;
    const {
      navigation,
      layout,
      mediaLinkedList,
      headerText,
      promoBanner,
      divTabs,
      bgColor,
    } = this.props;

    return (
      <Container>
        <MessageContainer layout={layout} bgColor={validateColor(bgColor)}>
          <Wrapper>
            <Border layout={layout} />
            <HeaderContainer layout={layout}>
              {[headerText[0]] && (
                <LinkText
                  navigation={navigation}
                  headerText={[headerText[0]]}
                  testID={getLocator('moduleJ_header_text_0')}
                  useStyle
                />
              )}
            </HeaderContainer>
            <SecondHeaderContainer>
              {[headerText[1]] && (
                <LinkText
                  navigation={navigation}
                  headerText={[headerText[1]]}
                  testID={getLocator('moduleJ_header_text_1')}
                  renderComponentInNewLine
                  useStyle
                />
              )}
            </SecondHeaderContainer>
          </Wrapper>

          {promoBanner && (
            <PromoContainer layout={layout}>
              <PromoBanner
                testID={getLocator('moduleJ_promobanner_text')}
                promoBanner={promoBanner}
                navigation={navigation}
              />
            </PromoContainer>
          )}
        </MessageContainer>

        <StyledProductTabList
          onProductTabChange={this.onProductTabChange}
          tabItems={divTabs}
          navigation={navigation}
          testID={getLocator('moduleJ_cta_link')}
        />

        <ImageContainer layout={layout}>
          <Anchor navigation={navigation} url={mediaLinkedList[1] && mediaLinkedList[1].link.url}>
            <DamImage
              url={mediaLinkedList[1] && mediaLinkedList[1].image.url}
              height="300px"
              width="100%"
              testID={`${getLocator('moduleJ_promobanner_img')}${1}`}
              alt={mediaLinkedList[1] && mediaLinkedList[1].image.alt}
              imgConfig={IMG_DATA.promoImgConfig[0]}
            />
          </Anchor>
        </ImageContainer>

        {this.renderCarousel()}

        {selectedSingleCTAButton ? (
          <ButtonContainer>
            <Button
              width="225px"
              text={selectedSingleCTAButton.text}
              url={selectedSingleCTAButton.url}
              navigation={navigation}
              testID={getLocator('moduleJ_cta_btn')}
            />
          </ButtonContainer>
        ) : null}
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  bgColor: '',
  promoBanner: [],
};

ModuleJ.propTypes = {
  bgColor: PropTypes.string,
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
  productTabList: PropTypes.oneOfType(
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
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ).isRequired,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
