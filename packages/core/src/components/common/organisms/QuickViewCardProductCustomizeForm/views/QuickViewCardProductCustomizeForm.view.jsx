import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles, { customHeaderStyle } from '../styles/QuickViewCardProductCustomizeForm.style';
import Modal from '../../../molecules/Modal';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductCustomizeFormPart from '../molecules/ProductCustomizeFormPart/views/ProductCustomizeFormPart.view';

class QuickViewCardProductCustomizeForm extends React.Component {
  onCloseClick = () => {
    const { closeQuickViewModal } = this.props;
    closeQuickViewModal({
      isModalOpen: false,
      // To clear QV product selected info..
      // To clear search results from suggested store list
    });
  };

  render() {
    const {
      isModalOpen,
      productInfo,
      productInfo: { colorFitsSizesMap, colorFitSizeDisplayNames },
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
        heading="ADD TO BAG"
        widthConfig={{ small: '375px', medium: '600px', large: '702px' }}
        heightConfig={{ height: '95%' }}
        fixedWidth
        inheritedStyles={customHeaderStyle}
      >
        <ProductCustomizeFormPart
          productInfo={productInfo}
          colorFitsSizesMap={colorFitsSizesMap}
          colorFitSizeDisplayNames={colorFitSizeDisplayNames}
          {...otherProps}
        />
      </Modal>
    );
  }
}

QuickViewCardProductCustomizeForm.propTypes = {
  closeQuickViewModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
};

export default withStyles(QuickViewCardProductCustomizeForm, styles);
