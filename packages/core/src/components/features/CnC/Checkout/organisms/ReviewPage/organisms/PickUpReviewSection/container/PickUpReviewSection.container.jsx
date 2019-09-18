import { connect } from 'react-redux';
import PickUpReviewSection from '../../../molecules/PickUpReviewSection';
import BAG_SELECTORS from '../../../../../../BagPage/container/BagPage.selectors';
import { getPickupValues } from '../../../../../container/Checkout.selector';

function mapStateToProps(state) {
  const pickUpContactPerson = getPickupValues(state);

  // const venmoEnabled = checkoutStoreView.isVenmoNonceActive(state);
  // if (venmoEnabled && !checkoutStoreView.isPickupValuesAvailable(state)) {
  //   const initialPickupValues = checkoutStoreView.getInitialPickupSectionValues(state);
  //   eslint-disable-next-line extra-rules/no-commented-out-code
  //   pickUpContactPerson = initialPickupValues && initialPickupValues.pickUpContact;
  // }

  return {
    // adding items for showing Pickup store data
    cartStores: BAG_SELECTORS.getCartStores(state),
    pickUpContactPerson,
  };
}

export default connect(
  mapStateToProps,
  null
)(PickUpReviewSection);
