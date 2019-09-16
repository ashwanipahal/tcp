/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import { Button, Anchor } from '../../../atoms';
import { getLocator } from '../../../../../utils';

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

  render() {
    const { navigation, productTabList, headerText, promoBanner, divTabs, layout } = this.props;
    const categoryList = divTabs.map(item => {
      const {
        category: { cat_id: catId },
        text: { text },
      } = item;
      return { text, catId };
    });

    const divTabsMap = divTabs.reduce((map, item) => {
      const {
        category: { cat_id: catId },
      } = item;
      const tabsMap = map;
      tabsMap[catId] = item;
      return tabsMap;
    }, {});

    const { selectedCategoryId } = this.state;
    const selectedDivTab = divTabsMap[selectedCategoryId] || {};
    const selectedSingleCTAButton = selectedDivTab.singleCTAButton;
    let selectedProductList = productTabList[selectedCategoryId] || [];

    const promoComponent = (
      <PromoContainer>
        <PromoBanner promoBanner={promoBanner} navigation={navigation} />
      </PromoContainer>
    );

    if (selectedProductList.length) {
      /*
        Slicing the product as per this module requirement. This will change as currently we
        don't have an option to configure count of product in the ProductTabList component. Also
        the products live in state. We might need to move the state to local state of the
        ProductTabList so that we can hand product list requirement according to the modules requirement.
      */
      if (layout === 'default') {
        selectedProductList = selectedProductList.slice(0, 8);
        selectedProductList.splice(4, 0, promoComponent);
      } else {
        selectedProductList = selectedProductList.slice(0, 9);
      }
    }

    console.info('----', selectedProductList);

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
        {layout === 'alt' ? promoComponent : null}
        <ProductTabListContainer>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            categoryList={categoryList}
            navigation={navigation}
          />
        </ProductTabListContainer>
        <ImageContainer layout={layout}>
          {selectedProductList.map(productItem => {
            if (productItem.uniqueId) {
              const {
                seo_token: seoToken,
                uniqueId,
                imageUrl: [imageUrl],
                productItemIndex,
              } = productItem;

              const pdpUrl = `/p/${seoToken || uniqueId}`;
              return (
                <ImageItemWrapper
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
};

ModuleR.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.object,
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
};

export default ModuleR;
export { ModuleR as ModuleRVanilla };
