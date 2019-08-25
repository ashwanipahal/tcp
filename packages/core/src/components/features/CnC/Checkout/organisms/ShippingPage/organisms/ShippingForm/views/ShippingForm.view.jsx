import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, reduxForm, Field } from 'redux-form';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import SMSFormFields from '../../../../../../../../common/molecules/SMSFormFields';
import createValidateMethod from '../../../../../../../../../utils/formValidation/createValidateMethod';
import styles from '../styles/ShippingForm.styles';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import ShipmentMethods from '../../../../../../common/molecules/ShipmentMethods';
import CheckoutFooter from '../../../../../molecules/CheckoutFooter';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import getStandardConfig from '../../../../../../../../../utils/formValidation/validatorStandardConfig';

const ShippingForm = ({
  addressLabels: { addressFormLabels },
  handleSubmit,
  className,
  dispatch,
  isOrderUpdateChecked,
  shippingLabels,
  smsSignUpLabels,
  selectedShipmentId,
  checkPOBoxAddress,
  addressPhoneNo,
  emailSignUpLabels,
  isGuest,
  isUsSite,
  orderHasPickUp,
  shipmentMethods,
}) => {
  return (
    <>
      <CheckoutSectionTitleDisplay title={shippingLabels.header} />
      <BodyCopy
        fontFamily="primary"
        fontSize="fs28"
        fontWeight="regular"
        data-locator="shipping-details"
        className="elem-mb-XS elem-mt-MED"
      >
        {shippingLabels.sectionHeader}
      </BodyCopy>
      <form name="checkoutShipping" className={className} onSubmit={handleSubmit}>
        <div className="address-form">
          <FormSection name="address">
            <AddressFields
              addressFormLabels={addressFormLabels}
              showDefaultCheckbox={false}
              formName="checkoutShipping"
              formSection="address"
              variation="secondary"
              dispatch={dispatch}
              checkPOBoxAddress={checkPOBoxAddress}
              addressPhoneNo={addressPhoneNo}
            />
          </FormSection>
        </div>
        {!orderHasPickUp && isUsSite && (
          <FormSection name="smsSignUp">
            <SMSFormFields
              labels={smsSignUpLabels}
              showDefaultCheckbox={false}
              formName="checkoutShipping"
              formSection="smsSignUp"
              variation="secondary"
              isOrderUpdateChecked={isOrderUpdateChecked}
              dispatch={dispatch}
              borderBottom
            />
          </FormSection>
        )}
        {!orderHasPickUp && isGuest && !isUsSite && (
          <FormSection name="emailSignUp">
            <div className="email-signup-container">
              <Field
                dataLocator="signUp-checkbox-field"
                name="sendEmailSignup"
                component={InputCheckbox}
                className="email-signup"
              >
                <BodyCopy
                  dataLocator="pickup-email-signUp-heading-lbl"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {emailSignUpLabels.emailSignupHeading}
                </BodyCopy>
              </Field>
              <div className="email-signup-text">
                <BodyCopy
                  dataLocator="pickup-email-signUp-sub-heading-text"
                  fontSize="fs12"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {emailSignUpLabels.emailSignupSubHeading}
                </BodyCopy>
                <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
                  {emailSignUpLabels.emailSignupSubSubHeading}
                </BodyCopy>
                <Anchor
                  noUnderline
                  anchorVariation="primary"
                  fontSizeVariation="small"
                  noLink
                  href="#"
                  target="_blank"
                  dataLocator="shipping-email-signUp-contact-anchor"
                >
                  {emailSignUpLabels.emailSignupContact}
                </Anchor>
              </div>
            </div>
          </FormSection>
        )}
        <FormSection name="shipmentMethods">
          <div className="shipment-methods-form">
            <ShipmentMethods
              shipmentMethods={shipmentMethods}
              formName="checkoutShipping"
              formSection="shipmentMethods"
              selectedShipmentId={selectedShipmentId}
              shipmentHeader={shippingLabels.shipmentHeader}
            />
          </div>
        </FormSection>
        <CheckoutFooter />
      </form>
    </>
  );
};

ShippingForm.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  shippingLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  selectedShipmentId: PropTypes.string,
  checkPOBoxAddress: PropTypes.func,
  addressPhoneNo: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  isUsSite: PropTypes.bool,
  orderHasPickUp: PropTypes.bool,
  shipmentMethods: PropTypes.shape([]),
};

ShippingForm.defaultProps = {
  className: '',
  isOrderUpdateChecked: false,
  selectedShipmentId: null,
  checkPOBoxAddress: () => {},
  addressPhoneNo: null,
  isGuest: true,
  isUsSite: true,
  orderHasPickUp: false,
  shipmentMethods: null,
};

const validateMethod = createValidateMethod({
  address: AddressFields.addressValidationConfig,
  smsSignUp: SMSFormFields.smsFormFieldsConfig,
  emailSignUp: getStandardConfig(['sendEmailSignup']),
});

export default reduxForm({
  form: 'checkoutShipping', // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(ShippingForm, styles));
export { ShippingForm as ShippingFormVanilla };
