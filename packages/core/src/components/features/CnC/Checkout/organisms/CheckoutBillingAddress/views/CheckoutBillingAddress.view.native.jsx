import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection, change, resetSection } from 'redux-form';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Address from '../../../../../../common/molecules/Address';
import AddressDropdown from '../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import styles from '../styles/CheckoutBillingAddress.styles';
import withStyles from '../../../../../../common/hoc/withStyles';
import {
  BillingAddWrapper,
  SameAsShippingWrapper,
  CheckoutAddressWrapper,
  AddressDropdownWrapper,
} from '../styles/CheckoutBillingAddress.styles.native';
import { updateAddress, getSelectedAddress } from './CheckoutBillingAddress.util';

const dropDownStyle = {
  height: 30,
  borderBottomWidth: 1,
  marginTop: 25,
};
const itemStyle = {
  height: 90,
};

/**
 * @class CheckoutAddress
 * @extends {Component}
 * @description view component to render billing address component.
 */
class CheckoutAddress extends React.Component {
  constructor(props) {
    super(props);
    const {
      addNewCCState,
      selectedOnFileAddressId,
      userAddresses,
      orderHasShipping,
      editMode,
    } = props;
    this.state = {
      isAddNewAddress:
        editMode ||
        (addNewCCState &&
          !(
            selectedOnFileAddressId && getSelectedAddress(userAddresses, selectedOnFileAddressId)
          )) ||
        this.checkIfPickUp({ orderHasShipping, userAddresses, selectedOnFileAddressId }) ||
        false,
    };
  }

  checkIfPickUp = ({ orderHasShipping, userAddresses, selectedOnFileAddressId }) => {
    return !orderHasShipping && !getSelectedAddress(userAddresses, selectedOnFileAddressId);
  };

  /**
   * @function toggleAddNewAddressMode
   * @description toggles the isAddNewAddress state
   */
  toggleAddNewAddressMode = () => {
    const { dispatch, formName } = this.props;
    this.newAddressModeStarted = true;
    dispatch(change(formName, 'onFileAddressId', ''));
    dispatch(change(formName, `address.addressId`, ''));
    dispatch(resetSection(formName, 'address'));
    this.setState({ isAddNewAddress: true });
  };

  /**
   * @function onSameAsShippingChange
   * @description called when same as shipping checkbox is checked
   */
  onSameAsShippingChange = value => {
    const { shippingAddress, editMode, userAddresses, dispatch, formName } = this.props;
    if (value) {
      updateAddress(shippingAddress, editMode, dispatch, formName, true);
      this.SameAsShippingChange = true;
    } else if (editMode) {
      if (this.SameAsShippingChange) {
        const index = userAddresses.findIndex(
          val => val.primary && val.primary.toString() === 'true'
        );
        updateAddress(userAddresses.get(index), editMode, dispatch, formName, true);
      }
      this.setState({ isAddNewAddress: !this.SameAsShipping });
      this.SameAsShipping = true;
    }
  };

  /**
   * @function getAddressSection
   * @description checks if sameAsShipping is checked, if checked address is returned else returns form
   */
  getAddressSection = () => {
    const { shippingAddress, isSameAsShippingChecked } = this.props;
    return isSameAsShippingChecked ? (
      <Address showCountry={false} showPhone={false} address={shippingAddress} />
    ) : (
      this.renderNonShippingAddressForm()
    );
  };

  /**
   * @function getBillingAddressHeader
   * @description returns the billing header
   */
  getBillingAddressHeader = () => {
    const { labels } = this.props;
    return (
      <BillingAddWrapper>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          dataLocator="billing-payment-billingAddress"
          text={labels.billingAddress}
        />
      </BillingAddWrapper>
    );
  };

