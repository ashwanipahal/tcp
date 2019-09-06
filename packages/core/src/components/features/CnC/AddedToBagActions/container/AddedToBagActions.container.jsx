import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddedToBagActionsView from '../views/AddedToBagActions.view';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';
import { checkoutModalOpenState } from '../../../account/LoginPage/container/LoginPage.selectors';
import { getLabelsAddToActions } from '../../AddedToBag/container/AddedToBag.selectors';
import { CHECKOUT_ROUTES } from '../../Checkout/Checkout.constants';
import utility from '../../Checkout/util/utility';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import bagPageActions from '../../BagPage/container/BagPage.actions';
import bagPageSelector from '../../BagPage/container/BagPage.selectors';
import checkoutSelectors from '../../Checkout/container/Checkout.selector';

export class AddedToBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleContinueShopping = this.handleContinueShopping.bind(this);
  }

  componentWillUnmount() {
    const { closeCheckoutModalMountState } = this.props;
    closeCheckoutModalMountState({ state: false });
  }

  handleContinueShopping() {
    const { closeAddedToBag } = this.props;
    closeAddedToBag();
  }

  render() {
    const {
      labels,
      showAddTobag,
      inheritedStyles,
      navigation,
      handleCartCheckout,
      checkoutModalMountedState,
      closeCheckoutModalMountState,
      isUserLoggedIn,
      routeForBagCheckout,
      closeCheckoutConfirmationModal,
      modalInfo,
      isEditingItem,
      removeUnqualifiedItemsAndCheckout,
      orderHasPickup,
      closeModal,
    } = this.props;
    const onClickViewBag = () => {
      utility.routeToPage(CHECKOUT_ROUTES.bagPage);
    };
    return (
      <AddedToBagActionsView
        onClickViewBag={onClickViewBag}
        handleCartCheckout={handleCartCheckout}
        labels={labels}
        handleContinueShopping={this.handleContinueShopping}
        showAddTobag={showAddTobag}
        routeForBagCheckout={routeForBagCheckout}
        inheritedStyles={inheritedStyles}
        closeCheckoutModalMountState={closeCheckoutModalMountState}
        checkoutModalMountedState={checkoutModalMountedState}
        navigation={navigation}
        isUserLoggedIn={isUserLoggedIn}
        closeCheckoutConfirmationModal={closeCheckoutConfirmationModal}
        modalInfo={modalInfo}
        isEditingItem={isEditingItem}
        removeUnqualifiedItemsAndCheckout={removeUnqualifiedItemsAndCheckout}
        orderHasPickup={orderHasPickup}
        closeModal={closeModal}
      />
    );
  }
}

AddedToBagContainer.propTypes = {
  labels: PropTypes.shape.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  routeForBagCheckout: PropTypes.func.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  removeUnqualifiedItemsAndCheckout: PropTypes.func.isRequired,
  closeCheckoutConfirmationModal: PropTypes.func.isRequired,
  modalInfo: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    closeCheckoutModalMountState: payload => {
      dispatch(setCheckoutModalMountedState(payload));
    },
    routeForBagCheckout: () => {
      dispatch(bagPageActions.routeForCheckout());
    },
    handleCartCheckout: isEditingItem => {
      dispatch(bagPageActions.startCheckout(isEditingItem));
    },
    closeCheckoutConfirmationModal: () => {
      dispatch(bagPageActions.closeCheckoutConfirmationModal());
    },
    removeUnqualifiedItemsAndCheckout: () => {
      dispatch(bagPageActions.removeUnqualifiedItemsAndCheckout());
    },
  };
};

const mapStateToProps = state => {
  return {
    labels: getLabelsAddToActions(state),
    checkoutModalMountedState: checkoutModalOpenState(state),
    isUserLoggedIn: getUserLoggedInState(state),
    modalInfo: bagPageSelector.getConfirmationModalFlag(state),
    orderHasPickup: checkoutSelectors.getIsOrderHasPickup(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
