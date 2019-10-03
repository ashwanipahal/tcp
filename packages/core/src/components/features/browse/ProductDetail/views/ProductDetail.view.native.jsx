import React from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
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

class ProductDetailView extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      currentProduct: { colorFitsSizesMap },
      selectedColorProductId,
    } = this.props;
    this.state = {
      showCarousel: false,
      currentColorEntry: getMapSliceForColorProductId(colorFitsSizesMap, selectedColorProductId),
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
    this.setState({ currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e) });
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
      selectedColorProductId,
      plpLabels,
      handleFormSubmit,
      navigation,
      addToBagError,
      isPickupModalOpen,
      handleSubmit,
    } = this.props;
    const { currentColorEntry } = this.state;
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
      <ScrollView>
        <PageContainer>
          <ImageCarousel imageUrls={imageUrls} onImageClick={this.onImageClick} />
          <ProductSummary
            productData={currentProduct}
            selectedColorProductId={selectedColorProductId}
          />

          <ProductAddToBagContainer
            currentProduct={currentProduct}
            plpLabels={plpLabels}
            handleFormSubmit={handleFormSubmit}
            selectedColorProductId={selectedColorProductId}
            errorOnHandleSubmit={addToBagError}
            onChangeColor={this.onChangeColor}
            handleSubmit={handleSubmit}
          />

          {this.renderCarousel(imageUrls)}
          <AddedToBagContainer navigation={navigation} />
          {this.renderFulfilmentSection()}
          {isPickupModalOpen ? <PickupStoreModal /> : null}
        </PageContainer>
      </ScrollView>
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
};

ProductDetailView.defaultProps = {
  currentProduct: {},
  navigation: {},
  plpLabels: null,
  handleSubmit: null,
  isPickupModalOpen: false,
  handleFormSubmit: null,
  addToBagError: '',
};

export default withStyles(ProductDetailView);

export { ProductDetailView as ProductDetailViewVanilla };
