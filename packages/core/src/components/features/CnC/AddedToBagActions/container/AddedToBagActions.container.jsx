import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddedToBagActionsView from '../views/AddedToBagActions.view';
import { getLabelsAddToActions } from '../../AddedToBag/container/AddedToBag.selectors';
import { CHECKOUT_ROUTES } from '../../Checkout/Checkout.constants';
import utility from '../../Checkout/util/utility';
import bagPageActions from '../../BagPage/container/BagPage.actions';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';
import checkoutSelectors, { isUsSite } from '../../Checkout/container/Checkout.selector';

export class AddedToBagContainer extends React.Component<Props> {
  onClickViewBag = () => {
    utility.routeToPage(CHECKOUT_ROUTES.bagPage);
  };

  render() {
    const {
      labels,
      showAddTobag,
      handleCartCheckout,
      isEditingItem,
      isInternationalShipping,
      isVenmoEnabled,
      navigation,
      showVenmo,
      isNoNEmptyBag,
      fromAddedToBagModal,
      inheritedStyles,
      isBagPageStickyHeader,
      closeModal,
      isUSSite,
    } = this.props;
    return (
      <AddedToBagActionsView
        labels={labels}
        onClickViewBag={this.onClickViewBag}
        showAddTobag={showAddTobag}
        handleCartCheckout={handleCartCheckout}
        isEditingItem={isEditingItem}
        isInternationalShipping={isInternationalShipping}
        isVenmoEnabled={isVenmoEnabled}
        navigation={navigation}
        showVenmo={showVenmo}
        isNoNEmptyBag={isNoNEmptyBag}
        fromAddedToBagModal={fromAddedToBagModal}
        isBagPageStickyHeader={isBagPageStickyHeader}
        closeModal={closeModal}
        isUSSite={isUSSite}
        inheritedStyles={inheritedStyles}
      />
    );
  }
}

AddedToBagContainer.propTypes = {
  labels: PropTypes.shape.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  isInternationalShipping: PropTypes.bool.isRequired,
  isNoNEmptyBag: PropTypes.number.isRequired,
  isBagPageStickyHeader: PropTypes.bool,
};

AddedToBagContainer.defaultProps = {
  isBagPageStickyHeader: false,
};

const mapDispatchToProps = dispatch => {
  return {
    handleCartCheckout: payload => {
      dispatch(bagPageActions.startCheckout(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    labels: getLabelsAddToActions(state),
    isInternationalShipping: getIsInternationalShipping(state),
    isVenmoEnabled: checkoutSelectors.getIsVenmoEnabled(state),
    isUSSite: isUsSite(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
