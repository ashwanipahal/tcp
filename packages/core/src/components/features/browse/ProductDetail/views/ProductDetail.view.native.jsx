import React from 'react';
import { PropTypes } from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';
import { LazyloadScrollView } from 'react-native-lazyload-deux';
import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import { PageContainer, LoyaltyBannerView } from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductSummary from '../molecules/ProductSummary';
import ProductPickupContainer from '../../../../common/organisms/ProductPickup';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getMapSliceForColor,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { SIZE_CHART_LINK_POSITIONS } from '../../../../common/molecules/ProductAddToBag/views/ProductAddToBag.view.native';
import { FullScreenImageCarousel } from '../../../../common/molecules/index.native';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import ProductDetailDescription from '../molecules/ProductDescription/views/ProductDescription.view.native';
import RelatedOutfits from '../molecules/RelatedOutfits/views';
import SendAnEmailGiftCard from '../molecules/SendAnEmailGiftCard';
import LoyaltyBanner from '../../../CnC/LoyaltyBanner';

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

  onChangeSize = e => {
    this.setState({ currentGiftCardValue: e });
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

  renderFulfilmentSection = () => {
    const { currentProduct } = this.props;
    const { currentColorEntry } = this.state;
    return (
      currentProduct &&
      currentColorEntry && (
        <ProductPickupContainer
          productInfo={currentProduct}
          formName={`ProductAddToBag-${currentProduct.generalProductId}`}
          miscInfo={currentColorEntry.miscInfo}
        />
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
    } = this.props;
    const {
      currentColorEntry,
      currentGiftCardValue,
      selectedColorProductId,
      showCompleteTheLook,
    } = this.state;
    let imageUrls = [];
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

    return (
      <LazyloadScrollView name={LAZYLOAD_HOST_NAME.PDP}>
        <PageContainer>
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
          />

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
          />
          {currentProduct.isGiftCard ? <SendAnEmailGiftCard pdpLabels={pdpLabels} /> : null}
          {this.renderFulfilmentSection()}
          {this.renderCarousel(imageUrls)}
          <AddedToBagContainer navigation={navigation} />
          <LoyaltyBannerView>
            <LoyaltyBanner pageCategory="isProductDetailView" />
          </LoyaltyBannerView>
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
          {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
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
};

export default withStyles(ProductDetailView);

export { ProductDetailView as ProductDetailViewVanilla };
