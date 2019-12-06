import React from 'react';
import { LAZYLOAD_HOST_NAME, scrollToViewBottom, getAPIConfig } from '@tcp/core/src/utils';
import { ScrollView as LazyloadScrollView, View } from 'react-native';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import { PRODUCT_ADD_TO_BAG } from '@tcp/core/src/constants/reducer.constants';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid/index.native';
import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import {
  PageContainer,
  LoyaltyBannerView,
  RecommendationWrapper,
  PromoMiddleContainer,
  PromoBottomContainer,
  Margin,
} from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductSummary from '../molecules/ProductSummary';
import ProductPickupContainer from '../../../../common/organisms/ProductPickup';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getMapSliceForColor,
  getMapSliceForSizeSkuID,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { SIZE_CHART_LINK_POSITIONS } from '../../../../common/molecules/ProductAddToBag/views/ProductAddToBag.view.native';
import { FullScreenImageCarousel } from '../../../../common/molecules/index.native';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import ProductDetailDescription from '../molecules/ProductDescription/views/ProductDescription.view.native';
import RelatedOutfits from '../molecules/RelatedOutfits/views';
import SendAnEmailGiftCard from '../molecules/SendAnEmailGiftCard';
import LoyaltyBanner from '../../../CnC/LoyaltyBanner';
import Recommendations from '../../../../../../../mobileapp/src/components/common/molecules/Recommendations';
import ProductReviewsContainer from '../../ProductListing/molecules/ProductReviews/container/ProductReviews.container';
import PromoPDPBanners from '../../../../common/organisms/PromoPDPBanners';
import ProductDetailViewPropTypes from '../ProductDetailPropTypes';

