import React from 'react';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import PropTypes from 'prop-types';
import Anchor from '../../../../common/atoms/Anchor';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import CreditCardForm from '../organism/CreditCardForm';
import Notification from '../../../../common/molecules/Notification';
import AddressVerification from '../../../../common/organisms/AddressVerification/container/AddressVerification.container';

export const AddEditCreditCard = ({
  labels,
  isEdit,
  errorMessage,
  addressFormLabels,
  mailingAddress,
  submitAddressFormAction,
  backToAddressBookClick,
  verifyAddressAction,
  initialValues,
  userName,
  ...otherProps }) => {
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
      {mailingAddress && (
        <div>
          <AddressVerification
            onSuccess={submitAddressFormAction}
            heading={
              isEdit
                ? labels.addressBook.ACC_LBL_EDIT_ADDRESS
                : labels.addressBook.ACC_LBL_VERIFY_YOUR_ADDRESS_HEADING_ADD
            }
            labels={labels}
            onError={submitAddressFormAction}
          />

          <CreditCardForm
            labels={labels}
            onSubmit={verifyAddressAction}
            initialValues={initialValues}
            isEdit={isEdit}
            backToPaymentClick={backToAddressBookClick}
            mailingAddress={mailingAddress}
            userName={userName}
            {...otherProps}
          />
        </div>
        )
      }
      {!mailingAddress && (<CreditCardForm labels={labels} isEdit={isEdit} initialValues={initialValues} {...otherProps} />)}
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
