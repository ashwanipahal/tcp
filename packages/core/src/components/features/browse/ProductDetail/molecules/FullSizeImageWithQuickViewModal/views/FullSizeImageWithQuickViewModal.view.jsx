import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles, { customHeaderStyle } from '../styles/FullSizeImageWithQuickViewModal.style';
import Modal from '../../../../../../common/molecules/Modal';
import ProductImages from '../../../../../../common/organisms/ProductImages';
import { getLocator } from '../../../../../../../utils';

const FullSizeImageWithQuickViewModal = props => {
  const { isMobile, onCloseClick, name, isThumbnailListVisible, images } = props;
  return (
    <Modal
      isOpen
      onRequestClose={onCloseClick}
      overlayClassName="TCPModal__Overlay"
      className="TCPModal__Content"
      dataLocatorHeader={getLocator('pdp_product_titles')}
      dataLocator={getLocator('pdp_full_size_image_modal')}
      closeIconDataLocator={getLocator('pdp_zoomed_image_closed_btn')}
      heading={name}
      fixedWidth
      widthConfig={{ small: '375px', medium: '760px', large: '1200px' }}
      heightConfig={{ height: '95%' }}
      inheritedStyles={customHeaderStyle}
    >
      <div className="overlay-content">
        <ProductImages
          productName={name}
          isMobile={isMobile}
          images={images}
          isShowBigSizeImages
          isFullSizeVisible={false}
          isFullSizeForTab
          isZoomEnabled={false}
          isThumbnailListVisible={isThumbnailListVisible}
        />
      </div>
    </Modal>
  );
};

FullSizeImageWithQuickViewModal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      iconSizeImageUrl: PropTypes.string.isRequired,
      regularSizeImageUrl: PropTypes.string.isRequired,
      bigSizeImageUrl: PropTypes.string.isRequired,
      superSizeImageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,

  /** function to call to close this modal */
  onCloseClick: PropTypes.func.isRequired,

  /** Flags if the thumnails should be visible. */
  isThumbnailListVisible: PropTypes.bool,
  isMobile: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

FullSizeImageWithQuickViewModal.defaultProps = {
  isMobile: true,
  isThumbnailListVisible: true,
};

export default withStyles(FullSizeImageWithQuickViewModal, styles);
export { FullSizeImageWithQuickViewModal as FullSizeImageWithQuickViewModalVanilla };
