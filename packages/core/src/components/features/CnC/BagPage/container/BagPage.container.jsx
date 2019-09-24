import React from 'react';
import { connect } from 'react-redux';
import { isGuest as isGuestUser } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import BagPageSelector from './BagPage.selectors';
import BagPage from '../views/BagPage.view';
import BAG_PAGE_ACTIONS from './BagPage.actions';
import {
  getCartOrderList,
  getIsCartItemsUpdating,
  getLabelsCartItemTile,
  getIsCartItemsSFL,
  getIsSflItemRemoved,
} from '../../CartItemTile/container/CartItemTile.selectors';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';

// @flow
// type Props = {
//   closeModal: Function,
//   addedToBagData: any,
//   isOpenDialog: boolean,
//   labels: any,
//   quantity: number,
// };

export class BagPageContainer extends React.Component<Props> {
  componentDidMount() {
    const { needHelpContentId, fetchNeedHelpContent } = this.props;
    fetchNeedHelpContent([needHelpContentId]);
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
      isCartItemsUpdating,
      toastMessage,
      isCartItemSFL,
      isSflItemRemoved,
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
        isCartItemsUpdating={isCartItemsUpdating}
        toastMessage={toastMessage}
        isCartItemSFL={isCartItemSFL}
        isSflItemRemoved={isSflItemRemoved}
      />
    );
  }
}

BagPageContainer.getInitActions = () => BAG_PAGE_ACTIONS.initActions;

export const mapDispatchToProps = (dispatch: ({}) => void) => {
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
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
  };
};

const mapStateToProps = state => {
  const { size = 0 } = getCartOrderList(state) || {};
  return {
    labels: { ...BagPageSelector.getBagPageLabels(state), ...getLabelsCartItemTile(state) },
    totalCount: BagPageSelector.getTotalItems(state),
    productsTypes: BagPageSelector.getProductsTypes(state),
    orderItemsCount: size,
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
    showConfirmationModal: BagPageSelector.getConfirmationModalFlag(state),
    isUserLoggedIn: getUserLoggedInState(state),
    isGuest: isGuestUser(state),
    sflItems: BagPageSelector.getsflItemsList(state),
    isCartItemsUpdating: getIsCartItemsUpdating(state),
    isCartItemSFL: getIsCartItemsSFL(state),
    isSflItemRemoved: getIsSflItemRemoved(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageContainer);
