import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalsCheckoutView from '../views/ModalsCheckout.view';
import { setCheckoutModalMountedState } from '../../../../../account/LoginPage/container/LoginPage.actions';
import { checkoutModalOpenState } from '../../../../../account/LoginPage/container/LoginPage.selectors';
import { getLabelsAddToActions } from '../../../../AddedToBag/container/AddedToBag.selectors';
import { getUserLoggedInState } from '../../../../../account/User/container/User.selectors';
import bagPageActions from '../../../../BagPage/container/BagPage.actions';
import bagPageSelector from '../../../../BagPage/container/BagPage.selectors';
import checkoutSelectors from '../../../../Checkout/container/Checkout.selector';
import { closeMiniBag } from '../../../../../../common/organisms/Header/container/Header.actions';

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
      navigation,
      checkoutModalMountedState,
      closeCheckoutModalMountState,
      isUserLoggedIn,
      routeForBagCheckout,
      closeCheckoutConfirmationModal,
      modalInfo,
      removeUnqualifiedItemsAndCheckout,
      orderHasPickup,
      inheritedStyles,
      labels,
      closeModal,
      closeMiniBagDispatch,
    } = this.props;
    return (
      <ModalsCheckoutView
        handleContinueShopping={this.handleContinueShopping}
        routeForBagCheckout={routeForBagCheckout}
        inheritedStyles={inheritedStyles}
        closeCheckoutModalMountState={closeCheckoutModalMountState}
        checkoutModalMountedState={checkoutModalMountedState}
        navigation={navigation}
        isUserLoggedIn={isUserLoggedIn}
        closeCheckoutConfirmationModal={closeCheckoutConfirmationModal}
        modalInfo={modalInfo}
        removeUnqualifiedItemsAndCheckout={removeUnqualifiedItemsAndCheckout}
        orderHasPickup={orderHasPickup}
        closeModal={closeModal}
        closeMiniBagDispatch={closeMiniBagDispatch}
        labels={labels}
      />
    );
  }
}

AddedToBagContainer.propTypes = {
  labels: PropTypes.shape.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  routeForBagCheckout: PropTypes.func.isRequired,
  removeUnqualifiedItemsAndCheckout: PropTypes.func.isRequired,
  closeCheckoutConfirmationModal: PropTypes.func.isRequired,
  modalInfo: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeCheckoutModalMountState: payload => {
      dispatch(setCheckoutModalMountedState(payload));
    },
    routeForBagCheckout: () => {
      dispatch(bagPageActions.routeForCheckout());
    },
    closeCheckoutConfirmationModal: () => {
      dispatch(bagPageActions.closeCheckoutConfirmationModal());
    },
    removeUnqualifiedItemsAndCheckout: () => {
      dispatch(bagPageActions.removeUnqualifiedItemsAndCheckout(ownProps.navigation));
    },
    closeMiniBagDispatch: () => {
      dispatch(closeMiniBag());
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
