import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection, change } from 'redux-form';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Address from '../../../../../../common/molecules/Address';
import Heading from '../../../../../../common/atoms/Heading';
import Badge from '../../../../../../common/atoms/Badge';
import Button from '../../../../../../common/atoms/Button';
import AddressDropdown from '../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../styles/CheckoutBillingAddress.styles';
import withStyles from '../../../../../../common/hoc/withStyles';

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

  openAddNewAddressMode = () => {
    const { editMode, dispatch, formName } = this.props;
    this.newAddressModeStarted = true;
    if (editMode) {
      dispatch(change(formName, `address.addressId`, ''));
    }
    this.setState({ isAddNewAddress: true });
  };

  onSameAsShippingChange = (e, value) => {
    const { shippingAddress, editMode, userAddresses } = this.props;
    if (value) {
      const {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        state,
        city,
        zipCode,
        country,
        addressId,
      } = shippingAddress;
      let fieldsToUpdate = [];
      if (editMode) {
        fieldsToUpdate.push({ fieldName: `address.addressId`, value: addressId });
      }
      const fields = [
        { fieldName: `address.firstName`, value: firstName },
        { fieldName: `address.lastName`, value: lastName },
        { fieldName: `address.addressLine1`, value: addressLine1 },
        { fieldName: `address.addressLine2`, value: addressLine2 },
        { fieldName: `address.state`, value: state },
        { fieldName: `address.city`, value: city },
        { fieldName: `address.zipCode`, value: zipCode },
        { fieldName: `address.country`, value: country },
      ];
      fieldsToUpdate = [...fieldsToUpdate, ...fields];
      fieldsToUpdate.forEach(({ fieldName, value: fieldValue }) => {
        this.updateFormField(fieldName, fieldValue);
      });
    } else if (editMode) {
      const index = userAddresses.findIndex(
        val => val.primary && val.primary.toString() === 'true'
      );
      const {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        state,
        city,
        zipCode,
        country,
        addressId,
      } = userAddresses.get(index);
      const fields = [
        { fieldName: `onFileAddressId`, value: addressId },
        { fieldName: `address.addressId`, value: addressId },
        { fieldName: `address.firstName`, value: firstName },
        { fieldName: `address.lastName`, value: lastName },
        { fieldName: `address.addressLine1`, value: addressLine1 },
        { fieldName: `address.addressLine2`, value: addressLine2 },
        { fieldName: `address.state`, value: state },
        { fieldName: `address.city`, value: city },
        { fieldName: `address.zipCode`, value: zipCode },
        { fieldName: `address.country`, value: country },
      ];
      fields.forEach(({ fieldName, value: fieldValue }) => {
        this.updateFormField(fieldName, fieldValue);
      });
      this.setState({ isAddNewAddress: false });
    }
  };

  getAddressSection = () => {
    const { shippingAddress, isSameAsShippingChecked } = this.props;
    return isSameAsShippingChecked ? (
      <Address
        showCountry={false}
        showPhone={false}
        address={shippingAddress}
        className="address elem-mb-XXXL"
      />
    ) : (
      this.renderNonShippingAddressForm()
    );
  };

  getBillingAddressHeader = () => {
    const { labels } = this.props;
    return (
      <Heading
        component="h2"
        variant="listMenu"
        className="paymentMethodHeading elem-mt-MED elem-mb-LRG"
        dataLocator="billing-payment-billingAddress"
      >
        {labels.billingAddress}
      </Heading>
    );
  };

  getAddressFields = () => {
    const { addressLabels, dispatch, isGuest, formName, editMode } = this.props;
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
          className={`${!editMode ? 'elem-mb-LRG' : ''}`}
        />
      </FormSection>
    );
  };

  getAddressForm = () => {
    const { isAddNewAddress } = this.state;
    return (
      <>
        {isAddNewAddress && this.getAddressDropDown()}
        {this.getAddressFields('from getAddressForm')}
      </>
    );
  };

  renderShippingAddressForm = () => {
    const { labels } = this.props;
    return (
      <>
        {this.getBillingAddressHeader()}
        <Row fullBleed>
          <Col colSize={{ large: 6, medium: 5, small: 6 }}>
            <Field
              showDefaultCheckbox={false}
              component={InputCheckbox}
              name="sameAsShipping"
              className="elem-mb-LRG"
              onChange={this.onSameAsShippingChange}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                {labels.sameAsShipping}
              </BodyCopy>
            </Field>
          </Col>
        </Row>
        {this.getAddressSection()}
      </>
    );
  };

  getAddressOptions = ({ selectedAddress }) => {
    const { userAddresses, labels } = this.props;
    const { isAddNewAddress } = this.state;
    let addressOptions =
      userAddresses &&
      userAddresses.map(address => {
        let defaultId = false;
        if (address.primary === 'true') {
          defaultId = true;
        }
        return {
          value: address.addressId,
          title: `${address.firstName} ${address.lastName} ${defaultId ? '(Default)' : ''}`,
          content: (
            <div className="address-wrapper">
              <Address
                showCountry={false}
                showPhone={false}
                address={address}
                isDefault={defaultId}
                className="address"
                showDefault={false}
              />
              {address.primary === 'true' && (
                <Badge
                  showCheckmark
                  dataLocator="shipping-defshippinglabel"
                  className="default-badge"
                >
                  {labels.defaultCard}
                </Badge>
              )}
            </div>
          ),
        };
      });

    addressOptions =
      addressOptions &&
      addressOptions.push({
        value: '',
        title: labels.addNewAddress,
        content: (
          <Button
            fullWidth
            buttonVariation="variable-width"
            fill="BLACK"
            onClick={this.openAddNewAddressMode}
            disabled={isAddNewAddress || !selectedAddress}
          >
            {labels.addNewAddress}
          </Button>
        ),
      });
    return addressOptions;
  };

  onAddressDropDownChange = addressId => {
    const { isAddNewAddress } = this.state;
    const { editMode, userAddresses, dispatch, formName } = this.props;
    if (this.newAddressModeStarted) {
      this.newAddressModeStarted = false;
      return;
    }
    if (editMode) {
      const {
        addressLine: [addressLine1, addressLine2],
        firstName,
        lastName,
        state,
        city,
        zipCode,
        country,
      } = userAddresses.find(address => addressId.toString() === address.addressId.toString());
      dispatch(change(formName, `address.addressId`, addressId));
      dispatch(change(formName, `address.firstName`, firstName));
      dispatch(change(formName, `address.lastName`, lastName));
      dispatch(change(formName, `address.addressLine1`, addressLine1));
      dispatch(change(formName, `address.addressLine2`, addressLine2));
      dispatch(change(formName, `address.state`, state));
      dispatch(change(formName, `address.city`, city));
      dispatch(change(formName, `address.zipCode`, zipCode));
      dispatch(change(formName, `address.country`, country));
    }
    if (isAddNewAddress) {
      this.setState({ isAddNewAddress: !isAddNewAddress });
    }
  };

  getAddressDropDown = () => {
    const {
      userAddresses,
      selectedOnFileAddressId,
      addressLabels: { addressFormLabels },
    } = this.props;
    const selectedAddress = this.getSelectedAddress(userAddresses, selectedOnFileAddressId);
    return (
      userAddresses &&
      userAddresses.size > 0 && (
        <>
          <Row fullBleed>
            <Col colSize={{ large: 6, medium: 4, small: 6 }}>
              <Field
                selectListTitle={addressFormLabels.selectFromAddress}
                name="onFileAddressId"
                id="onFileAddressId"
                component={AddressDropdown}
                dataLocator="shipping-address"
                options={this.getAddressOptions({ selectedAddress })}
                onChange={this.onAddressDropDownChange}
                customSelectClassName="billing-address-dropDown"
              />
            </Col>
          </Row>

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

  updateFormField(fieldName, value) {
    const { dispatch, formName } = this.props;
    dispatch(change(formName, fieldName, value));
  }

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
    const { orderHasShipping, className } = this.props;
    return (
      <div className={className}>
        {orderHasShipping ? this.renderShippingAddressForm() : this.renderNonShippingAddressForm()}
      </div>
    );
  }
}

CheckoutAddress.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orderHasShipping: PropTypes.bool,
  addressLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  editMode: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
  isSameAsShippingChecked: PropTypes.bool,
  className: PropTypes.bool,
  userAddresses: PropTypes.shape({}),
  selectedOnFileAddressId: PropTypes.string,
  formName: PropTypes.string.isRequired,
  addNewCCState: PropTypes.bool.isRequired,
};

CheckoutAddress.defaultProps = {
  orderHasShipping: true,
  editMode: false,
  isGuest: true,
  shippingAddress: {},
  isSameAsShippingChecked: true,
  className: '',
  userAddresses: null,
  selectedOnFileAddressId: null,
};
export default withStyles(CheckoutAddress, styles);
export { CheckoutAddress as CheckoutAddressVanilla };
