/* eslint-disable no-useless-constructor */
/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import { Button, Anchor, Image } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { Carousel } from '../..';

import {
  Container,
  ImageItemWrapper,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  ButtonContainer,
  StyledImage,
  PromoContainer,
  HeaderContainer,
  ImageContainer,
  MessageContainer,
  Border,
  Wrapper,
  ProductTabListContainer,
} from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';

const PRODUCT_IMAGE_WIDTH = 89;
const PRODUCT_IMAGE_HEIGHT = 110;
const PRODUCT_IMAGE_GUTTER = 16;
const PRODUCT_IMAGE_PER_SLIDE = 4;
const MODULE_HEIGHT = 142;
const MODULE_WIDTH = (PRODUCT_IMAGE_WIDTH + PRODUCT_IMAGE_GUTTER) * PRODUCT_IMAGE_PER_SLIDE;

class ModuleJ extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: null,
    };
  }

  onProductTabChange = catId => {
    this.setState({
      selectedCategoryId: catId,
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
            seo_token: seoToken,
            uniqueId,
            imageUrl: [imageUrl],
            productItemIndex,
          } = productItem;

          const pdpUrl = `/p/${seoToken || uniqueId}`;
          return (
            <ImageItemWrapper isFullMargin={productItemIndex === selectedProductList.length - 1}>
              <Anchor
                url={pdpUrl}
                navigation={navigation}
                locator={`${getLocator('moduleJ_product_image')}${productItemIndex}`}
              >
                <StyledImage
                  host={LAZYLOAD_HOST_NAME.HOME}
                  url={imageUrl}
                  height={PRODUCT_IMAGE_HEIGHT}
                  width={PRODUCT_IMAGE_WIDTH}
                />
              </Anchor>
            </ImageItemWrapper>
          );
        })}
      </ImageSlideWrapper>
    );
  };

  render() {
    const { selectedCategoryId } = this.state;
    const {
      productTabList,
      navigation,
      layout,
      mediaLinkedList,
      headerText,
      promoBanner,
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
        <MessageContainer layout={layout}>
          <Wrapper>
            <Border layout={layout} />
            <HeaderContainer layout={layout}>
              <LinkText
                navigation={navigation}
                headerText={headerText}
                renderComponentInNewLine
                useStyle
              />
            </HeaderContainer>
          </Wrapper>

          <PromoContainer layout={layout}>
            <PromoBanner promoBanner={promoBanner} navigation={navigation} />
          </PromoContainer>
        </MessageContainer>
        <ProductTabListContainer>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            categoryList={categoryListMock}
            navigation={navigation}
          />
        </ProductTabListContainer>
        <ImageContainer layout={layout}>
          <Anchor navigation={navigation} url={mediaLinkedList[1] && mediaLinkedList[1].link.url}>
            <Image
              url={mediaLinkedList[1] && mediaLinkedList[1].image.url}
              height="300px"
              width="100%"
              alt={mediaLinkedList[1] && mediaLinkedList[1].image.alt}
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
        <ButtonContainer>
          {/* TODO: The URL and text will be updated once we have CMS integration */}
          <Button
            buttonVariation="variable-width"
            width="225px"
            text="SHOP ALL"
            navigation={navigation}
          />
        </ButtonContainer>
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productTabList: {},
  navigation: null,
  mediaLinkedList: [],
  layout: 'alt',
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
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
