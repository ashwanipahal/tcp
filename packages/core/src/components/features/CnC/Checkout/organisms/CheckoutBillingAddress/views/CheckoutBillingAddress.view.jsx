import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection, change } from 'redux-form';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import { getLabelValue } from '../../../../../../../utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Address from '../../../../../../common/molecules/Address';
import Heading from '../../../../../../common/atoms/Heading';

const formName = 'checkoutBilling';

class CheckoutAddress extends React.Component {
  onSameAsShippingChange = () => {
    const { isSameAsShippingChecked, dispatch, shippingAddress } = this.props;
    const {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      state,
      city,
      zipCode,
      country,
    } = shippingAddress;
    if (isSameAsShippingChecked) {
      dispatch(change(formName, `address.firstName`, firstName));
      dispatch(change(formName, `address.lastName`, lastName));
      dispatch(change(formName, `address.addressLine1`, addressLine1));
      dispatch(change(formName, `address.addressLine2`, addressLine2));
      dispatch(change(formName, `address.state`, state));
      dispatch(change(formName, `address.city`, city));
      dispatch(change(formName, `address.zipCode`, zipCode));
      dispatch(change(formName, `address.country`, country));
    }
  };

  getAddressForm = () => {
    const { shippingAddress, isSameAsShippingChecked } = this.props;
    return isSameAsShippingChecked ? (
      <Address
        showCountry={false}
        showPhone={false}
        address={shippingAddress}
        className="address"
      />
    ) : (
      this.renderNonShippingAddressForm()
    );
  };

  renderShippingAddressForm = () => {
    const { labels } = this.props;
    return (
      <>
        <Heading
          component="h2"
          variant="listMenu"
          className="paymentMethodHeading elem-mt-XXL elem-mb-LRG"
          dataLocator="billing-payment-billingAddress"
        >
          {getLabelValue(labels, 'lbl_billing_billingAddress', 'billing', 'checkout')}
        </Heading>
        <Field
          showDefaultCheckbox={false}
          component={InputCheckbox}
          name="sameAsShipping"
          className="elem-mb-LRG"
          onChange={this.onSameAsShippingChange}
        >
          <BodyCopy fontSize="fs16" fontFamily="secondary">
            {getLabelValue(labels, 'lbl_billing_sameAsShipping', 'billing', 'checkout')}
          </BodyCopy>
        </Field>
        {this.getAddressForm()}
      </>
    );
  };

  renderNonShippingAddressForm = () => {
    const { dispatch, addressLabels, isGuest } = this.props;
    return (
      <FormSection name="address">
        <AddressFields
          addressFormLabels={addressLabels.addressFormLabels}
          showDefaultCheckbox={false}
          formName={formName}
          formSection="address"
          variation="primary"
          dispatch={dispatch}
          isGuest={isGuest}
          showPhoneNumber={false}
          grayTextBox
        />
      </FormSection>
    );
  };

  render() {
    const { orderHasShipping } = this.props;
    return orderHasShipping
      ? this.renderShippingAddressForm()
      : this.renderNonShippingAddressForm();
  }
}

CheckoutAddress.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orderHasShipping: PropTypes.bool,
  addressLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
  isSameAsShippingChecked: PropTypes.bool,
};

CheckoutAddress.defaultProps = {
  orderHasShipping: true,
  isGuest: true,
  shippingAddress: {},
  isSameAsShippingChecked: true,
};
export default CheckoutAddress;
