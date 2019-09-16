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

class ModuleR extends React.PureComponent {
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

  getCategoryList() {
    const { divTabs } = this.props;

    return divTabs.map(item => {
      const {
        category: { cat_id: catId },
        text: { text },
      } = item;
      return { text, catId };
    });
  }

  getDivTabMap() {
    const { divTabs } = this.props;
    return divTabs.reduce((map, item) => {
      const {
        category: { cat_id: catId },
      } = item;
      const tabsMap = map;
      tabsMap[catId] = item;
      return tabsMap;
    }, {});
  }

  /*
     Return Image Grid with and without Promo Banner. Promo Banner should be included
     in the selectedProductList in order to render in the grid.
  */
  getImageGrid = selectedProductList => {
    const { layout, navigation } = this.props;

    return (
      <ImageContainer layout={layout}>
        {selectedProductList.map(productItem => {
          // check if productItem is not a PromoBanner component. Else render the promon banner
          if (productItem.uniqueId) {
            const {
              uniqueId,
              imageUrl: [imageUrl],
              productItemIndex,
              pdpUrl,
            } = productItem;

            return (
              <ImageItemWrapper
                key={uniqueId}
                width={PRODUCT_IMAGE_WIDTH}
                isFullMargin={productItemIndex === selectedProductList.length - 1}
              >
                <Anchor
                  url={pdpUrl}
                  navigation={navigation}
                  locator={`${getLocator('moduleR_product_image')}${productItemIndex}`}
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
          }

          return <ImageItemWrapper width={PRODUCT_IMAGE_WIDTH}>{productItem}</ImageItemWrapper>;
        })}
      </ImageContainer>
    );
  };

  render() {
    const { navigation, productTabList, headerText, promoBanner, layout } = this.props;
    const { selectedCategoryId } = this.state;

    const divTabsMap = this.getDivTabMap();
    const selectedDivTab = divTabsMap[selectedCategoryId] || {};
    const selectedSingleCTAButton = selectedDivTab.singleCTAButton;
    let selectedProductList = productTabList[selectedCategoryId] || [];

    const promoComponentContainer = (
      <PromoContainer>
        <PromoBanner promoBanner={promoBanner} navigation={navigation} />
      </PromoContainer>
    );

    /* If the layout is default then we slice 8 images and put the Promo-Header Component
       in the middle of the Array so that we can render it while iterating the images.
       On the case of alt layout we will only show only images so sliced 9 images.
    */
    if (selectedProductList.length) {
      if (layout === 'default') {
        selectedProductList = selectedProductList.slice(0, 8);
        selectedProductList.splice(4, 0, promoComponentContainer);
      } else {
        selectedProductList = selectedProductList.slice(0, 9);
      }
    }

    return (
      <Container>
        <HeaderContainer>
          <LinkText
            navigation={navigation}
            headerText={headerText}
            renderComponentInNewLine
            useStyle
          />
        </HeaderContainer>
        {layout === 'alt' ? promoComponentContainer : null}
        <ProductTabListContainer>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            categoryList={this.getCategoryList()}
            navigation={navigation}
          />
        </ProductTabListContainer>

        {this.getImageGrid(selectedProductList)}

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

ModuleR.defaultProps = {
  headerText: [],
  productTabList: {},
  navigation: null,
  layout: 'default',
  promoBanner: [],
  divTabs: [],
};

ModuleR.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
      link: PropTypes.object,
      icon: PropTypes.object,
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
  ),
  navigation: PropTypes.shape({}),
  layout: PropTypes.string,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
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

export default ModuleR;
export { ModuleR as ModuleRVanilla };
