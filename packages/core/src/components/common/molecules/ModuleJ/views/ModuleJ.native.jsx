/* eslint-disable no-useless-constructor */
/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import { Button, Anchor, DamImage } from '../../../atoms';
import { getLocator } from '../../../../../utils';
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
  ImageContainer,
  MessageContainer,
  Border,
  Wrapper,
  ProductTabListContainer,
} from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';

const PRODUCT_IMAGE_WIDTH = 89;
const PRODUCT_IMAGE_HEIGHT = 110;
const PRODUCT_IMAGE_GUTTER = 16;
const PRODUCT_IMAGE_PER_SLIDE = 4;
const MODULE_HEIGHT = 142;
const MODULE_WIDTH = (PRODUCT_IMAGE_WIDTH + PRODUCT_IMAGE_GUTTER) * PRODUCT_IMAGE_PER_SLIDE;
const { IMG_DATA } = config;
class ModuleJ extends React.PureComponent<Props, State> {
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
    const selectedProductList = productTabList[selectedCategoryId];

    return (
      <ImageSlideWrapper>
        {item.map(productItem => {
          const {
            imageUrl: [imageUrl],
            pdpAsPath,
            productItemIndex,
          } = productItem;

          return (
            <ImageItemWrapper isFullMargin={productItemIndex === selectedProductList.length - 1}>
              <Anchor
                url={pdpAsPath}
                navigation={navigation}
                locator={`${getLocator('moduleJ_product_image')}${productItemIndex}`}
              >
                <StyledImage
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

  render() {
    const {
      selectedCategoryId,
      selectedTabItem: { singleCTAButton: selectedSingleCTAButton } = {},
    } = this.state;
    const {
      productTabList,
      navigation,
      layout,
      mediaLinkedList,
      headerText,
      promoBanner,
      divTabs,
      bgColor,
    } = this.props;

    const selectedProductList = productTabList[selectedCategoryId] || [];

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

    return (
      <Container>
        <MessageContainer layout={layout} bgColor={bgColor}>
          <Wrapper>
            <Border layout={layout} />
            <HeaderContainer layout={layout}>
              <LinkText navigation={navigation} headerText={[headerText[0]]} useStyle />
            </HeaderContainer>
            <SecondHeaderContainer>
              <LinkText
                navigation={navigation}
                headerText={[headerText[1]]}
                renderComponentInNewLine
                useStyle
              />
            </SecondHeaderContainer>
          </Wrapper>

          {promoBanner && (
            <PromoContainer layout={layout}>
              <PromoBanner promoBanner={promoBanner} navigation={navigation} />
            </PromoContainer>
          )}
        </MessageContainer>
        <ProductTabListContainer>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            tabItems={divTabs}
            navigation={navigation}
          />
        </ProductTabListContainer>
        <ImageContainer layout={layout}>
          <Anchor navigation={navigation} url={mediaLinkedList[1] && mediaLinkedList[1].link.url}>
            <DamImage
              url={mediaLinkedList[1] && mediaLinkedList[1].image.url}
              height="300px"
              width="100%"
              alt={mediaLinkedList[1] && mediaLinkedList[1].image.alt}
              imgConfig={IMG_DATA.promoImgConfig[0]}
            />
          </Anchor>
        </ImageContainer>

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

        {selectedSingleCTAButton ? (
          <ButtonContainer>
            <Button
              buttonVariation="variable-width"
              width="225px"
              text={selectedSingleCTAButton.text}
              url={selectedSingleCTAButton.url}
              navigation={navigation}
            />
          </ButtonContainer>
        ) : null}
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productTabList: {},
  navigation: null,
  mediaLinkedList: [],
  layout: 'default',
  divTabs: [],
};

ModuleJ.propTypes = {
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
  ),
  navigation: PropTypes.shape({}),
  layout: PropTypes.string,
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ),
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ),
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
