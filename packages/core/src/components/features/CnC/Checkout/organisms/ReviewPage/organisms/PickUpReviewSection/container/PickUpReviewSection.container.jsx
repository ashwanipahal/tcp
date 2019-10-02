import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PickUpReviewSection from '../../../molecules/PickUpReviewSection';
import BAG_SELECTORS from '../../../../../../BagPage/container/BagPage.selectors';

import CHECKOUT_SELECTORS, {
  getPickupValues,
  getPickupAltValues,
  isPickupAlt,
} from '../../../../../container/Checkout.selector';

export const PickUpReviewContainer = ({
  cartStores,
  pickUpContactPerson,
  pickUpAlternatePerson,
  isHasPickUpAlternatePerson,
  onEdit,
  labels,
}) => {
  return (
    <PickUpReviewSection
      cartStores={cartStores}
      pickUpContactPerson={pickUpContactPerson}
      pickUpAlternatePerson={pickUpAlternatePerson}
      isHasPickUpAlternatePerson={isHasPickUpAlternatePerson}
      onEdit={onEdit}
      labels={labels}
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
};

PickUpReviewContainer.defaultProps = {
  labels: {},
};

const mapStateToProps = state => {
  return {
    cartStores: BAG_SELECTORS.getCartStoresToJs(state),
    pickUpContactPerson: getPickupValues(state),
    pickUpAlternatePerson: getPickupAltValues(state),
    isHasPickUpAlternatePerson: isPickupAlt(state),
    labels: CHECKOUT_SELECTORS.getPickupSectionLabels(state),
  };
};

export default connect(mapStateToProps)(PickUpReviewContainer);
