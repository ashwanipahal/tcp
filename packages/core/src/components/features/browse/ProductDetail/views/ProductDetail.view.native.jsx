import React from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import ModalNative from '../../../../common/molecules/Modal';

import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import PageContainer, { ModalCarousel } from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductSummary from '../molecules/ProductSummary';
import { getScreenHeight } from '../../../../../utils/index.native';

import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
  getImagesToDisplay,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';

class ProductDetailView extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      currentProduct: { colorFitsSizesMap },
      selectedColorProductId,
    } = this.props;
    this.state = {
      zoomImage: false,
      currentColorEntry: getMapSliceForColorProductId(colorFitsSizesMap, selectedColorProductId),
    };
  }

  onChangeColor = e => {
    const {
      currentProduct: { colorFitsSizesMap },
    } = this.props;
    this.setState({ currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e) });
  };

  onImageClick = () => {
    this.toggleModal();
  };

  toggleModal = () => {
    const { zoomImage } = this.state;
    this.setState({ zoomImage: !zoomImage });
  };

  renderCarousel = imageUrls => {
    const { selectedColorProductId } = this.props;
    const { zoomImage } = this.state;
    const fullWidth = {
      width: '100%',
      alignItems: 'flex-end',
    };

    return (
      <ModalNative
        isOpen={zoomImage}
        onRequestClose={this.toggleModal}
        overlayClassName="TCPModal__Overlay"
        closeIconDataLocator=""
        closeIconLeftAligned={false}
        horizontalBar={false}
        headerStyle={fullWidth}
        isOverlay
      >
        <ModalCarousel height={getScreenHeight()}>
          <ImageCarousel
            imageUrls={imageUrls}
            selectedColorProductId={selectedColorProductId}
            showFavorites={false}
            allowZoom
          />
        </ModalCarousel>
      </ModalNative>
    );
  };

  render() {
    const {
      currentProduct,
      currentProduct: { colorFitsSizesMap },
      selectedColorProductId,
      plpLabels,
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
            handleSubmit={handleSubmit}
            selectedColorProductId={selectedColorProductId}
            onChangeColor={this.onChangeColor}
          />

          {this.renderCarousel(imageUrls)}
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
