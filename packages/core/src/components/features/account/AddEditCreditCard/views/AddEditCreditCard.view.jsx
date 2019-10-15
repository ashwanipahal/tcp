import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
  onFileAddressKey,
  pageBackLink,
  pageBackPath,
  pageheading,
  mailingAddress,
  showUserName,
  showCreditCardFields,
  formErrorMessage,
  showNotification,
  globalErrorMessage,
  ...otherProps
}) => {
  const backLink = pageBackLink || internalEndpoints.paymentPage.link;
  const backLinkPath = pageBackPath || internalEndpoints.paymentPage.path;
  const pageHeading = heading => {
    let headingStr = isEdit
      ? getLabelValue(labels, 'lbl_payment_editCCHeading', 'paymentGC')
      : getLabelValue(labels, 'lbl_payment_addCCHeading', 'paymentGC');
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
          {getLabelValue(labels, 'lbl_common_backLink', 'common')}
        </Anchor>
      </BodyCopy>
      <FormPageHeading
        heading={pageHeading(pageheading)}
        data-locator="payment-addcreditordebitcardheader"
      />
      {globalErrorMessage && showNotification && (
        <Notification
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={globalErrorMessage}
        />
      )}
      {!showCreditCardFields && (
        <div>
          <AddressVerification
            onSuccess={submitAddressFormAction}
            heading={
              isEdit
                ? getLabelValue(labels, 'ACC_LBL_EDIT_ADDRESS', 'addressBook')
                : getLabelValue(labels, 'ACC_LBL_VERIFY_YOUR_ADDRESS_HEADING_ADD', 'addressBook')
            }
            labels={labels}
            onError={submitAddressFormAction}
          />
          <CreditCardForm
            labels={labels}
            onSubmit={verifyAddressAction}
            initialValues={initialValues}
            isEdit={isEdit}
            mailingAddress
            backToPaymentClick={backToAddressBookClick}
            showUserName={showUserName}
            showCreditCardFields={showCreditCardFields}
            addressFormLabels={addressFormLabels}
            formErrorMessage={formErrorMessage}
            onFileAddressKey={onFileAddressKey}
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
          onFileAddressKey={onFileAddressKey}
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
  onFileAddressKey: PropTypes.string,
  pageBackLink: PropTypes.string,
  pageBackPath: PropTypes.string,
  pageheading: PropTypes.string,
  formErrorMessage: PropTypes.shape({}).isRequired,
  showNotification: PropTypes.bool.isRequired,
  globalErrorMessage: PropTypes.string,
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
  onFileAddressKey: '',
  mailingAddress: false,
  pageBackLink: null,
  pageBackPath: null,
  pageheading: null,
  globalErrorMessage: null,
};

export default AddEditCreditCard;
