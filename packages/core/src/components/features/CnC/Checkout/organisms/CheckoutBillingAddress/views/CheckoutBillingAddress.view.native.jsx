import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection, change } from 'redux-form';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import { getLabelValue } from '../../../../../../../utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Address from '../../../../../../common/molecules/Address';
import AddressDropdown from '../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import styles from '../styles/CheckoutBillingAddress.styles';
import withStyles from '../../../../../../common/hoc/withStyles';
import { BillingAddWrapper, SameAsShippingWrapper, CheckoutAddressWrapper } from '../styles/CheckoutBillingAddress.styles.native'

const dropDownStyle = {
  height: 30,
  borderBottomWidth: 1,
  marginTop: 25,
};
const itemStyle = {
  height: 90,
};

class CheckoutAddress extends React.Component {
  constructor(props) {
    super(props);
    const { addNewCCState, selectedOnFileAddressId, userAddresses, orderHasShipping } = props;
    this.state = {
      isAddNewAddress:
        (addNewCCState &&
          !(
            selectedOnFileAddressId &&
            this.getSelectedAddress(userAddresses, selectedOnFileAddressId)
          )) ||
        (!orderHasShipping && !this.getSelectedAddress(userAddresses, selectedOnFileAddressId)) ||
        false,
    };
  }

  getSelectedAddress = (addressList, onFileAddressId) => {
    let selectedAddress = null;
    if (onFileAddressId) {
      selectedAddress = addressList.find(add => add.addressId === onFileAddressId);
    }
    return selectedAddress;
  };

  toggleAddNewAddressMode = () => {
    const { isAddNewAddress } = this.state;
    this.setState({ isAddNewAddress: !isAddNewAddress });
  };

  onSameAsShippingChange = () => {
    const { isSameAsShippingChecked, dispatch, shippingAddress, formName } = this.props;
    if (shippingAddress) {
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
    }
  };

  getAddressSection = () => {
    const { shippingAddress, isSameAsShippingChecked } = this.props;
    return isSameAsShippingChecked ? (
      <Address
        showCountry={false}
        showPhone={false}
        address={shippingAddress}
      />
    ) : (
        this.renderNonShippingAddressForm()
      );
  };

  getBillingAddressHeader = () => {
    const { labels } = this.props;
    return (
      <BillingAddWrapper>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          dataLocator="billing-payment-billingAddress"
          text={getLabelValue(labels, 'lbl_billing_billingAddress', 'billing', 'checkout')}
        />
      </BillingAddWrapper>
    )
  }

  getAddressFields = () => {
    const { addressLabels, dispatch, formName, userAddresses, onFileAddressId, shippingAddress, isSameAsShippingChecked, billingData } = this.props;
    const selectedAddress = this.getSelectedAddress(userAddresses, onFileAddressId)
    let addressLine1; let state; let address;
    if (selectedAddress) {
      [addressLine1] = selectedAddress.addressLine;
      ({ state } = selectedAddress);
    }
    if (shippingAddress && !isSameAsShippingChecked) {
      ({ addressLine1 } = shippingAddress);
      ({ state } = shippingAddress);
    }
    if (billingData && billingData.address) {
      ({ address } = billingData);
      ({ state, addressLine1 } = address);
    }
    return (
      <FormSection name="address">
        <AddressFields
          addressFormLabels={addressLabels.addressFormLabels}
          showDefaultCheckbox={false}
          formName={formName}
          formSection="address"
          variation="primary"
          dispatch={dispatch}
          showPhoneNumber={false}
          className="elem-mb-LRG"
          state={state}
          initialValues={{ address: { addressLine1 } }}
          showEmailAddress={false}
        />
      </FormSection>
    );
  };

  getAddressForm = () => {
    const { isAddNewAddress } = this.state;
    return (
      <>
        {isAddNewAddress && this.getAddressDropDown()}
        {this.getAddressFields()}
      </>
    );
  };

