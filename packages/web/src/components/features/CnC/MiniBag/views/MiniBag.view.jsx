import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getSflItemCount, getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import SpinnerOverlay from '@tcp/core/src/components/common/atoms/SpinnerOverlay';
import styles, { modalStyles, customStyles } from '../styles/MiniBag.style';
import MiniBagHeader from '../molecules/MiniBagHeader/views/MiniBagHeader';
import MiniBagBody from '../molecules/MiniBagBody/views/MiniBagBody';
import { getSiteId } from '../../../../../../../core/src/utils/utils.web';

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

  renderMiniBagHeader = cartItemCount => {
    const {
      labels,
      userName,
      currentPoints,
      totalRewards,
      onRequestClose,
      openOverlay,
      isPlcc,
      isUserLoggedIn,
      isRememberedUser,
    } = this.props;

    return (
      <MiniBagHeader
        labels={labels}
        cartItemCount={cartItemCount}
        userName={userName}
        currentPoints={currentPoints}
        totalRewards={totalRewards}
        onRequestClose={onRequestClose}
        openOverlay={openOverlay}
        isPlcc={isPlcc}
        isUserLoggedIn={isUserLoggedIn}
        isRememberedUser={isRememberedUser}
      />
    );
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
      isCartItemsUpdating,
      isCartItemSFL,
      cartItemSflError,
      resetSuccessMessage,
      addedToBagError,
      isShowSaveForLaterSwitch,
      isUserLoggedIn,
      isRememberedUser,
      miniBagLoaderState,
      isMiniBag,
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
        {miniBagLoaderState && <SpinnerOverlay inheritedStyles={customStyles} />}
        {this.renderMiniBagHeader(cartItemCount)}
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
          resetSuccessMessage={resetSuccessMessage}
          addedToBagError={addedToBagError}
          isShowSaveForLaterSwitch={isShowSaveForLaterSwitch}
          isUserLoggedIn={isUserLoggedIn}
          isRememberedUser={isRememberedUser}
          isMiniBag={isMiniBag}
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
  resetSuccessMessage: PropTypes.func.isRequired,
  isPlcc: PropTypes.bool.isRequired,
  addedToBagError: PropTypes.string.isRequired,
  isShowSaveForLaterSwitch: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isRememberedUser: PropTypes.bool.isRequired,
  miniBagLoaderState: PropTypes.bool.isRequired,
  isMiniBag: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(MiniBag, styles));
export { MiniBag as MiniBagVanilla };
