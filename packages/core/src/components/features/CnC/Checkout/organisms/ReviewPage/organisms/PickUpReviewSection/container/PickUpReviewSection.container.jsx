import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PickUpReviewSection from '../../../molecules/PickUpReviewSection';
import BAG_SELECTORS from '../../../../../../BagPage/container/BagPage.selectors';

import CHECKOUT_SELECTORS, {
  getPickupValues,
  getPickupAltValues,
  isPickupAlt,
  getAlternateFormFieldsExpress,
} from '../../../../../container/Checkout.selector';

export const PickUpReviewContainer = ({
  cartStores,
  pickUpContactPerson,
  pickUpAlternatePerson,
  isHasPickUpAlternatePerson,
  onEdit,
  labels,
  pickUpLabels,
  isAlternateUpdateChecked,
  isExpressCheckout,
  pickUpContactAlternate,
}) => {
  return (
    <PickUpReviewSection
      cartStores={cartStores}
      pickUpContactPerson={pickUpContactPerson}
      pickUpAlternatePerson={pickUpAlternatePerson}
      isHasPickUpAlternatePerson={isHasPickUpAlternatePerson}
      onEdit={onEdit}
      labels={labels}
      pickUpLabels={pickUpLabels}
      isAlternateUpdateChecked={
        isAlternateUpdateChecked ? isAlternateUpdateChecked.hasAlternatePickup : false
      }
      isExpressCheckout={isExpressCheckout}
      pickUpContactAlternate={pickUpContactAlternate}
    />
  );
};

PickUpReviewContainer.propTypes = {
  cartStores: PropTypes.shape({}).isRequired,
  pickUpContactPerson: PropTypes.shape({}).isRequired,
  pickUpAlternatePerson: PropTypes.shape({}).isRequired,
  isHasPickUpAlternatePerson: PropTypes.shape({}).isRequired,
  onEdit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  pickUpLabels: PropTypes.shape({}),
  isAlternateUpdateChecked: PropTypes.shape({}).isRequired,
  isExpressCheckout: PropTypes.bool,
  pickUpContactAlternate: PropTypes.shape({}).isRequired,
};

PickUpReviewContainer.defaultProps = {
  labels: {},
  pickUpLabels: {},
  isExpressCheckout: false,
};

const mapStateToProps = state => {
  return {
    cartStores: BAG_SELECTORS.getCartStoresToJs(state),
    pickUpContactPerson: getPickupValues(state),
    pickUpAlternatePerson: getPickupAltValues(state),
    isHasPickUpAlternatePerson: isPickupAlt(state),
    labels: CHECKOUT_SELECTORS.getPickupSectionLabels(state),
    pickUpLabels: {
      ...CHECKOUT_SELECTORS.getPickUpContactFormLabels(state),
      ...CHECKOUT_SELECTORS.getEmailSignUpLabels(state),
    },
    isAlternateUpdateChecked: getAlternateFormFieldsExpress(state),
    pickUpContactAlternate: CHECKOUT_SELECTORS.getPickupInitialPickupSectionValues(state),
  };
};

export default connect(mapStateToProps)(PickUpReviewContainer);
