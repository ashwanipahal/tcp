import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import CreditCardForm from '../organism/CreditCardForm';
import Notification from '../../../../common/molecules/Notification';
import AddressVerification from '../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import internalEndpoints from '../../common/internalEndpoints';

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
  onFileAddresskey,
  ...otherProps
}) => {
  const backLink = mailingAddress
    ? internalEndpoints.profilePage.link
    : internalEndpoints.paymentPage.link;
  const backLinkPath = mailingAddress
    ? internalEndpoints.profilePage.path
    : internalEndpoints.paymentPage.path;
  return (
    <React.Fragment>
      <BodyCopy className="elem-mb-LRG">
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          to={backLink}
          dataLocator="payment-backlink"
          asPath={backLinkPath}
        >
          <span className="left-arrow"> </span>
          {labels.common.lbl_common_backLink}
        </Anchor>
      </BodyCopy>
      {mailingAddress && <FormPageHeading heading={labels.profile.lbl_profile_heading} />}
      {!mailingAddress && (
        <FormPageHeading
          heading={
            isEdit
              ? labels.paymentGC.lbl_payment_editCCHeading
              : labels.paymentGC.lbl_payment_addCCHeading
          }
          data-locator="payment-addcreditordebitcardheader"
        />
      )}
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
            addressFormLabels={addressFormLabels}
            {...otherProps}
          />
        </div>
      )}
      {!mailingAddress && (
        <CreditCardForm
          labels={labels}
          isEdit={isEdit}
          initialValues={initialValues}
          addressFormLabels={addressFormLabels}
          {...otherProps}
        />
      )}
    </React.Fragment>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
  addressFormLabels: PropTypes.shape({}).isRequired,
  mailingAddress: PropTypes.bool,
  submitAddressFormAction: PropTypes.func,
  backToAddressBookClick: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  initialValues: PropTypes.shape({}),
  onFileAddresskey: PropTypes.string,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
  mailingAddress: false,
  submitAddressFormAction: PropTypes.func,
  backToAddressBookClick: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  initialValues: {},
  onFileAddresskey: '',
};

export default AddEditCreditCard;
