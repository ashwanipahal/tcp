import { getSiteId } from '../../../../../../../utils/utils.web';
import CONSTANTS from '../../../Checkout.constants';

const setPickupInitialValues = pickUpContactPerson => {
  return {
    firstName: pickUpContactPerson.firstName,
    lastName: pickUpContactPerson.lastName,
    phoneNumber: pickUpContactPerson.phoneNumber,
    emailAddress: pickUpContactPerson.emailAddress,
    country: getSiteId() && getSiteId().toUpperCase(),
  };
};

/**
 * This function is to validate if we need to show venmo banner or not.
 * Only if user comes on pickup or shipping page, but not on coming back from navigation
 * @params {string} currentSection - current checkout section name
 */
export const isShowVenmoBanner = (currentSection, props) => {
  const { isVenmoPaymentInProgress, isVenmoPickupDisplayed, isVenmoShippingDisplayed } = props;
  const { CHECKOUT_STAGES } = CONSTANTS;
  return (
    isVenmoPaymentInProgress &&
    ((currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP && !isVenmoPickupDisplayed) ||
      (currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING && !isVenmoShippingDisplayed))
  );
};

export default { setPickupInitialValues, isShowVenmoBanner };
