import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../../common/atoms/Anchor';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import CreditCardForm from '../organism/CreditCardForm';
import Notification from '../../../../common/molecules/Notification';

export const AddEditCreditCard = ({
  labels,
  isEdit,
  errorMessage,
  addressFormLabels,
  ...otherProps
}) => {
  return (
    <React.Fragment>
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        to="/account?id=payment"
        dataLocator="payment-backlink"
        asPath="/account/payment"
      >
        {labels.common.lbl_common_backLink}
      </Anchor>
      <FormPageHeading
        heading={
          isEdit
            ? labels.paymentGC.lbl_payment_editCCHeading
            : labels.paymentGC.lbl_payment_addCCHeading
        }
        data-locator="payment-addcreditordebitcardheader"
      />
      {errorMessage && (
        <Notification
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={errorMessage}
        />
      )}
      <CreditCardForm
        labels={labels}
        isEdit={isEdit}
        addressFormLabels={addressFormLabels}
        {...otherProps}
      />
    </React.Fragment>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
  addressFormLabels: PropTypes.shape({}).isRequired,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
};

export default AddEditCreditCard;
