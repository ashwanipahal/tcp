import { getSiteId } from '../../../../../../../utils/utils.web';

const setPickupInitialValues = pickUpContactPerson => {
  return {
    firstName: pickUpContactPerson.firstName,
    lastName: pickUpContactPerson.lastName,
    phoneNumber: pickUpContactPerson.phoneNumber,
    emailAddress: pickUpContactPerson.emailAddress,
    country: getSiteId() && getSiteId().toUpperCase(),
  };
};

export default setPickupInitialValues;
