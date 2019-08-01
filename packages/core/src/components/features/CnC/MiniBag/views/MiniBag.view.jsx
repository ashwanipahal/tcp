import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/MiniBag.style';
import ProductTile from '../molecules/ProductTile/views/ProductTile';

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
      heading="Mini BAG"
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="mini-bg-close"
      aria={{
        labelledby: 'Mini Bag',
        describedby: 'Added To Bag Modal',
      }}
    >
      <div className="miniBagWrapper">
        <ProductTile />
      </div>
    </Modal>
  );
};
MiniBag.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(MiniBag, styles);
export { MiniBag as MiniBagVanilla };
