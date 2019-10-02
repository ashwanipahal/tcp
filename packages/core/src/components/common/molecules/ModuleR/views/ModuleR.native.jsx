/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Button, Anchor } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { LAZYLOAD_HOST_NAME } from '../../../../../utils/utils.app';

import {
  Container,
  HeaderContainer,
  PromoContainer,
  ImageItemWrapper,
  ButtonContainer,
  StyledImage,
  ImageContainer,
  ProductTabListContainer,
} from '../styles/ModuleR.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';

const PRODUCT_IMAGE_WIDTH = 103;
const PRODUCT_IMAGE_HEIGHT = 127;

/**
 * @class ModuleR - global reusable component will display featured
 * category module with category links and featured product images
 * This component is plug and play at any given slot in layout by passing required data
 * @param {productTabList} productTabList the list of data for tabs
 * @param {headerText} headerText the list of data for header
 * @param {promoBanner} promoBanner promo banner data
 */
class ModuleR extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: null,
      currentTabItem: {},
    };
  }

  onProductTabChange = (catId, tabItem) => {
    this.setState({
      selectedCategoryId: catId,
      currentTabItem: tabItem,
    });
  };

  /*
     Return Image Grid with and without Promo Banner. Promo Banner should be included
     in the selectedProductList in order to render in the grid.
  */
  getImageGrid = selectedProductList => {
    const { bannerPosition, navigation } = this.props;

    return (
      <ImageContainer layout={bannerPosition}>
        {selectedProductList.map(productItem => {
          // check if productItem is not a PromoBanner component. Else render the promon banner
          if (productItem.uniqueId) {
            const {
              uniqueId,
              imageUrl: [imageUrl],
              productItemIndex,
              product_name: productName,
            } = productItem;

            return (
              <ImageItemWrapper
                key={uniqueId}
                width={PRODUCT_IMAGE_WIDTH}
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
                  locator={`${getLocator('moduleR_product_image')}${productItemIndex}`}
                >
                  <StyledImage
                    alt={productName}
                    host={LAZYLOAD_HOST_NAME.HOME}
                    url={imageUrl}
                    height={PRODUCT_IMAGE_HEIGHT}
                    width={PRODUCT_IMAGE_WIDTH}
                  />
                </Anchor>
              </ImageItemWrapper>
            );
          }

          return <ImageItemWrapper width={PRODUCT_IMAGE_WIDTH}>{productItem}</ImageItemWrapper>;
        })}
      </ImageContainer>
    );
  };

  getCurrentCTAButton() {
    const { navigation } = this.props;
    const { currentTabItem: { singleCTAButton: currentSingleCTAButton } = {} } = this.state;
    return currentSingleCTAButton ? (
      <ButtonContainer>
        <Button
          buttonVariation="variable-width"
          width="225px"
          text={currentSingleCTAButton.text}
          url={currentSingleCTAButton.url}
          navigation={navigation}
        />
      </ButtonContainer>
    ) : null;
  }

  render() {
    const {
      navigation,
      divTabs,
      productTabList,
      headerText,
      promoBanner,
      bannerPosition,
    } = this.props;
    const { selectedCategoryId } = this.state;
    let selectedProductList = productTabList[selectedCategoryId] || [];

    const promoComponentContainer = promoBanner && (
      <PromoContainer>
        <PromoBanner promoBanner={promoBanner} navigation={navigation} />
      </PromoContainer>
    );

    /* If the layout is default then we slice 8 images and put the Promo-Header Component
       in the middle of the Array so that we can render it while iterating the images.
       On the case of alt layout we will only show only images so sliced 9 images.
    */
    if (selectedProductList.length) {
      if (promoBanner && bannerPosition === 'center') {
        selectedProductList = selectedProductList.slice(0, 8);
        selectedProductList.splice(4, 0, promoComponentContainer);
      } else {
        selectedProductList = selectedProductList.slice(0, 9);
      }
    }

    return (
      <Container>
        <HeaderContainer>
          {headerText && (
            <LinkText
              navigation={navigation}
              headerText={headerText}
              renderComponentInNewLine
              useStyle
            />
          )}
        </HeaderContainer>
        {promoBanner && bannerPosition === 'top' ? promoComponentContainer : null}
        <ProductTabListContainer>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            tabItems={divTabs}
            navigation={navigation}
          />
        </ProductTabListContainer>

        {this.getImageGrid(selectedProductList)}
        {this.getCurrentCTAButton()}
      </Container>
    );
  }
}

ModuleR.defaultProps = {
  promoBanner: [],
  bannerPosition: 'center',
};

ModuleR.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
      link: PropTypes.object,
      icon: PropTypes.object,
    })
  ).isRequired,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
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
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
      link: PropTypes.object,
    })
  ),
  bannerPosition: PropTypes.string,
};

export default ModuleR;
export { ModuleR as ModuleRVanilla };
