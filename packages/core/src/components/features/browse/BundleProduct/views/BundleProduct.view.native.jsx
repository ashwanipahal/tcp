import React from 'react';
import { PropTypes } from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';
// import { LazyloadScrollView } from 'react-native-lazyload-deux';
import { ScrollView as LazyloadScrollView } from 'react-native';
import { LAZYLOAD_HOST_NAME, getLoading } from '@tcp/core/src/utils';
import ImageCarousel from '@tcp/core/src/components/features/browse/ProductDetail/molecules/ImageCarousel';
import ProductSummary from '@tcp/core/src/components/features/browse/ProductDetail/molecules/ProductSummary';
import ProductDetailDescription from '@tcp/core/src/components/features/browse/ProductDetail/molecules/ProductDescription/views/ProductDescription.view.native';
import withStyles from '../../../../common/hoc/withStyles.native';
import PageContainer from '../styles/BundleProduct.style.native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';

class ProductDetailView extends React.PureComponent {
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
      selectedColorProductId,
      pdpLabels,
      shortDescription,
      itemPartNumber,
      longDescription,
    } = this.props;
    if (JSON.stringify(currentProduct) !== '{}') {
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
        <LazyloadScrollView name={LAZYLOAD_HOST_NAME.PDP}>
          <PageContainer>
            <ImageCarousel imageUrls={imageUrls} onImageClick={this.onImageClick} isBundleProduct />
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
          </PageContainer>
        </LazyloadScrollView>
      );
    }
    return getLoading();
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  plpLabels: PropTypes.shape({}),
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
};

ProductDetailView.defaultProps = {
  currentProduct: {},
  navigation: {},
  plpLabels: null,
  shortDescription: '',
  itemPartNumber: '',
  longDescription: '',
  pdpLabels: {},
};

export default withStyles(ProductDetailView);
export { ProductDetailView as ProductDetailViewVanilla };
