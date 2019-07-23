/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../../common/atoms/Anchor';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import CreditCardForm from '../organism/CreditCardForm';
import Notification from '../../../../common/molecules/Notification';

export const AddEditCreditCard = ({ labels, isEdit, errorMessage, ...otherProps }) => {
  return (
    <React.Fragment>
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        to="/account?id=payment"
        data-locator="payment-backlink"
      >
        {labels.ACC_LBL_BACK_LINK_CTA}
      </Anchor>
      <FormPageHeading
        heading={isEdit ? labels.ACC_LBL_EDIT_CC_HEADING : labels.ACC_LBL_ADD_CC_HEADING}
        data-locator="payment-addcreditordebitcardheader"
      />
      {errorMessage && (
        <Notification
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={errorMessage}
        />
      )}
      <CreditCardForm labels={labels} isEdit={isEdit} {...otherProps} />
    </React.Fragment>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
};

export default AddEditCreditCard;
