import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ProductPickup from '../views/ProductPickup.view';
import { getBopisInventoryDetailsActn } from './ProductPickup.actions';
import * as PickupSelectors from './ProductPickup.selectors';

class ProductPickupContainer extends React.PureComponent {
  render() {
    const { getBopisInventoryDetails, ...otherProps } = this.props;

    return <ProductPickup getBopisInventoryDetails={getBopisInventoryDetails} {...otherProps} />;
  }
}

ProductPickupContainer.propTypes = {
  getBopisInventoryDetails: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  /*
   * Previously form values were tracked in the state of Product.jsx
   * This was causing unnecessary re-renders for the entire product card
   * Now using redux-form selector to pull the required values directly into
   * the components that need them
   */
  const selector = formValueSelector(ownProps.formName);
  // creating new prop userDefaultStore which is a combination of
  //  favStore store or geo default store of user
  // const favStore = storesStoreView.getDefaultStore(state);
  // const geoDefaultStore = storesStoreView.getGeoDefaultStore(state);
  // const userDefaultStore = favStore || geoDefaultStore || null;
  // const offerEspot = generalStoreView.getEspotByName(state, 'fav_store_pickup_content');
  const userDefaultStore = null;

  return {
    itemValues: selector(state, 'color', 'fit', 'size', 'quantity'),
    isBopisEnabled: PickupSelectors.getIsBopisEnabled(state),
    isBossEnabled: PickupSelectors.getIsBossEnabled(state),
    isBopisClearanceProductEnabled: PickupSelectors.getIsBopisClearanceProductEnabled(state),
    isBossClearanceProductEnabled: PickupSelectors.getIsBossClearanceProductEnabled(state),
    userDefaultStore,
    userGeoCoordinates: {
      lat: null,
      long: null,
    },
    // TODO - these are required for default store.
    // Checking with BA since the requirement is not mentioned in the story.
    // TODO - check if required => userGeoCoordinates: userStoreView.getUserGeoCoordinates(state),
    // TODO - check if required => getGeoDefaultStore: storeOperators.storesOperator.loadDefaultStore,
    disabledFits: PickupSelectors.getBopisDisabledFits(state),
    bopisItemInventory: PickupSelectors.getBopisItemInventory(state),
    // TODO - This changes to CMS data - offerEspotAvailable: offerEspot && offerEspot.value,
    isRadialInventoryEnabled: PickupSelectors.getIsRadialInventoryEnabled(state),
  };
}

const mapDispatchToProps = dispatch => ({
  getBopisInventoryDetails: () => {
    dispatch(getBopisInventoryDetailsActn());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPickupContainer);
