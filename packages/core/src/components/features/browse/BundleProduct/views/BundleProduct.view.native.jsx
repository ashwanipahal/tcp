import React from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { getLoading } from '@tcp/core/src/utils';
import ImageCarousel from '@tcp/core/src/components/features/browse/ProductDetail/molecules/ImageCarousel';
import ProductSummary from '@tcp/core/src/components/features/browse/ProductDetail/molecules/ProductSummary';
import ProductDetailDescription from '@tcp/core/src/components/features/browse/ProductDetail/molecules/ProductDescription/views/ProductDescription.view.native';
import withStyles from '../../../../common/hoc/withStyles.native';
import PageContainer from '../styles/BundleProduct.style.native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import BundleProductItems from '../molecules/BundleProductItems';

class ProductBundle extends React.PureComponent {
  currentColorEntry;

  constructor(props) {
    super(props);
    this.state = {
      showCarousel: false,
    };
  }

  onImageClick = () => {
    const { showCarousel } = this.state;
    this.setState({ showCarousel: !showCarousel });
  };

  render() {
    const {
      currentProduct,
      currentBundle,
      selectedColorProductId,
      pdpLabels,
      shortDescription,
      itemPartNumber,
      longDescription,
      plpLabels,
      navigation,
      handleAddToBag,
      addToFavorites,
      addToBagEcom,
      currentState,
      isLoggedIn,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      addToBagErrorId,
      addToBagError,
    } = this.props;
    if (currentProduct && JSON.stringify(currentProduct) !== '{}') {
      const { colorFitsSizesMap } = currentProduct;
      this.currentColorEntry = getMapSliceForColorProductId(
        colorFitsSizesMap,
        selectedColorProductId
      );
      let imageUrls = [];
      if (colorFitsSizesMap) {
        imageUrls = getImagesToDisplay({
          imagesByColor: currentProduct.imagesByColor,
          curentColorEntry: this.currentColorEntry,
          isAbTestActive: false,
          isFullSet: true,
        });
      }
      return (
        <ScrollView>
          <PageContainer>
            <ImageCarousel
              isGiftCard={currentProduct.isGiftCard}
              imageUrls={imageUrls}
              addToFavorites={addToFavorites}
              isLoggedIn={isLoggedIn}
              currentProduct={currentProduct}
              onImageClick={this.onImageClick}
              AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
              removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
              currentColorEntry={this.currentColorEntry}
              isBundleProduct
            />
            <ProductSummary
              productData={currentProduct}
              selectedColorProductId={selectedColorProductId}
              pdpLabels={pdpLabels}
              isBundleProduct
            />
            <ProductDetailDescription
              margins="16px 0 0 0"
              shortDescription={shortDescription}
              itemPartNumber={itemPartNumber}
              longDescription={longDescription}
              isShowMore={false}
              pdpLabels={pdpLabels}
            />
            <BundleProductItems
              currentBundle={currentBundle}
              plpLabels={plpLabels}
              navigation={navigation}
              handleAddToBag={handleAddToBag}
              addToFavorites={addToFavorites}
              addToBagEcom={addToBagEcom}
              currentState={currentState}
              isLoggedIn={isLoggedIn}
              addToBagErrorId={addToBagErrorId}
              addToBagError={addToBagError}
            />
          </PageContainer>
        </ScrollView>
      );
    }
    return getLoading();
  }
}

ProductBundle.propTypes = {
  currentProduct: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  plpLabels: PropTypes.shape({}),
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  currentBundle: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool,
  AddToFavoriteErrorMsg: PropTypes.string.isRequired,
  removeAddToFavoritesErrorMsg: PropTypes.func.isRequired,
  addToBagErrorId: PropTypes.string,
  addToBagError: PropTypes.string,
};

ProductBundle.defaultProps = {
  navigation: {},
  plpLabels: null,
  shortDescription: '',
  itemPartNumber: '',
  longDescription: '',
  pdpLabels: {},
  isLoggedIn: false,
  addToBagErrorId: '',
  addToBagError: '',
};

export default withStyles(ProductBundle);

export { ProductBundle as ProductBundleVanilla };
