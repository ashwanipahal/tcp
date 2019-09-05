import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import styles, { modalStyles } from '../styles/MiniBag.style';
import MiniBagHeader from '../molecules/MiniBagHeader/views/MiniBagHeader';
import MiniBagBody from '../molecules/MiniBagBody/views/MiniBagBody';

const renderMiniBagHeader = (labels, cartItemCount, userName, currentPoints, totalRewards) => {
  return (
    <MiniBagHeader
      labels={labels}
      cartItemCount={cartItemCount}
      userName={userName}
      currentPoints={currentPoints}
      totalRewards={totalRewards}
    />
  );
};

class MiniBag extends React.Component {
  componentWillReceiveProps({ router: nextRouter }) {
    const { router, onRequestClose } = this.props;
    if (router.asPath !== nextRouter.asPath) {
      onRequestClose();
    }
  }

  render() {
    const {
      onRequestClose,
      className,
      openState,
      labels,
      userName,
      subTotal,
      currencySymbol,
      currentPoints,
      totalRewards,
      isCartItemsUpdating,
    } = this.props;
    const cartItemCount = getCartItemCount();
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        heading={renderMiniBagHeader(labels, cartItemCount, userName, currentPoints, totalRewards)}
        overlayClassName="TCPModal__Overlay"
        className={`TCPModal__Content, ${className}`}
        closeIconDataLocator="mini-bag-close"
        aria={{
          labelledby: 'Mini Bag',
          describedby: 'Mini Bag Modal',
        }}
        data-locator="mini-bag-modal"
        inheritedStyles={modalStyles}
        closeIconLeftAligned
      >
        <MiniBagBody
          labels={labels}
          cartItemCount={cartItemCount}
          userName={userName}
          subTotal={subTotal}
          currencySymbol={currencySymbol}
          isCartItemsUpdating={isCartItemsUpdating}
        />
      </Modal>
    );
  }
}

MiniBag.propTypes = {
  className: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  openState: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  userName: PropTypes.string.isRequired,
  subTotal: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currentPoints: PropTypes.string.isRequired,
  totalRewards: PropTypes.string.isRequired,
  isCartItemsUpdating: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(MiniBag, styles));
export { MiniBag as MiniBagVanilla };
