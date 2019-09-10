/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import { Button, Anchor } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { Carousel } from '../..';

import {
  Container,
  ImageItemWrapper,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  ButtonContainer,
  StyledImage,
} from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';

const PRODUCT_IMAGE_WIDTH = 89;
const PRODUCT_IMAGE_HEIGHT = 110;
const PRODUCT_IMAGE_GUTTER = 16;
const PRODUCT_IMAGE_PER_SLIDE = 4;
const MODULE_HEIGHT = 142;
const MODULE_WIDTH = (PRODUCT_IMAGE_WIDTH + PRODUCT_IMAGE_GUTTER) * PRODUCT_IMAGE_PER_SLIDE;

class ModuleJ extends React.PureComponent {
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
                  name={LAZYLOAD_HOST_NAME.HOME}
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
    const { productTabList } = this.props;
    const selectedProductList = productTabList[selectedCategoryId] || [];
    const { navigation } = this.props;

    const selectedProductListCar = selectedProductList.reduce(
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
        <ProductTabList
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />

        <ImageSlidesWrapper>
          {selectedProductList.length ? (
            <Carousel
              data={selectedProductListCar}
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
};

ModuleJ.propTypes = {
  productTabList: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      uniqueId: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      seo_token: PropTypes.string,
    }),
  }),
  navigation: PropTypes.shape({}),
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
