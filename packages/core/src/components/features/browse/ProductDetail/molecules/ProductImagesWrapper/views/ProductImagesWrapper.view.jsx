import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { breakpoints } from '../../../../../../../../styles/themes/TCP/mediaQuery';
import ProductImages from '../../../../../../common/organisms/ProductImages';
import FullSizeImageWithQuickViewModal from '../../FullSizeImageWithQuickViewModal/views/FullSizeImageWithQuickViewModal.view';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';

class ProductImageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFullSizeModalOpen: false };
    this.handleShowHideFullSizeModalClick = this.handleShowHideFullSizeModalClick.bind(this);
  }

  colorChange = e => {
    // const { selectedSize } = this.state;
    const { onChangeColor } = this.props;
    if (onChangeColor) {
      onChangeColor(e);
    }
  };

  handleShowHideFullSizeModalClick(e) {
    e.preventDefault();
    const { isFullSizeModalOpen } = this.state;
    this.setState({ isFullSizeModalOpen: !isFullSizeModalOpen });
  }

  render() {
    const {
      productName,
      images,
      isZoomEnabled,
      isThumbnailListVisible,
      pdpLabels,
      currentProduct,
      currentColorEntry,
      isGiftCard,
    } = this.props;
    const { isFullSizeModalOpen } = this.state;
    const { colorFitsSizesMap } = currentProduct;
    const colorChipSelector = {
      colorList: colorFitsSizesMap,
      selectColor: this.colorChange,
    };
    const initialValuesForm = {
      colorSwatchModal: {
        name: currentColorEntry && currentColorEntry.color && currentColorEntry.color.name,
      },
    };

    const isMobile =
      ExecutionEnvironment.canUseDOM && document.body.offsetWidth < breakpoints.values.sm;
    return (
      <React.Fragment>
        {images.length > 0 ? (
          <ProductImages
            productName={productName}
            isThumbnailListVisible={isThumbnailListVisible && !isGiftCard}
            isGiftCard={isGiftCard}
            images={images}
            isMobile={isMobile}
            isZoomEnabled={isZoomEnabled}
            onCloseClick={this.handleShowHideFullSizeModalClick}
            isFullSizeModalOpen={isFullSizeModalOpen}
            pdpLabels={pdpLabels}
          />
        ) : null}
        {isFullSizeModalOpen &&
          (isMobile ? null : (
            <FullSizeImageWithQuickViewModal
              onCloseClick={this.handleShowHideFullSizeModalClick}
              images={images}
              isMobile={isMobile}
              name={productName}
              isThumbnailListVisible
              isFullSizeModalOpen={isFullSizeModalOpen}
              colorChipSelector={colorChipSelector}
              initialValues={initialValuesForm}
            />
          ))}
      </React.Fragment>
    );
  }
}

ProductImageWrapper.defaultProps = {
  onChangeColor: () => {},
  currentProduct: {},
  currentColorEntry: {},
};

ProductImageWrapper.propTypes = {
  /** Product's Name (global product, not by color, size, fit or some clasification) */
  productName: PropTypes.string.isRequired,

  /** list of images of the product */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      iconSizeImageUrl: PropTypes.string.isRequired,
      regularSizeImageUrl: PropTypes.string.isRequired,
      bigSizeImageUrl: PropTypes.string.isRequired,
      superSizeImageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  pdpLabels: PropTypes.shape({
    fullSize: PropTypes.string.isRequired,
  }).isRequired,

  /**
   * Flags if we should show big size images, instead of regular size
   * images (default behavior)
   */

  /** Flags if the zoom should be enabled */
  isZoomEnabled: PropTypes.bool.isRequired,
  isThumbnailListVisible: PropTypes.bool.isRequired,
  onChangeColor: PropTypes.func,
  currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE,
  currentColorEntry: PropTypes.shape({}),
  isGiftCard: PropTypes.bool.isRequired,
};

export default ProductImageWrapper;