  /**
   * @function getAddressFields
   * @description returns the address fields section
   */
  getAddressFields = () => {
    const {
      addressLabels,
      dispatch,
      formName,
      userAddresses,
      onFileAddressId,
      shippingAddress,
      isSameAsShippingChecked,
      billingData,
      editMode,
    } = this.props;
    const selectedAddress = getSelectedAddress(userAddresses, onFileAddressId);
    const { isAddNewAddress } = this.state;
    let addressLine1;
    let state;
    let address;
    if (!isAddNewAddress || editMode) {
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

  /**
   * @function getAddressForm
   * @description returns the address form
   */
  getAddressForm = () => {
    const { isAddNewAddress } = this.state;
    return (
      <>
        {isAddNewAddress && this.getAddressDropDown()}
        {this.getAddressFields()}
      </>
    );
  };

  /**
   * @function renderShippingAddressForm
   * @description returns the address form
   */
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
            rightText={labels.sameAsShipping}
          />
        </SameAsShippingWrapper>
        {this.getAddressSection()}
      </>
    );
  };

  /**
   * @function getAddressOptions
   * @description returns the address dropdown options
   */
  getAddressOptions = () => {
    const {
      userAddresses,
      addressLabels: { addressFormLabels },
    } = this.props;
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
      label: addressFormLabels.addNewAddressSign,
      content: '',
      primary: false,
    });

    return addressOptions.valueSeq().toArray();
  };

  /**
   * @function onAddressDropDownChange
   * @description called when address dropdown value is changed
   */
  onAddressDropDownChange = addressId => {
    const { editMode, userAddresses, dispatch, formName } = this.props;
    if (this.newAddressModeStarted || !addressId) {
      this.newAddressModeStarted = false;
      return;
    }
    const { isAddNewAddress } = this.state;
    if (editMode) {
      const userAddress = userAddresses.find(
        address => addressId && addressId.toString() === address.addressId.toString()
      );
      updateAddress(userAddress, editMode, dispatch, formName, true);
    }
    if (isAddNewAddress) {
      this.setState({ isAddNewAddress: !isAddNewAddress });
    }
  };

  /**
   * @function onAddressDropDownChange
   * @description returns the address dropdown component
   */
  getAddressDropDown = () => {
    const {
      userAddresses,
      selectedOnFileAddressId,
      addressLabels: { addressFormLabels },
    } = this.props;
    const { isAddNewAddress } = this.state;
    const selectedAddress = getSelectedAddress(userAddresses, selectedOnFileAddressId);
    return (
      userAddresses &&
      userAddresses.size > 0 && (
        <>
          <AddressDropdownWrapper>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs12"
              textAlign="left"
              fontWeight="black"
              marginTop="10"
              text={addressFormLabels.selectFromAddress}
            />
            <Field
              selectedLabelState="Select from address book"
              name="onFileAddressId"
              id="onFileAddressId"
              component={AddressDropdown}
              data={this.getAddressOptions()}
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              addAddress={this.toggleAddNewAddressMode}
              onValueChange={itemValue => {
                this.onAddressDropDownChange(itemValue);
              }}
              variation="secondary"
              selectedValue={selectedOnFileAddressId}
              labels={{ common: { lbl_common_tapClose: 'close' } }}
              disableBtn={isAddNewAddress}
            />
          </AddressDropdownWrapper>
          {!isAddNewAddress && (
            <Address showCountry={false} showPhone={false} address={selectedAddress} />
          )}
        </>
      )
    );
  };

  /**
   * @function renderNonShippingAddressForm
   * @description returns the non shipping address form
   */
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

  /**
   * @function render
   * @description render method to be called of component
   */
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
  editMode: PropTypes.bool,
};

CheckoutAddress.defaultProps = {
  orderHasShipping: true,
  shippingAddress: {},
  isSameAsShippingChecked: true,
  userAddresses: null,
  selectedOnFileAddressId: null,
  onFileAddressId: null,
  billingData: null,
  editMode: false,
};
export default withStyles(CheckoutAddress, styles);
export { CheckoutAddress as CheckoutAddressVanilla };
