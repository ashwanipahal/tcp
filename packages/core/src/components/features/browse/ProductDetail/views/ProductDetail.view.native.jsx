import React from 'react';
import { PropTypes } from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';
import { LazyloadScrollView } from 'react-native-lazyload-deux';
import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import PageContainer from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductSummary from '../molecules/ProductSummary';
import FulfillmentSection from '../../../../common/organisms/FulfillmentSection';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getMapSliceForColor,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { FullScreenImageCarousel } from '../../../../common/molecules/index.native';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import ProductDetailDescription from '../molecules/ProductDescription/views/ProductDescription.view.native';
import RelatedOutfits from '../molecules/RelatedOutfits/views';
import SendAnEmailGiftCard from '../molecules/SendAnEmailGiftCard';

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
    };
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
    return (
      <FulfillmentSection
        btnClassName="added-to-bag"
        buttonLabel="Add To Bag"
        currentProduct={currentProduct}
      />
    );
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
    } = this.props;
    const { currentColorEntry, currentGiftCardValue, selectedColorProductId } = this.state;
    let imageUrls = [];
    if (colorFitsSizesMap) {
      imageUrls = getImagesToDisplay({
        imagesByColor: currentProduct.imagesByColor,
        curentColorEntry: currentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });
    }

    return (
      <LazyloadScrollView name={LAZYLOAD_HOST_NAME.PDP}>
        <PageContainer>
          <ImageCarousel
            isGiftCard={currentProduct.isGiftCard}
            imageUrls={imageUrls}
            onImageClick={this.onImageClick}
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
          />
          {currentProduct.isGiftCard ? <SendAnEmailGiftCard pdpLabels={pdpLabels} /> : null}
          {this.renderFulfilmentSection()}
          {this.renderCarousel(imageUrls)}
          <AddedToBagContainer navigation={navigation} />
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
            />
          ) : null}
          {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
        </PageContainer>
      </LazyloadScrollView>
    );
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({}),
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
};

ProductDetailView.defaultProps = {
  currentProduct: {},
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
};

export default withStyles(ProductDetailView);

export { ProductDetailView as ProductDetailViewVanilla };
