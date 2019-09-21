import { connect } from 'react-redux';
import PickUpReviewSection from '../../../molecules/PickUpReviewSection';
import BAG_SELECTORS from '../../../../../../BagPage/container/BagPage.selectors';

import CHECKOUT_SELECTORS, {
  getPickupValues,
  getPickupAltValues,
  isPickupAlt,
} from '../../../../../container/Checkout.selector';

const mapStateToProps = state => {
  // const venmoEnabled = checkoutStoreView.isVenmoNonceActive(state);
  // if (venmoEnabled && !checkoutStoreView.isPickupValuesAvailable(state)) {
  //   const initialPickupValues = checkoutStoreView.getInitialPickupSectionValues(state);
  //   eslint-disable-next-line extra-rules/no-commented-out-code
  //   pickUpContactPerson = initialPickupValues && initialPickupValues.pickUpContact;
  // }
  // eslint-disable-next-line extra-rules/no-commented-out-code
  const pickUpContactPerson = getPickupValues(state);
  const pickUpAlternatePerson = getPickupAltValues(state);

  return {
    cartStores: BAG_SELECTORS.getCartStoresToJs(state),
    pickUpContactPerson,
    pickUpAlternatePerson,
    isHasPickUpAlternatePerson: isPickupAlt(state),
    labels: CHECKOUT_SELECTORS.getPickupSectionLabels(state),
  };
};

export default connect(
  mapStateToProps,
  null
)(PickUpReviewSection);
