import React from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import get from 'lodash/get';

import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import PageContainer from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductSummary from '../molecules/ProductSummary';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { FullScreenImageCarousel } from '../../../../common/molecules/index.native';

class ProductDetailView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showCarousel: false };
  }

  onImageClick = () => {
    const { showCarousel } = this.state;
    this.setState({ showCarousel: !showCarousel });
  };

  renderCarousel = () => {
    const { showCarousel } = this.state;
    if (!showCarousel) return null;

    const { currentProduct, selectedColorProductId } = this.props;
    const imagesByColor = get(currentProduct, 'imagesByColor', null);
    const colorFitsSizesMap = get(currentProduct, 'colorFitsSizesMap', null);
    let curentColorEntry;
    let imageUrls;
    if (colorFitsSizesMap) {
      curentColorEntry = getMapSliceForColorProductId(colorFitsSizesMap, selectedColorProductId);
      imageUrls = getImagesToDisplay({
        imagesByColor,
        curentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });
    }

    return <FullScreenImageCarousel imageUrls={imageUrls} />;
  };

  render() {
    const { currentProduct, selectedColorProductId, plpLabels, handleSubmit } = this.props;
    const isDataAvailable = JSON.stringify(currentProduct) !== '{}';

    return (
      <ScrollView>
        <PageContainer>
          <ImageCarousel
            item={currentProduct}
            selectedColorProductId={selectedColorProductId}
            onImageClick={this.onImageClick}
          />
          <ProductSummary
            productData={currentProduct}
            selectedColorProductId={selectedColorProductId}
          />
          {isDataAvailable && (
            <ProductAddToBagContainer
              currentProduct={currentProduct}
              plpLabels={plpLabels}
              handleSubmit={handleSubmit}
              selectedColorProductId={selectedColorProductId}
            />
          )}
          {this.renderCarousel()}
        </PageContainer>
      </ScrollView>
    );
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  plpLabels: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
};

ProductDetailView.defaultProps = {
  currentProduct: {},
  plpLabels: null,
  handleSubmit: null,
};

export default withStyles(ProductDetailView);

export { ProductDetailView as ProductDetailViewVanilla };
