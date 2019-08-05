import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles, { modalStyles } from '../styles/MiniBag.style';
import MiniBagHeader from '../molecules/MiniBagHeader/views/MiniBagHeader';
import MiniBagBody from '../molecules/MiniBagBody/views/MiniBagBody';
import MiniBagFooter from '../molecules/MiniBagFooter/views/MiniBagFooter';

// @flow
type Props = {
  onRequestClose: Function,
  className: string,
};

const MiniBag = ({ onRequestClose, className }: Props) => {
  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      heading={<MiniBagHeader />}
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="mini-bag-close"
      aria={{
        labelledby: 'Mini Bag',
        describedby: 'Mini Bag Modal',
      }}
      data-locator="mini-bag-modal"
      inheritedStyles={modalStyles}
    >
      <MiniBagBody />
      <MiniBagFooter />
    </Modal>
  );
};
MiniBag.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(MiniBag, styles);
export { MiniBag as MiniBagVanilla };
