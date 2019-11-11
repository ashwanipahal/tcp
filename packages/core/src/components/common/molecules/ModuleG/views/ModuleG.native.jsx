import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { Button, Anchor, DamImage, Skeleton } from '../../../atoms';
import { getLocator } from '../../../../../utils/index.native';
import { Carousel } from '../..';
import QuickViewModal from '../../../organisms/QuickViewModal/container/QuickViewModal.container';
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
const MODULE_HEIGHT = 256;
const MODULE_WIDTH = PRODUCT_IMAGE_WIDTH * 2;
const TOTAL_IMAGES = 15;
const { width: screenWidth } = Dimensions.get('window');
const LOOP_CLONES_PER_SIDE = 7;
const INACTIVE_SLIDE_SCALE = 1;
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
      currentIndexFirstCarousel: 0,
      currentIndexSecondCarousel: 0,
    };
    this.updateFirstCurrentIndex = this.updateFirstCurrentIndex.bind(this);
    this.updateSecondCurrentIndex = this.updateSecondCurrentIndex.bind(this);
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
    const { currentIndexFirstCarousel, currentIndexSecondCarousel } = this.state;
    const data = this.getImagesData();
    if (data && data.length === 2)
      onQuickViewOpenClick([
        {
          colorProductId:
            data[0][currentIndexFirstCarousel] && data[0][currentIndexFirstCarousel].prodpartno,
        },
        {
          colorProductId:
            data[1][currentIndexSecondCarousel] && data[1][currentIndexSecondCarousel].prodpartno,
        },
      ]);
  };

  /**
   * @param {object} props : Props for renderCarouselSlide accept slideProps & parallaxProps and render the image sliding view.
   */
  renderCarouselSlide = item => {
    const { item: itemValue } = item;
    const { navigation } = this.props;
    const { imageUrl, productItemIndex, product_name: productName, uniqueId } = itemValue;
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

  renderFirstCarousel = firstCarouseProductList => {
    return firstCarouseProductList && firstCarouseProductList.length > 0 ? (
      <ImageSlidesWrapper>
        <View>
          <Carousel
            data={firstCarouseProductList}
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
            onSnapToItem={this.updateFirstCurrentIndex}
          />
        </View>
      </ImageSlidesWrapper>
    ) : null;
  };

  renderSecondCarousel = secondCarouseProductList => {
    return secondCarouseProductList && secondCarouseProductList.length ? (
      <ImageSlidesWrapper>
        <View>
          <Carousel
            data={secondCarouseProductList}
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
            onSnapToItem={this.updateSecondCurrentIndex}
          />
        </View>
      </ImageSlidesWrapper>
    ) : null;
  };

  renderShadowContainer = showShadowContainer => {
    return showShadowContainer ? (
      <ShadowContainer>
        <SHADOW />
      </ShadowContainer>
    ) : null;
  };

  renderMiddleContainer = (showShadowContainer, showPlusButton) => {
    return showShadowContainer ? (
      <MiddleContainer>
        <Border />
        <Circle />
        {showPlusButton ? <StyledCustomImage source={plusIcon} /> : null}
      </MiddleContainer>
    ) : null;
  };

  renderSkeleton = dataStatus => {
    return dataStatus ? (
      <Skeleton
        row={1}
        col={3}
        width={200}
        height={200}
        rowProps={{ justifyContent: 'center', marginTop: '20px' }}
        showArrows
      />
    ) : null;
  };

  renderbuttonContainer = (productExists, selectedSingleCTAButton) => {
    const { navigation } = this.props;
    return productExists && Object.keys(selectedSingleCTAButton).length ? (
      <ButtonContainer>
        <Button
          width="225px"
          text={selectedSingleCTAButton.text}
          onPress={this.onAddToBagClick}
          navigation={navigation}
          testID={getLocator('moduleG_cta_btn')}
        />
        <StyledAnchor
          anchorVariation="primary"
          text={selectedSingleCTAButton.title}
          fontSizeVariation="xlarge"
          url={selectedSingleCTAButton.url}
          navigation={navigation}
          visible
        />
      </ButtonContainer>
    ) : null;
  };

  updateFirstCurrentIndex = index => {
    this.setState({ currentIndexFirstCarousel: index });
  };

  updateSecondCurrentIndex = index => {
    this.setState({ currentIndexSecondCarousel: index });
  };

  /**
   * @param {object} props : Props for renderView multi type of banner list, button list, header text.
   * @desc This is Method return the complete View with CTA Button .
   */
  renderView = (selectedProductList, selectedSingleCTAButton) => {
    const { navigation, headerText, promoBanner, divTabs, productTabList = {} } = this.props;
    const firstCarouseProductList = selectedProductList[0] || [];
    const secondCarouseProductList = selectedProductList[1] || [];
    const { selectedCategoryId } = this.state;
    const dataStatus =
      this.getDataStatus(selectedCategoryId[0]) || this.getDataStatus(selectedCategoryId[1]);
    let showPlusButton = false;
    const productTabsCompletionInfo = Object.assign({}, productTabList);
    // eslint-disable-next-line
    if (productTabsCompletionInfo && productTabsCompletionInfo.hasOwnProperty('completed')) {
      selectedCategoryId.forEach(id => {
        // eslint-disable-next-line
        if (productTabsCompletionInfo.completed.hasOwnProperty(id)) {
          showPlusButton = true;
        } else {
          showPlusButton = false;
        }
      });
    }
    let productExists = false;
    if (selectedCategoryId.length) {
      selectedCategoryId.forEach(id => {
        if (!productExists) {
          productExists =
            Object.keys(productTabList).length > 2 &&
            productTabList[id] &&
            productTabList[id].length > 0;
        }
      });
    }
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
        {this.renderShadowContainer(!dataStatus)}
        <View>
          {this.renderSkeleton(dataStatus)}
          {this.renderFirstCarousel(firstCarouseProductList)}
          {this.renderMiddleContainer(!dataStatus, showPlusButton)}
          {this.renderSkeleton(dataStatus)}
          {this.renderSecondCarousel(secondCarouseProductList)}
        </View>
        {this.renderbuttonContainer(productExists, selectedSingleCTAButton)}
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
    const selectedProdLists = [];
    selectedCategoryId.forEach((catId, index) => {
      const productList = productTabList[selectedCategoryId[index]] || [];
      selectedProdLists.push(productList.slice(0, TOTAL_IMAGES));
    });
    let selectedSingleCTAButton;
    const processedDivTabs = Object.assign([], divTabs);
    const tabs = {};
    processedDivTabs.forEach((tab, index) => {
      const tabList = tab.category.map(cat => cat.val);
      tabs[index] = tabList;
    });
    divTabs.forEach((tab, index) => {
      if (JSON.stringify(tabs[index]) === JSON.stringify(selectedCategoryId)) {
        selectedSingleCTAButton = tab.singleCTAButton;
      }
    });
    return this.renderView(selectedProdLists, selectedSingleCTAButton);
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
