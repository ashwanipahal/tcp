import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles, { customHeaderStyle } from '../styles/QuickViewModal.style';
import FulfillmentSection from '../../FulfillmentSection';
import { getLocator } from '../../../../../utils';
import Modal from '../../../molecules/Modal';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductCustomizeFormPart from '../molecules/ProductCustomizeFormPart/views/ProductCustomizeFormPart.view';

class QuickViewModal extends React.Component {
  componentWillUnmount = () => {
    const { clearAddToBagError } = this.props;
    clearAddToBagError();
  };

  onCloseClick = () => {
    const { closeQuickViewModal } = this.props;
    closeQuickViewModal();
  };

  render() {
    const {
      isModalOpen,
      productInfo,
      productInfo: { colorFitsSizesMap, colorFitSizeDisplayNames },
      quickViewLabels,
      ...otherProps
    } = this.props;
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.onCloseClick}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        // dataLocator={getLocator('pdp_full_size_image_modal')}
        //  closeIconDataLocator={getLocator('pdp_zoomed_image_closed_btn')}
        heading={quickViewLabels.addToBag}
        widthConfig={{ small: '375px', medium: '600px', large: '704px' }}
        heightConfig={{ height: '95%' }}
        fixedWidth
        inheritedStyles={customHeaderStyle}
      >
        <ProductCustomizeFormPart
          productInfo={productInfo}
          colorFitsSizesMap={colorFitsSizesMap}
          colorFitSizeDisplayNames={colorFitSizeDisplayNames}
          quickViewLabels={quickViewLabels}
          {...otherProps}
        />
        <div className="fulfillment-section">
          <FulfillmentSection
            btnClassName="added-to-bag"
            dataLocator={getLocator('global_addtocart_Button')}
            buttonLabel="Pickup In Store"
            onPickupOpenClick={this.handlePickupOpenClick}
            currentProduct={productInfo}
          />
        </div>
      </Modal>
    );
  }
}

QuickViewModal.propTypes = {
  quickViewLabels: PropTypes.shape({
    addToBag: PropTypes.string,
    viewProductDetails: PropTypes.string,
  }).isRequired,
  closeQuickViewModal: PropTypes.func.isRequired,
  clearAddToBagError: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
};

export default withStyles(QuickViewModal, styles);
export { QuickViewModal as QuickViewModalVanilla };
