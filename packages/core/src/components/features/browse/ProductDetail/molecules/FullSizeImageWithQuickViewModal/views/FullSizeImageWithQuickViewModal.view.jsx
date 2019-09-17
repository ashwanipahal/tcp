/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../../common/molecules/Modal';
// import { ProductColorChipsSelector } from 'views/components/product/formDetails/ProductColorChipsSelector.jsx';
import ProductImages from '../../../../../../common/organisms/ProductImages';
// import { ModalHeaderDisplayContainer } from 'views/components/modal/ModalHeaderDisplayContainer.jsx';
// import { PRODUCT_INFO_PROP_TYPE_SHAPE } from 'views/components/common/propTypes/productsAndItemsPropTypes.js';
// import { ShadowField } from 'reduxStore/util/ShadowField.jsx';

export default class FullSizeImageWithQuickViewModal extends React.Component {
  static propTypes = {
    /** information of the product whose images to show */
    // productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,

    /** list of images of the product */
    images: PropTypes.arrayOf(
      PropTypes.shape({
        iconSizeImageUrl: PropTypes.string.isRequired,
        regularSizeImageUrl: PropTypes.string.isRequired,
        bigSizeImageUrl: PropTypes.string.isRequired,
        superSizeImageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,

    /** The from and field name holding the currently selected color we need to track */
    colorFormName: PropTypes.string,
    colorFieldName: PropTypes.string,

    /** function to call to close this modal */
    onCloseClick: PropTypes.func.isRequired,

    /** Whether to render for mobile. */
    isMobile: PropTypes.bool.isRequired,

    /**
     * Function to call when the color has changed. The function will receive
     * the new color's name as it's only parameter.
     */
    onColorChange: PropTypes.func,

    /** Flags if the thumnails should be visible. */
    isThumbnailListVisible: PropTypes.bool,
    videoUrl: PropTypes.string,
    isShowVideoOnPdp: PropTypes.bool,
  };

  render() {
    let {
      isMobile,
      onCloseClick,
      // productInfo,
      isThumbnailListVisible,
      onColorChange,
      colorFormName,
      colorFieldName,
      images,
    } = this.props;
    return (
      <Modal
        isOpen
        onRequestClose={onCloseClick}
        heading={'Modal Heading'}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        fixedWidth
        widthConfig={{ small: '375px', medium: '1000x', large: '1200px' }}
        heightConfig={{ height: '95%' }}
      >
        <div className="overlay-content">
          <ProductImages
            productName="Dummy Product"
            isMobile={false}
            images={images}
            isShowBigSizeImages
            isFullSizeVisible={false}
            isShowBigSizeImages
            isZoomEnabled={false}
            isThumbnailListVisible={isThumbnailListVisible}
          />
        </div>
      </Modal>
    );
  }
}
