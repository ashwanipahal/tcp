import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, reduxForm } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import SMSFormFields from '../../../../../../common/molecules/SMSFormFields';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import styles from '../styles/ShippingForm.styles';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../common/molecules/CheckoutSectionTitleDisplay';
import ShipmentMethods from '../../../../common/molecules/ShipmentMethods';

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
        <FormSection name="shipmentMethods">
          <ShipmentMethods
            shipmentMethods={[
              {
                id: '901101',
                displayName: 'Standard - FREE',
                shippingSpeed: 'Up To 10 Business Days',
                price: 0,
                isDefault: true,
              },
              {
                displayName: 'Express',
                isDefault: false,
                shippingSpeed: 'Up To 5 Business Days',
                id: '901102',
                price: 15,
              },
              {
                displayName: 'Rush',
                isDefault: false,
                shippingSpeed: 'Up To 3 Business Days',
                id: '901103',
                price: 20,
              },
            ]}
            formName="checkoutShipping"
            formSection="shipmentMethods"
            selectedShipmentId={selectedShipmentId}
          />
        </FormSection>
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
};

ShippingForm.defaultProps = {
  className: '',
  isOrderUpdateChecked: false,
  selectedShipmentId: null,
  checkPOBoxAddress: () => {},
  addressPhoneNo: null,
};

const validateMethod = createValidateMethod({
  address: AddressFields.addressValidationConfig,
  smsSignUp: SMSFormFields.smsFormFieldsConfig,
});

export default reduxForm({
  form: 'checkoutShipping', // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(ShippingForm, styles));
export { ShippingForm as ShippingFormVanilla };
