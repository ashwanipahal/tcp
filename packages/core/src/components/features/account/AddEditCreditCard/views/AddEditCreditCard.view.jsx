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
  submitAddressFormAction,
  backToAddressBookClick,
  verifyAddressAction,
  initialValues,
  onFileAddresskey,
  pageBackLink,
  pageBackPath,
  pageheading,
  mailingAddress,
  showUserName,
  showCreditCardFields,
  formErrorMessage,
  ...otherProps
}) => {
  const backLink = pageBackLink || internalEndpoints.paymentPage.link;
  const backLinkPath = pageBackPath || internalEndpoints.paymentPage.path;
  const pageHeading = heading => {
    let headingStr = isEdit
      ? labels.paymentGC.lbl_payment_editCCHeading
      : labels.paymentGC.lbl_payment_addCCHeading;
    if (heading) {
      headingStr = heading;
    }
    return headingStr;
  };
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
      <FormPageHeading
        heading={pageHeading(pageheading)}
        data-locator="payment-addcreditordebitcardheader"
      />
      {errorMessage && (
        <Notification
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={errorMessage}
        />
      )}
      {!showCreditCardFields && (
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
            showUserName={showUserName}
            showCreditCardFields={showCreditCardFields}
            addressFormLabels={addressFormLabels}
            formErrorMessage={formErrorMessage}
            {...otherProps}
          />
        </div>
      )}
      {showCreditCardFields && (
        <CreditCardForm
          labels={labels}
          isEdit={isEdit}
          initialValues={initialValues}
          addressFormLabels={addressFormLabels}
          formErrorMessage={formErrorMessage}
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
  showCreditCardFields: PropTypes.bool,
  showUserName: PropTypes.bool,
  submitAddressFormAction: PropTypes.func,
  backToAddressBookClick: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  initialValues: PropTypes.shape({}),
  onFileAddresskey: PropTypes.string,
  pageBackLink: PropTypes.string,
  pageBackPath: PropTypes.string,
  pageheading: PropTypes.string,
  formErrorMessage: PropTypes.shape({}).isRequired,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
  showCreditCardFields: true,
  showUserName: true,
  submitAddressFormAction: PropTypes.func,
  backToAddressBookClick: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  initialValues: {},
  onFileAddresskey: '',
  mailingAddress: false,
  pageBackLink: null,
  pageBackPath: null,
  pageheading: null,
};

export default AddEditCreditCard;
