import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles, { modalStyles } from '../styles/MiniBag.style';
import MiniBagHeader from '../molecules/MiniBagHeader/views/MiniBagHeader';
import MiniBagBody from '../molecules/MiniBagBody/views/MiniBagBody';

// @flow
type Props = {
  onRequestClose: Function,
  className: string,
  openState: boolean,
  labels: any,
  totalItems: any,
  userName: any,
};

const MiniBag = ({ onRequestClose, className, openState, labels, totalItems, userName }: Props) => {
  return (
    <Modal
      isOpen={openState}
      onRequestClose={onRequestClose}
      heading={<MiniBagHeader labels={labels} totalItems={totalItems} userName={userName} />}
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
      <MiniBagBody labels={labels} />
    </Modal>
  );
};
MiniBag.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(MiniBag, styles);
export { MiniBag as MiniBagVanilla };
