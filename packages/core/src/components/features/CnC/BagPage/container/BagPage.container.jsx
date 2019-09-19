import React from 'react';
import { connect } from 'react-redux';
import { isGuest as isGuestUser } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import BagPageSelector from './BagPage.selectors';
import BagPage from '../views/BagPage.view';
import BAG_PAGE_ACTIONS from './BagPage.actions';
import { getCartOrderList } from '../../CartItemTile/container/CartItemTile.selectors';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';

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
    const { initialActions } = this.props;
    initialActions();
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
      fetchLabels,
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
        fetchLabels={fetchLabels}
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
    fetchLabels: () => {
      dispatch(BAG_PAGE_ACTIONS.initActions[0]);
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageContainer);
