import React from 'react';
import { PropTypes } from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';
// import { LazyloadScrollView } from 'react-native-lazyload-deux';
import { ScrollView as LazyloadScrollView } from 'react-native';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
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

import PromoPDPBanners from '../../../../common/organisms/PromoPDPBanners';

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
    };
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

  onChangeSize = (color, e, fit, quantity) => {
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

  render() {
    const {
      currentProduct,
      currentProduct: { colorFitsSizesMap },
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

    return (
      <LazyloadScrollView name={LAZYLOAD_HOST_NAME.PDP}>
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
            />
            {!currentProduct.isGiftCard ? (
              <RelatedOutfits
                pdpLabels={pdpLabels}
                navigation={navigation}
                selectedColorProductId={selectedColorProductId}
                setShowCompleteTheLook={this.setShowCompleteTheLook}
              />
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
            {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
          </Margin>
        </PageContainer>
      </LazyloadScrollView>
    );
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({
    colorFitsSizesMap: PropTypes.shape({}),
    offerPrice: PropTypes.string,
    listPrice: PropTypes.string,
    generalProductId: PropTypes.string,
    imagesByColor: PropTypes.shape({}),
    isGiftCard: PropTypes.bool,
  }),
  navigation: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  clearAddToBagError: PropTypes.func.isRequired,
  plpLabels: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  isPickupModalOpen: PropTypes.bool,
  handleFormSubmit: PropTypes.func,
  addToBagError: PropTypes.string,
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  currency: PropTypes.string,
  currencyExchange: PropTypes.number,
  onAddItemToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  alternateSizes: PropTypes.shape({
    key: PropTypes.string,
  }),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  toastMessage: PropTypes.func,
  isKeepAliveEnabled: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({}),
};

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
};

export default withStyles(ProductDetailView);

export { ProductDetailView as ProductDetailViewVanilla };
