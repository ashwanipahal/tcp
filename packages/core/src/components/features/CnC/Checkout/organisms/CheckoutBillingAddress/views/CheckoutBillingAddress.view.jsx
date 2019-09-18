import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection, change } from 'redux-form';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import { getLabelValue } from '../../../../../../../utils';
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

  getAddressFields = () => {
    const { addressLabels, dispatch, isGuest, formName } = this.props;
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
          className="elem-mb-LRG"
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
        <Heading
          component="h2"
          variant="listMenu"
          className="paymentMethodHeading elem-mt-MED elem-mb-LRG"
          dataLocator="billing-payment-billingAddress"
        >
          {getLabelValue(labels, 'lbl_billing_billingAddress', 'billing', 'checkout')}
        </Heading>
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
                {getLabelValue(labels, 'lbl_billing_sameAsShipping', 'billing', 'checkout')}
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
                  {getLabelValue(labels, 'lbl_billing_default_card', 'billing', 'checkout')}
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
        title: 'Add New Address',
        content: (
          <Button
            fullWidth
            buttonVariation="variable-width"
            fill="BLACK"
            onClick={this.toggleAddNewAddressMode}
            disabled={isAddNewAddress || !selectedAddress}
          >
            {getLabelValue(labels, 'lbl_billing_addNewAddress', 'billing', 'checkout')}
          </Button>
        ),
      });
    return addressOptions;
  };

  onAddressDropDownChange = () => {
    const { isAddNewAddress } = this.state;
    if (isAddNewAddress) {
      this.setState({ isAddNewAddress: !isAddNewAddress });
    }
  };

  getAddressDropDown = () => {
    const { userAddresses, selectedOnFileAddressId } = this.props;
    const selectedAddress = this.getSelectedAddress(userAddresses, selectedOnFileAddressId);
    return (
      userAddresses &&
      userAddresses.size > 0 && (
        <>
          <Row fullBleed>
            <Col colSize={{ large: 6, medium: 4, small: 6 }}>
              <Field
                selectListTitle="Select from address book"
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

  renderNonShippingAddressForm = () => {
    const { userAddresses } = this.props;
    const { isAddNewAddress } = this.state;
    return (
      <>
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
  isGuest: true,
  shippingAddress: {},
  isSameAsShippingChecked: true,
  className: '',
  userAddresses: null,
  selectedOnFileAddressId: null,
};
export default withStyles(CheckoutAddress, styles);
