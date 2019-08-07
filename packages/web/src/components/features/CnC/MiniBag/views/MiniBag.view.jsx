import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import styles, { modalStyles } from '../styles/MiniBag.style';
import MiniBagHeader from '../molecules/MiniBagHeader/views/MiniBagHeader';
import MiniBagBody from '../molecules/MiniBagBody/views/MiniBagBody';

// @flow
type Props = {
  onRequestClose: Function,
  className: string,
  openState: boolean,
  labels: any,
  userName: any,
  subTotal: any,
};

const MiniBag = ({ onRequestClose, className, openState, labels, userName, subTotal }: Props) => {
  const cartItemCount = getCartItemCount();
  return (
    <Modal
      isOpen={openState}
      onRequestClose={onRequestClose}
      heading={<MiniBagHeader labels={labels} cartItemCount={cartItemCount} userName={userName} />}
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
      <MiniBagBody
        labels={labels}
        cartItemCount={cartItemCount}
        userName={userName}
        subTotal={subTotal}
      />
    </Modal>
  );
};
MiniBag.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(MiniBag, styles);
export { MiniBag as MiniBagVanilla };
