import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddedToBagActionsView from '../views/AddedToBagActions';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';
import { checkoutModalOpenState } from '../../../account/LoginPage/container/LoginPage.selectors';
import { getLabelsAddToActions } from '../../AddedToBag/container/AddedToBag.selectors';
import { routerPush } from '../../../../../utils';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';

export class AddedToBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleContinueShopping = this.handleContinueShopping.bind(this);
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
    } = this.props;
    const onClickViewBag = () => {
      routerPush('/cart', '/bag');
    };
    return (
      <AddedToBagActionsView
        onClickViewBag={onClickViewBag}
        handleCartCheckout={handleCartCheckout}
        labels={labels}
        handleContinueShopping={this.handleContinueShopping}
        showAddTobag={showAddTobag}
        inheritedStyles={inheritedStyles}
        closeCheckoutModalMountState={closeCheckoutModalMountState}
        checkoutModalMountedState={checkoutModalMountedState}
        navigation={navigation}
        isUserLoggedIn={isUserLoggedIn}
      />
    );
  }
}

AddedToBagContainer.propTypes = {
  labels: PropTypes.shape.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    closeCheckoutModalMountState: payload => {
      dispatch(setCheckoutModalMountedState(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    labels: getLabelsAddToActions(state),
    checkoutModalMountedState: checkoutModalOpenState(state),
    isUserLoggedIn: getUserLoggedInState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
