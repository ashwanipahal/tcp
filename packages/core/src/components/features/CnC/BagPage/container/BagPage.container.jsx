import React from 'react';
import { connect } from 'react-redux';
import { isGuest as isGuestUser } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import BagPageSelector from './BagPage.selectors';
import BagPage from '../views/BagPage.view';
import BAG_PAGE_ACTIONS from './BagPage.actions';
import {
  getCartOrderList,
  getIsCartItemsSFL,
} from '../../CartItemTile/container/CartItemTile.selectors';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import {
  setVenmoPaymentInProgress,
  setVenmoPickupMessageState,
  setVenmoShippingMessageState,
} from '../../Checkout/container/Checkout.action';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';

export class BagPageContainer extends React.Component<Props> {
  componentDidMount() {
    const { needHelpContentId, fetchNeedHelpContent } = this.props;
    fetchNeedHelpContent([needHelpContentId]);
    const { setVenmoPickupState, setVenmoShippingState } = this.props;
    setVenmoPickupState(false);
    setVenmoShippingState(false);
  }

  closeModal = () => {};

  componentWillMount = () => {
    const { initialActions, fetchSflData } = this.props;
    initialActions();
    fetchSflData();
  };

  render() {
    const {
      labels,
      totalCount,
      orderItemsCount,
      navigation,
      isUserLoggedIn,
      handleCartCheckout,
      showConfirmationModal,
      closeCheckoutConfirmationModal,
      removeUnqualifiedItemsAndCheckout,
      isGuest,
      sflItems,
      fetchLabels,
      setVenmoInProgress,
      toastMessage,
      isCartItemSFL,
    } = this.props;

    const showAddTobag = false;
    return (
      <BagPage
        labels={labels}
        totalCount={totalCount}
        orderItemsCount={orderItemsCount}
        showAddTobag={showAddTobag}
        navigation={navigation}
        isUserLoggedIn={isUserLoggedIn}
        isGuest={isGuest}
        showConfirmationModal={showConfirmationModal}
        closeCheckoutConfirmationModal={closeCheckoutConfirmationModal}
        removeUnqualifiedItemsAndCheckout={removeUnqualifiedItemsAndCheckout}
        handleCartCheckout={handleCartCheckout}
        sflItems={sflItems}
        fetchLabels={fetchLabels}
        setVenmoPaymentInProgress={setVenmoInProgress}
        toastMessage={toastMessage}
        isCartItemSFL={isCartItemSFL}
      />
    );
  }
}

BagPageContainer.getInitActions = () => BAG_PAGE_ACTIONS.initActions;

export const mapDispatchToProps = dispatch => {
  return {
    initialActions: () => {
      dispatch(BAG_PAGE_ACTIONS.getCartData());
    },
    fetchNeedHelpContent: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
    fetchSflData: () => {
      dispatch(BAG_PAGE_ACTIONS.getSflData());
    },
    fetchLabels: () => {
      dispatch(BAG_PAGE_ACTIONS.initActions[0]);
    },
    setVenmoInProgress: data => dispatch(setVenmoPaymentInProgress(data)),
    setVenmoPickupState: data => dispatch(setVenmoPickupMessageState(data)),
    setVenmoShippingState: data => dispatch(setVenmoShippingMessageState(data)),
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
  };
};

const mapStateToProps = state => {
  const { size = 0 } = getCartOrderList(state) || {};
  return {
    labels: BagPageSelector.getBagPageLabels(state),
    totalCount: BagPageSelector.getTotalItems(state),
    productsTypes: BagPageSelector.getProductsTypes(state),
    orderItemsCount: size,
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
    showConfirmationModal: BagPageSelector.getConfirmationModalFlag(state),
    isUserLoggedIn: getUserLoggedInState(state),
    isGuest: isGuestUser(state),
    sflItems: BagPageSelector.getsflItemsList(state),
    isCartItemSFL: getIsCartItemsSFL(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageContainer);
