import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { Button, Anchor, DamImage, Skeleton } from '../../../atoms';
import { getLocator } from '../../../../../utils/index.native';
import { Carousel } from '../..';
import QuickViewModal from '../../../organisms/QuickViewModal/container/QuickViewModal.container';
import config from '../../ModuleJ/moduleJ.config';

import {
  Container,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  ButtonContainer,
  PromoContainer,
  MessageContainer,
  Wrapper,
  StyledAnchor,
  MiddleContainer,
  Border,
  Circle,
  StyledCustomImage,
  SHADOW,
  ShadowContainer,
  ProductTabListContainer,
} from '../ModuleG.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';

const PRODUCT_IMAGE_WIDTH = 203;
const PRODUCT_IMAGE_HEIGHT = 200;
const PRODUCT_IMAGE_GUTTER = 1;
const PRODUCT_IMAGE_PER_SLIDE = 4;
const MODULE_HEIGHT = 256;
const MODULE_WIDTH = (PRODUCT_IMAGE_WIDTH + PRODUCT_IMAGE_GUTTER) * PRODUCT_IMAGE_PER_SLIDE + 60;
const { TOTAL_IMAGES } = config;
const { width: screenWidth } = Dimensions.get('window');

const LOOP_CLONES_PER_SIDE = 7;
const INACTIVE_SLIDE_SCALE = 0.7;
const INACTIVE_SLIDE_OPACITY = 0.8;
const ITEM_WIDTH = 235;

const plusIcon = require('../../../../../../src/assets/plus.png');