  renderShippingAddressForm = () => {
    const { labels } = this.props;
    return (
      <>
        {this.getBillingAddressHeader()}
        <SameAsShippingWrapper>
          <Field
            showDefaultCheckbox={false}
            component={InputCheckbox}
            name="sameAsShipping"
            fontSize="fs16"
            onChange={this.onSameAsShippingChange}
            rightText={getLabelValue(labels, 'lbl_billing_sameAsShipping', 'billing', 'checkout')}
          />
        </SameAsShippingWrapper>
        {this.getAddressSection()}
      </>
    );
  };

  getAddressOptions = () => {
    const { userAddresses } = this.props;
    let addressOptions =
      (userAddresses &&
        userAddresses.map(address => {
          return {
            id: address.addressId,
            label: `${address.firstName} ${address.lastName} ${
              address.primary === 'true' ? '(Default)' : ''
              }`,
            content: address,
            primary: address.primary === 'true',
          };
        })) ||
      [];

    addressOptions = addressOptions.push({
      id: '',
      label: '+Add New Address',
      content: '',
      primary: false,
    });

    return addressOptions.valueSeq().toArray();
  };

  onAddressDropDownChange = itemValue => {
    const { isAddNewAddress } = this.state;
    const { dispatch, formName } = this.props;
    if (isAddNewAddress) {
      this.setState({ isAddNewAddress: !isAddNewAddress });
    }
    dispatch(change(formName, 'onFileAddressId', itemValue));
  };

  getAddressDropDown = () => {
    const { userAddresses, selectedOnFileAddressId } = this.props;
    const selectedAddress = this.getSelectedAddress(userAddresses, selectedOnFileAddressId);
    return (
      userAddresses &&
      userAddresses.size > 0 && (
        <>
          <Field
            selectListTitle="Select from address book"
            name="onFileAddressId"
            id="onFileAddressId"
            component={AddressDropdown}
            data={this.getAddressOptions()}
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
            toggleModal={this.toggleAddressModal}
            onValueChange={itemValue => {
              this.onAddressDropDownChange(itemValue);
            }}
            variation="secondary"
            selectedValue={selectedOnFileAddressId}
            labels={{ common: { lbl_common_tapClose: 'close' } }}
          />

          <Address
            showCountry={false}
            showPhone={false}
            address={selectedAddress}
            className="address elem-mb-XXXL"
          />
        </>
      )
    );
  };

  renderNonShippingAddressForm = () => {
    const { userAddresses, orderHasShipping } = this.props;
    const { isAddNewAddress } = this.state;
    return (
      <>
        {!orderHasShipping && this.getBillingAddressHeader()}
        {(userAddresses && userAddresses.size === 0) || isAddNewAddress || !userAddresses
          ? this.getAddressForm()
          : this.getAddressDropDown()}
      </>
    );
  };

  render() {
    const { orderHasShipping } = this.props;
    return (
      <CheckoutAddressWrapper>
        {orderHasShipping ? this.renderShippingAddressForm() : this.renderNonShippingAddressForm()}
      </CheckoutAddressWrapper>
    );
  }
}

CheckoutAddress.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orderHasShipping: PropTypes.bool,
  addressLabels: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
  isSameAsShippingChecked: PropTypes.bool,
  userAddresses: PropTypes.shape({}),
  selectedOnFileAddressId: PropTypes.string,
  formName: PropTypes.string.isRequired,
  addNewCCState: PropTypes.bool.isRequired,
  onFileAddressId: PropTypes.string,
  billingData: PropTypes.shape({}),
};

CheckoutAddress.defaultProps = {
  orderHasShipping: true,
  shippingAddress: {},
  isSameAsShippingChecked: true,
  userAddresses: null,
  selectedOnFileAddressId: null,
  onFileAddressId: null,
  billingData: null,
};
export default withStyles(CheckoutAddress, styles);
export { CheckoutAddress as CheckoutAddressVanilla };