class ProductDetailView extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      currentProduct: { colorFitsSizesMap },
      currentProduct,
      selectedColorProductId,
    } = this.props;
    this.state = {
      showCarousel: false,
      currentColorEntry: getMapSliceForColorProductId(colorFitsSizesMap, selectedColorProductId),
      currentGiftCardValue: currentProduct.offerPrice,
      selectedColorProductId,
      showCompleteTheLook: false,
      size: '',
      expanded: true,
    };
    this.currentScrollValue = 0;
    this.scrollPageToTarget = this.scrollPageToTarget.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { currentProduct } = props;

    const { currentColorEntry, selectedColorProductId } = state;

    const colorDetails = getMapSliceForColorProductId(
      currentProduct.colorFitsSizesMap,
      selectedColorProductId
    );

    if (
      colorDetails.favoritedCount !== currentColorEntry.favoritedCount &&
      colorDetails.color.name === currentColorEntry.color.name
    ) {
      return {
        currentColorEntry: colorDetails,
      };
    }

    return null;
  }

  componentWillUnmount = () => {
    const { clearAddToBagError } = this.props;
    clearAddToBagError();
  };

  onChangeColor = e => {
    const {
      currentProduct: { colorFitsSizesMap },
    } = this.props;
    const currentColorEntry = getMapSliceForColor(colorFitsSizesMap, e);
    this.setState({ currentColorEntry, selectedColorProductId: currentColorEntry.colorDisplayId });
  };

  onChangeSize = (color, e) => {
    this.setState({ currentGiftCardValue: e, size: e });
  };

  onImageClick = () => {
    const { showCarousel } = this.state;
    this.setState({ showCarousel: !showCarousel });
  };

  renderCarousel = imageUrls => {
    const { showCarousel } = this.state;
    if (!showCarousel) return null;

    return <FullScreenImageCarousel imageUrls={imageUrls} />;
  };

  renderFulfilmentSection = keepAlive => {
    const { currentProduct, outOfStockLabels } = this.props;
    const { currentColorEntry } = this.state;
    return (
      currentProduct &&
      currentColorEntry && (
        <ProductPickupContainer
          productInfo={currentProduct}
          formName={`ProductAddToBag-${currentProduct.generalProductId}`}
          miscInfo={currentColorEntry.miscInfo}
          keepAlive={keepAlive}
          outOfStockLabels={outOfStockLabels}
        />
      )
    );
  };

  renderMiddlePromoBanner = promoBanners => {
    const { navigation } = this.props;
    return (
      promoBanners &&
      promoBanners.length > 0 && (
        <PromoMiddleContainer>
          <PromoPDPBanners promos={promoBanners} navigation={navigation} />
        </PromoMiddleContainer>
      )
    );
  };

  renderBottomPromoBanner = promoBanners => {
    const { navigation } = this.props;
    return (
      promoBanners &&
      promoBanners.length && (
        <PromoBottomContainer>
          <PromoPDPBanners promos={promoBanners} navigation={navigation} />
        </PromoBottomContainer>
      )
    );
  };

  setShowCompleteTheLook = value => {
    if (value) {
      this.setState({ showCompleteTheLook: value });
    }
  };

  scrollToAccordionBottom = (x, y, width, height, pageX, pageY) => {
    scrollToViewBottom({
      width,
      height,
      pageX,
      pageY,
      callBack: this.scrollRef,
      currentScrollValue: this.currentScrollValue,
    });
  };

  handleScroll = event => {
    this.currentScrollValue = event.nativeEvent.contentOffset.y;
  };

  scrollPageToTarget = () => {
    this.ratingViewRef.measure((fx, fy, width, height, px, py) => {
      this.scrollRef.scrollTo({ y: py, animated: true });
    });
  };

  shouldRenderRatingReview = (isGiftCard, isBundleProduct, bazaarVoice) => {
    return !isGiftCard && !isBundleProduct && bazaarVoice;
  };

  renderProductReview = ({ renderRatingReview, productId, bazaarVoice, expanded }) => {
    return renderRatingReview ? (
      <View
        ref={view => {
          this.ratingViewRef = view;
        }}
        collapsable={false}
      >
        <ProductReviewsContainer
          reviewsCount={bazaarVoice.totalReviewCount}
          ratingsProductId={productId}
          expanded={expanded}
        />
      </View>
    ) : null;
  };

  render() {
    const {
      currentProduct,
      currentProduct: { colorFitsSizesMap },
      currentProduct: { bazaarVoice },
      plpLabels,
      handleFormSubmit,
      navigation,
      addToBagError,
      isPickupModalOpen,
      handleSubmit,
      shortDescription,
      itemPartNumber,
      longDescription,
      pdpLabels,
      currency,
      currencyExchange,
      onAddItemToFavorites,
      isLoggedIn,
      alternateSizes,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      toastMessage,
      isKeepAliveEnabled,
      outOfStockLabels,
      middlePromos,
      bottomPromos,
    } = this.props;
    const {
      currentColorEntry,
      currentGiftCardValue,
      selectedColorProductId,
      showCompleteTheLook,
      size,
      expanded,
    } = this.state;
    let imageUrls = [];
    let skuId = null;

    if (colorFitsSizesMap) {
      imageUrls = getImagesToDisplay({
        imagesByColor: currentProduct.imagesByColor,
        curentColorEntry: currentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });
    }
    const sizeChartLinkVisibility = !currentProduct.isGiftCard
      ? SIZE_CHART_LINK_POSITIONS.AFTER_SIZE
      : null;
    const recommendationAttributes = {
      variation: 'moduleO',
      navigation,
      page: Constants.RECOMMENDATIONS_PAGES_MAPPING.PDP,
      partNumber: itemPartNumber,
      isHeaderAccordion: true,
    };
    const keepAlive = isKeepAliveEnabled && currentColorEntry.miscInfo.keepAlive;

    if (size) {
      skuId = getMapSliceForSizeSkuID(currentColorEntry, size);
    }

    const renderRatingReview = this.shouldRenderRatingReview(
      currentProduct.isGiftCard,
      false,
      bazaarVoice
    );
    const candidConfig = getAPIConfig();
    return (
      <LazyloadScrollView
        onScroll={this.handleScroll}
        name={LAZYLOAD_HOST_NAME.PDP}
        ref={ref => {
          this.scrollRef = ref;
        }}
      >
        <PageContainer>
          <Margin>
            <ImageCarousel
              isGiftCard={currentProduct.isGiftCard}
              imageUrls={imageUrls}
              onAddItemToFavorites={onAddItemToFavorites}
              isLoggedIn={isLoggedIn}
              currentProduct={currentProduct}
              onImageClick={this.onImageClick}
              AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
              removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
              currentColorEntry={currentColorEntry}
              keepAlive={keepAlive}
              outOfStockLabels={outOfStockLabels}
              skuId={skuId}
              formName={PRODUCT_ADD_TO_BAG}
            />

            <ProductSummary
              productData={currentProduct}
              selectedColorProductId={selectedColorProductId}
              offerPrice={
                currentProduct.isGiftCard
                  ? parseInt(currentGiftCardValue, 10)
                  : currentProduct.offerPrice
              }
              listPrice={
                currentProduct.isGiftCard
                  ? parseInt(currentGiftCardValue, 10)
                  : currentProduct.listPrice
              }
              currencySymbol={currency}
              currencyExchange={currencyExchange}
              isGiftCard={currentProduct.isGiftCard}
              showCompleteTheLook={showCompleteTheLook}
              pdpLabels={pdpLabels}
              keepAlive={keepAlive}
              outOfStockLabels={outOfStockLabels}
              scrollToTarget={this.scrollPageToTarget}
              renderRatingReview
            />
          </Margin>
          {this.renderMiddlePromoBanner(middlePromos)}
          <Margin>
            <ProductAddToBagContainer
              currentProduct={currentProduct}
              plpLabels={plpLabels}
              handleFormSubmit={handleFormSubmit}
              selectedColorProductId={selectedColorProductId}
              errorOnHandleSubmit={addToBagError}
              onChangeColor={this.onChangeColor}
              handleSubmit={handleSubmit}
              onChangeSize={this.onChangeSize}
              sizeChartLinkVisibility={sizeChartLinkVisibility}
              alternateSizes={alternateSizes}
              navigation={navigation}
              toastMessage={toastMessage}
              isKeepAliveEnabled={isKeepAliveEnabled}
              outOfStockLabels={outOfStockLabels}
            />
            {currentProduct.isGiftCard ? <SendAnEmailGiftCard pdpLabels={pdpLabels} /> : null}
            {this.renderFulfilmentSection(keepAlive)}
            {this.renderCarousel(imageUrls)}
            <LoyaltyBannerView>
              <LoyaltyBanner pageCategory="isProductDetailView" navigation={navigation} />
            </LoyaltyBannerView>
          </Margin>
          {this.renderBottomPromoBanner(bottomPromos)}
          <Margin>
            <ProductDetailDescription
              shortDescription={shortDescription}
              itemPartNumber={itemPartNumber}
              longDescription={longDescription}
              isShowMore={false}
              pdpLabels={pdpLabels}
              scrollToAccordionBottom={this.scrollToAccordionBottom}
            />
            {!currentProduct.isGiftCard ? (
              <View
                ref={view => {
                  this.relatedOutfitRef = view;
                }}
              >
                <RelatedOutfits
                  pdpLabels={pdpLabels}
                  navigation={navigation}
                  selectedColorProductId={selectedColorProductId}
                  setShowCompleteTheLook={this.setShowCompleteTheLook}
                />
              </View>
            ) : null}
            <RecommendationWrapper>
              <Recommendations {...recommendationAttributes} />
              <Recommendations
                isRecentlyViewed
                {...recommendationAttributes}
                headerLabel={pdpLabels.recentlyViewed}
                portalValue={Constants.RECOMMENDATIONS_MBOXNAMES.RECENTLY_VIEWED}
              />
            </RecommendationWrapper>
            <GetCandid apiConfig={candidConfig} navigation={navigation} isPlpStack />
            {this.renderProductReview({
              renderRatingReview,
              productId: currentProduct.ratingsProductId,
              bazaarVoice,
              expanded,
            })}
            {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
          </Margin>
        </PageContainer>
      </LazyloadScrollView>
    );
  }
}

ProductDetailView.propTypes = ProductDetailViewPropTypes;

ProductDetailView.defaultProps = {
  currentProduct: {
    colorFitsSizesMap: {},
    offerPrice: '',
    listPrice: '',
    generalProductId: '',
    imagesByColor: {},
    isGiftCard: false,
  },
  navigation: {},
  plpLabels: null,
  handleSubmit: null,
  isPickupModalOpen: false,
  handleFormSubmit: null,
  addToBagError: '',
  shortDescription: '',
  itemPartNumber: '',
  longDescription: '',
  pdpLabels: {},
  currency: 'USD',
  currencyExchange: 1,
  onAddItemToFavorites: null,
  isLoggedIn: false,
  alternateSizes: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  toastMessage: () => {},
  isKeepAliveEnabled: false,
  outOfStockLabels: {},
  bottomPromos: '',
  middlePromos: '',
};

export default withStyles(ProductDetailView);

export { ProductDetailView as ProductDetailViewVanilla };
