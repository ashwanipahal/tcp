import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles, { customHeaderStyle } from '../styles/QuickViewModal.style';
import FulfillmentSection from '../../FulfillmentSection';
import { getLocator } from '../../../../../utils';
import Modal from '../../../molecules/Modal';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductCustomizeFormPart from '../molecules/ProductCustomizeFormPart';

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
      selectedColorProductId,
      currencyExchange,
      ...otherProps
    } = this.props;

    const modifiedColorFitsSizesMap = selectedColorProductId
      ? colorFitsSizesMap.filter(item => item.colorDisplayId === selectedColorProductId)
      : colorFitsSizesMap;
    const { fromBagPage } = otherProps;

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.onCloseClick}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        dataLocator={getLocator('quick_view_modal')}
        dataLocatorHeader={getLocator('quick_view_add_to_bag_header')}
        closeIconDataLocator={getLocator('quick_view_icon_btn')}
        heading={fromBagPage ? quickViewLabels.editItem : quickViewLabels.addToBag}
        widthConfig={{ small: '375px', medium: '600px', large: '704px' }}
        heightConfig={{ height: '95%' }}
        fixedWidth
        inheritedStyles={customHeaderStyle}
        headingAlign="center"
        horizontalBar={false}
        stickyCloseIcon
        fullWidth
        stickyHeader
      >
        <ProductCustomizeFormPart
          productInfo={productInfo}
          colorFitsSizesMap={
            modifiedColorFitsSizesMap.length ? modifiedColorFitsSizesMap : colorFitsSizesMap
          }
          colorFitSizeDisplayNames={colorFitSizeDisplayNames}
          quickViewLabels={quickViewLabels}
          onCloseClick={this.onCloseClick}
          currencyExchange={currencyExchange}
          {...otherProps}
        />
        {!fromBagPage && (
          <FulfillmentSection
            btnClassName="added-to-bag"
            dataLocator={getLocator('global_addtocart_Button')}
            buttonLabel="Pickup In Store"
            currentProduct={productInfo}
            closeQuickViewClick={this.onCloseClick}
          />
        )}
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
  selectedColorProductId: PropTypes.string.isRequired,
  currencyExchange: PropTypes.string,
};

QuickViewModal.defaultProps = {
  currencyExchange: 1,
};
export default withStyles(QuickViewModal, styles);
export { QuickViewModal as QuickViewModalVanilla };