/**
 * @param {object} props : Props for Module G multi type of banner list, button list, header text.
 * @desc This is Module G global component. It has capability to display
 * featured content module with links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

// TODO: keys will be changed once we get the actual data from CMS

class ModuleG extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: [],
    };
  }

  onProductTabChange = catId => {
    this.setState({
      selectedCategoryId: catId,
    });
  };

  getImagesData = () => {
    const { selectedCategoryId } = this.state;

    const { productTabList } = this.props;

    let data = [];
    data = selectedCategoryId.map(item => [...data, ...(productTabList[item] || [])]);
    data = data.slice(0, TOTAL_IMAGES);
    if (Object.keys(productTabList).length) {
      return data;
    }
    return [];
  };

  onAddToBagClick = () => {
    const { onQuickViewOpenClick } = this.props;
    const { next = 0 } = this.state;
    const data = this.getImagesData();
    onQuickViewOpenClick([
      {
        colorProductId: data.length && data[0][next].prodpartno,
      },
      {
        colorProductId: data.length && data[1][next].prodpartno,
      },
    ]);
  };

  /**
   * @param {object} props : Props for renderCarouselSlide accept slideProps & parallaxProps and render the image sliding view.
   */
  renderCarouselSlide = item => {
    const { item: itemValue } = item;
    const { navigation } = this.props;
    let itemData;
    if (itemValue) {
      [itemData] = itemValue;
    }
    const { imageUrl, productItemIndex, product_name: productName, uniqueId } = itemData;
    return (
      <ImageSlideWrapper>
        <View style={{ width: screenWidth, height: PRODUCT_IMAGE_HEIGHT }}>
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
            testID={`${getLocator('moduleG_product_image')}${productItemIndex}`}
          >
            <DamImage url={imageUrl[0]} height={PRODUCT_IMAGE_HEIGHT} width={PRODUCT_IMAGE_WIDTH} />
          </Anchor>
        </View>
      </ImageSlideWrapper>
    );
  };

  getDataStatus = selectedCategoryId => {
    const { productTabList = {} } = this.props;
    let dataStatus = true;
    if (productTabList && productTabList.completed) {
      dataStatus = productTabList.completed[selectedCategoryId];
    }
    return dataStatus;
  };

  getMiddleContainer = (dataLength, type) => {
    if (!dataLength) {
      return null;
    }
    if (type === 'shadow') {
      return (
        <ShadowContainer>
          <SHADOW />
        </ShadowContainer>
      );
    }
    return (
      <MiddleContainer>
        <Border />
        <Circle />
        <StyledCustomImage source={plusIcon} />
      </MiddleContainer>
    );
  };

  renderHeader = (headerText, promoBanner, navigation) => {
    return (
      <MessageContainer>
        <Wrapper>
          {headerText && headerText.length > 0 && (
            <LinkText
              navigation={navigation}
              headerText={headerText}
              locator={getLocator('moduleG_header_text')}
              useStyle
            />
          )}
        </Wrapper>
        {promoBanner && (
          <PromoContainer>
            <PromoBanner
              testID={getLocator('moduleG_promobanner_text')}
              promoBanner={promoBanner}
              navigation={navigation}
            />
          </PromoContainer>
        )}
      </MessageContainer>
    );
  };

  renderFirstCarousel = (firstCarouseProductList, firstCarouselList) => {
    return (
      <View>
        {firstCarouseProductList && firstCarouseProductList.length > 0 ? (
          <Carousel
            data={firstCarouselList}
            renderItem={this.renderCarouselSlide}
            height={MODULE_HEIGHT}
            options={{
              loopClonesPerSide: LOOP_CLONES_PER_SIDE,
              inactiveSlideScale: INACTIVE_SLIDE_SCALE,
              inactiveSlideOpacity: INACTIVE_SLIDE_OPACITY,
              sliderWidth: MODULE_WIDTH,
              itemWidth: ITEM_WIDTH,
              autoplay: false,
            }}
            paginationProps={{
              containerStyle: { paddingVertical: 5 },
            }}
          />
        ) : null}
      </View>
    );
  };

  renderSecondCarousel = (secondCarouseProductList, secondCarouselList) => {
    return (
      <View>
        {secondCarouseProductList && secondCarouseProductList.length ? (
          <Carousel
            data={secondCarouselList}
            renderItem={this.renderCarouselSlide}
            height={MODULE_HEIGHT}
            options={{
              loopClonesPerSide: LOOP_CLONES_PER_SIDE,
              inactiveSlideScale: INACTIVE_SLIDE_SCALE,
              inactiveSlideOpacity: INACTIVE_SLIDE_OPACITY,
              sliderWidth: MODULE_WIDTH,
              itemWidth: ITEM_WIDTH,
              autoplay: false,
            }}
            paginationProps={{
              containerStyle: { paddingVertical: 5 },
            }}
          />
        ) : null}
      </View>
    );
  };

  /**
   * @param {object} props : Props for renderView multi type of banner list, button list, header text.
   * @desc This is Method return the complete View with CTA Button .
   */

  renderView = (
    selectedProductCarouselList,
    selectedProductList,
    selectedSingleCTAButton,
    selectedSingleCTAButtonCart
  ) => {
    const { navigation, headerText, promoBanner, divTabs } = this.props;
    const firstCarouselList = selectedProductCarouselList[0];
    const secondCarouselList = selectedProductCarouselList[1];
    const firstCarouseProductList = selectedProductList[0] || [];
    const secondCarouseProductList = selectedProductList[1] || [];
    const { selectedCategoryId } = this.state;
    const dataStatus =
      this.getDataStatus(selectedCategoryId[0]) || this.getDataStatus(selectedCategoryId[1]);

    return (
      <Container>
        <MessageContainer>
          {this.renderHeader(headerText, promoBanner, navigation)}
        </MessageContainer>

        <ProductTabListContainer>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            tabItems={divTabs}
            navigation={navigation}
            testID={getLocator('moduleG_cta_link')}
          />
        </ProductTabListContainer>

        {!dataStatus ? (
          <ShadowContainer>
            <SHADOW />
          </ShadowContainer>
        ) : null}

        <View>
          {dataStatus ? (
            <Skeleton
              row={1}
              col={3}
              width={190}
              height={170}
              rowProps={{ justifyContent: 'center', marginTop: '20px' }}
              showArrows
            />
          ) : null}

          <ImageSlidesWrapper>
            {this.renderFirstCarousel(firstCarouseProductList, firstCarouselList)}
          </ImageSlidesWrapper>

          {!dataStatus ? (
            <MiddleContainer>
              <Border />
              <Circle />
              <StyledCustomImage source={plusIcon} />
            </MiddleContainer>
          ) : null}
          {dataStatus ? (
            <Skeleton
              row={1}
              col={3}
              width={190}
              height={170}
              rowProps={{ justifyContent: 'center', marginTop: '20px' }}
              showArrows
            />
          ) : null}

          <ImageSlidesWrapper>
            {this.renderSecondCarousel(secondCarouseProductList, secondCarouselList)}
          </ImageSlidesWrapper>
        </View>

        {selectedSingleCTAButton ? (
          <ButtonContainer>
            <Button
              width="225px"
              text={selectedSingleCTAButton.title}
              onPress={this.onAddToBagClick}
              navigation={navigation}
              testID={getLocator('moduleG_cta_btn')}
            />
          </ButtonContainer>
        ) : null}

        {selectedSingleCTAButtonCart ? (
          <StyledAnchor
            anchorVariation="primary"
            text={selectedSingleCTAButtonCart.text}
            fontSizeVariation="xlarge"
            url={selectedSingleCTAButtonCart.url}
            navigation={navigation}
            visible
          />
        ) : null}
        <QuickViewModal />
      </Container>
    );
  };

  /**
   * @desc This is Method return the view with TAB List.
   */
  render() {
    const { selectedCategoryId = [] } = this.state;

    const { divTabs, productTabList = {} } = this.props;
    const { CAROUSEL_OPTIONS } = config;
    CAROUSEL_OPTIONS.beforeChange = (current, next) => {
      this.setState({ next });
    };
    const selectedProdLists = [];
    selectedCategoryId.forEach((catId, index) => {
      const productList = productTabList[selectedCategoryId[index]] || [];
      selectedProdLists.push(productList.slice(0, TOTAL_IMAGES));
    });

    // eslint-disable-next-line prefer-const
    let selectedProductCarouselList1 = [];
    selectedProdLists.forEach(prodlist => {
      selectedProductCarouselList1.push(
        prodlist.reduce(
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
        )
      );
    });

    let selectedSingleCTAButton;
    let selectedSingleCTAButtonCart;
    divTabs.forEach(tab => {
      if (JSON.stringify(tab.category.cat_id) === JSON.stringify(selectedCategoryId)) {
        selectedSingleCTAButton = tab.singleCTAButton;
        selectedSingleCTAButtonCart = tab.singleCTAButtonCart;
      }
    });

    return this.renderView(
      selectedProductCarouselList1,
      selectedProdLists,
      selectedSingleCTAButton,
      selectedSingleCTAButtonCart
    );
  }
}

ModuleG.defaultProps = {
  promoBanner: [],
};

ModuleG.propTypes = {
  onQuickViewOpenClick: PropTypes.func.isRequired,
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
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
};

export default ModuleG;
export { ModuleG as ModuleGVanilla };
