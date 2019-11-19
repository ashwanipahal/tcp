import React from 'react';
import PropTypes from 'prop-types';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import { Container } from '../styles/ModalWrapper.style.native';

const fullWidth = {
  width: '100%',
  alignItems: 'flex-end',
};
class ModalWrapper extends React.PureComponent {
  toggleModal = () => {
    const { onCloseModal } = this.props;
    if (onCloseModal) {
      onCloseModal();
    }
  };

  renderCheckBox = () => {};

  render() {
    const { isOpenAddList, margins, modalMargins, heading, children } = this.props;
    return (
      <Container margins={margins}>
        <ModalNative
          heading={heading}
          isOpen={isOpenAddList}
          onRequestClose={this.toggleModal}
          closeIconDataLocator=""
          closeIconLeftAligned={false}
          horizontalBar={false}
          headerStyle={fullWidth}
          isOverlay
          noscroll
          fixedWidth
          fullWidth
          stickyHeader
          headingAlign="center"
          stickyCloseIcon
          margins={modalMargins}
          modalHeadingMargin="24px 0 0 0"
          childrenMargins="36px 0 0 0"
          headingFontFamily="secondary"
          headingFontWeight="bold"
          fontSize="fs22"
        >
          {children}
        </ModalNative>
      </Container>
    );
  }
}

ModalWrapper.propTypes = {
  labels: PropTypes.shape({}),
  isOpenAddList: PropTypes.bool.isRequired,
  margins: PropTypes.string,
  modalMargins: PropTypes.string,
  children: PropTypes.element,
  onCloseModal: PropTypes.func,
  heading: PropTypes.string.isRequired,
};

ModalWrapper.defaultProps = {
  labels: {},
  margins: null,
  modalMargins: null,
  children: null,
  onCloseModal: null,
};

export default ModalWrapper;

export { ModalWrapper as ModalWrapperVanilla };
