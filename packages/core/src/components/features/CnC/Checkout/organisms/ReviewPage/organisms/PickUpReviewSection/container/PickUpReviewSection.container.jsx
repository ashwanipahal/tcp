import { connect } from 'react-redux';

import PickUpReviewSection from '../../../molecules/PickUpReviewSection';
import BAG_SELECTORS from '../../../../../../BagPage/container/BagPage.selectors';

import CHECKOUT_SELECTORS, {
  getPickupValues,
  getPickupAltValues,
  isPickupAlt,
} from '../../../../../container/Checkout.selector';

function mapStateToProps(state) {
  const pickUpContactPerson = getPickupValues(state);
  const pickUpAlternatePerson = getPickupAltValues(state);

  // const venmoEnabled = checkoutStoreView.isVenmoNonceActive(state);
  // if (venmoEnabled && !checkoutStoreView.isPickupValuesAvailable(state)) {
  //   const initialPickupValues = checkoutStoreView.getInitialPickupSectionValues(state);
  //   eslint-disable-next-line extra-rules/no-commented-out-code
  //   pickUpContactPerson = initialPickupValues && initialPickupValues.pickUpContact;
  // }
  // eslint-disable-next-line extra-rules/no-commented-out-code
  // console.log('BAG_SELECTORS getCartStores(state)', BAG_SELECTORS.getCartStores(state).toJS());
  // eslint-disable-next-line extra-rules/no-commented-out-code
  // console.log('BAG_SELECTORS getCartstLocId', BAG_SELECTORS.getCartStoresFour(state));
  // eslint-disable-next-line extra-rules/no-commented-out-code
  // console.log('BAG_SELECTORS getCartStoresTwo', BAG_SELECTORS.getCartStoresTwo(state));
  return {
    // adding items for showing Pickup store data
    cartStores: BAG_SELECTORS.getCartStoresToJs(state),
    pickUpContactPerson,
    pickUpLabels: CHECKOUT_SELECTORS.getPickUpContactFormLabels(state),
    pickUpAlternatePerson,
    isHasPickUpAlternatePerson: isPickupAlt(state),
  };
}

export default connect(
  mapStateToProps,
  null
)(PickUpReviewSection);
