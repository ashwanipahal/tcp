import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getCartItemCount, getSflItemCount } from '@tcp/core/src/utils/cookie.util';
import styles, { modalStyles } from '../styles/MiniBag.style';
import MiniBagHeader from '../molecules/MiniBagHeader/views/MiniBagHeader';
import MiniBagBody from '../molecules/MiniBagBody/views/MiniBagBody';
import { getSiteId } from '../../../../../../../core/src/utils/utils.web';

const renderMiniBagHeader = (
  labels,
  cartItemCount,
  userName,
  currentPoints,
  totalRewards,
  onRequestClose,
  openOverlay
) => {
  return (
    <MiniBagHeader
      labels={labels}
      cartItemCount={cartItemCount}
      userName={userName}
      currentPoints={currentPoints}
      totalRewards={totalRewards}
      onRequestClose={onRequestClose}
      openOverlay={openOverlay}
    />
  );
};

class MiniBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: getSiteId() && getSiteId().toUpperCase(),
    };
  }

  componentWillReceiveProps({ router: nextRouter }) {
    const { router, closeMiniBagDispatch } = this.props;
    /* istanbul ignore else */
    if (router.asPath !== nextRouter.asPath) {
      closeMiniBagDispatch();
    }
  }

  onLinkClick = ({ e, componentId }) => {
    const { onRequestClose, openOverlay } = this.props;
    e.preventDefault();
    openOverlay({
      component: componentId,
      variation: 'primary',
    });
    onRequestClose();
  };

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
      isCartItemSFL,
      cartItemSflError,
      openOverlay,
    } = this.props;
    const { country } = this.state;
    const cartItemCount = getCartItemCount();
    const sflItemsCount = getSflItemCount(country);
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
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
        {renderMiniBagHeader(
          labels,
          cartItemCount,
          userName,
          currentPoints,
          totalRewards,
          onRequestClose,
          openOverlay
        )}
        <MiniBagBody
          closeMiniBag={onRequestClose}
          labels={labels}
          cartItemCount={cartItemCount}
          userName={userName}
          subTotal={subTotal}
          currencySymbol={currencySymbol}
          isCartItemsUpdating={isCartItemsUpdating}
          savedforLaterQty={sflItemsCount}
          isCartItemSFL={isCartItemSFL}
          cartItemSflError={cartItemSflError}
          onLinkClick={this.onLinkClick}
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
  isCartItemSFL: PropTypes.bool.isRequired,
  cartItemSflError: PropTypes.string.isRequired,
  closeMiniBagDispatch: PropTypes.func.isRequired,
  openOverlay: PropTypes.func.isRequired,
};

export default withRouter(withStyles(MiniBag, styles));
export { MiniBag as MiniBagVanilla };
