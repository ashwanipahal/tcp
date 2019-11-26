import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ModalWrapper.style';

class ModalWrapper extends React.PureComponent {
  toggleModal = () => {
    const { onCloseModal } = this.props;
    if (onCloseModal) {
      onCloseModal();
    }
  };

  renderCheckBox = () => {};

  render() {
    const {
      isOpenModal,
      children,
      heading,
      widthConfig,
      heightConfig,
      standardHeight,
    } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        fixedWidth
        fullWidth
        onRequestClose={this.toggleModal}
        widthConfig={widthConfig}
        heightConfig={heightConfig}
        headingAlign="center"
        stickyHeader
        heading={heading}
        stickyCloseIcon
        horizontalBar={false}
        inheritedStyles={styles}
        standardHeight={standardHeight}
      >
        {children}
      </Modal>
    );
  }
}

ModalWrapper.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  children: PropTypes.element,
  onCloseModal: PropTypes.func,
  heading: PropTypes.string.isRequired,
  widthConfig: PropTypes.shape({}),
  heightConfig: PropTypes.shape({}),
};

ModalWrapper.defaultProps = {
  children: null,
  onCloseModal: null,
  widthConfig: {},
  heightConfig: {},
};

export default withStyles(ModalWrapper, styles);

export { ModalWrapper as ModalWrapperVanilla };
