import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/FullSizeImageModal.style';
import { DamImage } from '../../../../../../common/atoms';
import Modal from '../../../../../../common/molecules/Modal';
import onDoubleTap from '../util';
import { getLocator } from '../../../../../../../utils';

class FullSizeImageModal extends React.Component {
  static propTypes = {
    /** Current image's name or title to product's figure */
    name: PropTypes.string,

    /** Current image's path to main product's figure.  */
    image: PropTypes.string.isRequired,

    /** function to call to close this modal */
    onCloseClick: PropTypes.func.isRequired,
    isZoomIn: PropTypes.bool,
    className: PropTypes.string,
    modalLabel: PropTypes.string,
  };

  handleTouchStart = onDoubleTap(() => {
    const { isZoomIn } = this.state;
    this.setState({ isZoomIn: !isZoomIn });
  });

  constructor(props) {
    super(props);
    const { isZoomIn } = this.props;
    this.state = { isZoomIn: !!isZoomIn };
  }

  render() {
    const { onCloseClick, className, name, image, modalLabel } = this.props;
    const { isZoomIn } = this.state;
    const imgData = {
      alt: name,
      url: image,
    };
    return (
      <Modal
        isOpen
        onRequestClose={onCloseClick}
        overlayClassName="TCPModal__Overlay"
        className={`${className} TCPModal__Content`}
        dataLocator={getLocator('pdp_full_size_image_modal')}
        closeIconDataLocator={getLocator('pdp_zoomed_image_closed_btn')}
        fixedWidth
        contentLabel={`${name} ${modalLabel}`}
      >
        <div className="overlay-content">
          <figure
            className={[className, 'image-zoom', isZoomIn ? 'active-zoom-in' : ''].join(' ')}
            onTouchStart={this.handleTouchStart}
          >
            <DamImage imgData={imgData} isProductImage />
          </figure>
        </div>
      </Modal>
    );
  }
}

FullSizeImageModal.defaultProps = {
  name: '',
  isZoomIn: false,
  className: '',
  modalLabel: '',
};

export default withStyles(FullSizeImageModal, styles);
export { FullSizeImageModal as FullSizeImageModalVanilla };
