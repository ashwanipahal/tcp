import React from 'react';
import { FormSection, Field, change } from 'redux-form';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/RegisteredShippingForm.view.style';
import AddressDropdown from '../../../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Address from '../../../../../../../../common/molecules/Address';
import Button from '../../../../../../../../common/atoms/Button';
import { getLabelValue } from '../../../../../../../../../utils';
import ErrorMessage from '../../../../../../common/molecules/ErrorMessage';
import {
  getSelectedAddress,
  getDefaultShippingDisabledState,
  onSaveBtnClick,
  getShowAddressFields,
  propTypes,
  defaultProps,
  setDefaultShippingValue,
} from './RegisteredShippingForm.util';
import Badge from '../../../../../../../../common/atoms/Badge';

const formName = 'checkoutShipping';
class RegisteredShippingForm extends React.Component {
  componentDidMount() {
    const {
      newUserPhoneNo,
      dispatch,
      shippingAddressId,
      shippingAddress,
      userAddresses,
    } = this.props;
    if (!shippingAddress && userAddresses && userAddresses.size === 0) {
      dispatch(change(formName, 'address.phoneNumber', newUserPhoneNo));
    }
    if (shippingAddress && shippingAddressId) {
      dispatch(change(formName, 'onFileAddressKey', shippingAddressId));
    }
    if (userAddresses && userAddresses.size > 0 && !shippingAddress) {
      const defaultAddress = userAddresses.find(address => address.primary === 'true');
      this.setDefaultAddress({ defaultAddress });
    }
    setDefaultShippingValue({ userAddresses, dispatch, change, formName });
  }

  setDefaultAddress = ({ defaultAddress }) => {
    const { dispatch, userAddresses, defaultAddressId, setDefaultAddressId } = this.props;
    if (defaultAddress) {
      dispatch(change(formName, 'onFileAddressKey', defaultAddress.addressId));
    }
    if (!defaultAddress) {
      dispatch(change(formName, 'onFileAddressKey', userAddresses.get(0).addressId));
    }
    if (defaultAddress && !defaultAddressId) {
      setDefaultAddressId(defaultAddress.addressId);
    }
  };

  getAddressOptions = () => {
    const { userAddresses, labels, isAddNewAddress } = this.props;
    let addressOptions = userAddresses.map(address => {
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
                {getLabelValue(labels, 'lbl_shipping_default', 'shipping', 'checkout')}
              </Badge>
            )}
          </div>
        ),
      };
    });

    addressOptions = addressOptions.push({
      value: '',
      title: 'Add New Address',
      content: (
        <Button
          fullWidth
          buttonVariation="variable-width"
          fill="BLACK"
          onClick={this.toggleAddNewAddressMode}
          disabled={isAddNewAddress}
          dataLocator="new-addressbtn"
        >
          {getLabelValue(labels, 'lbl_shipping_addNewAddress', 'shipping', 'checkout')}
        </Button>
      ),
    });
    return addressOptions;
  };

  toggleEditingMode = e => {
    const { toggleIsEditing } = this.props;
    e.preventDefault();
    return toggleIsEditing();
  };

  toggleAddNewAddressMode = () => {
    const { dispatch, toggleAddNewAddress } = this.props;
    dispatch(change(formName, 'defaultShipping', false));
    return toggleAddNewAddress();
  };

  onAddressDropDownChange = value => {
    const { onFileAddressKey, dispatch } = this.props;
    if (onFileAddressKey === '' && value !== '') {
      this.toggleAddNewAddressMode();
    } else if (!onFileAddressKey) {
      dispatch(change(formName, 'onFileAddressKey', value));
      this.toggleAddNewAddressMode();
    }
  };

  renderAddressFields = () => {
    const {
      addressLabels: { addressFormLabels },
      dispatch,
      addressPhoneNo,
      loadShipmentMethods,
      isGuest,
      handleShipIntClick,
    } = this.props;
    const showAddressFields = getShowAddressFields({ ...this.props });
    return (
      showAddressFields && (
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="address-form">
            <FormSection name="address">
              <AddressFields
                handleShipIntClick={handleShipIntClick}
                addressFormLabels={addressFormLabels}
                showDefaultCheckbox={false}
                formName={formName}
                formSection="address"
                variation="secondary"
                dispatch={dispatch}
                addressPhoneNo={addressPhoneNo}
                loadShipmentMethods={loadShipmentMethods}
                isGuest={isGuest}
              />
            </FormSection>
          </div>
        </Col>
      )
    );
  };

  renderDefaultAddress = () => {
    const {
      onFileAddressKey,
      userAddresses,
      isEditing,
      labels,
      shippingAddressId,
      isAddNewAddress,
    } = this.props;
    return (
      <Row fullBleed>
        {!isEditing && !isAddNewAddress && (
          <Col colSize={{ small: 5, medium: 4, large: 4 }}>
            <Address
              address={getSelectedAddress(userAddresses, onFileAddressKey, shippingAddressId)}
              showPhone
              className="shipping__address"
              dataLocatorPrefix="shipping"
              parentDataLocator="shipping-details"
            />
          </Col>
        )}
        {this.renderAddressFields()}
        {!isEditing && !isAddNewAddress && (
          <Col colSize={{ small: 1, medium: 1, large: 1 }} className="hide-on-desktop">
            <Anchor
              fontSizeVariation="xlarge"
              underline
              noLink
              anchorVariation="primary"
              dataLocator="edit-shipping-address"
              onClick={this.toggleEditingMode}
            >
              {getLabelValue(labels, 'lbl_shipping_edit', 'shipping', 'checkout')}
            </Anchor>
          </Col>
        )}
      </Row>
    );
  };

  renderAddressForm = () => {
    const { userAddresses, isEditing, isAddNewAddress, labels } = this.props;
    const showEditLink = !isEditing && !isAddNewAddress;
    return userAddresses && userAddresses.size > 0 ? (
      <>
        <Row fullBleed>
          <Col
            colSize={{ small: 6, medium: 8, large: 6 }}
            className="address-dropDown"
            isEditing={isEditing}
            data-locator="address-dropdown"
          >
            <Field
              selectListTitle="Select from address book"
              name="onFileAddressKey"
              id="onFileAddressKey"
              component={AddressDropdown}
              options={this.getAddressOptions()}
              onChange={this.onAddressDropDownChange}
              dataLocatorObj={{
                heading: 'address-book-txt',
                dropDownList: 'shipping-details-lst',
              }}
            />
          </Col>
        </Row>

        <Row fullBleed className="hide-on-mobile">
          <Col colSize={{ small: 6 }} className="shipping-section-header">
            <BodyCopy
              fontFamily="primary"
              fontSize="fs28"
              fontWeight="regular"
              data-locator="shipping-details"
              className="elem-mb-XS"
            >
              {getLabelValue(labels, 'lbl_shipping_sectionHeader', 'shipping', 'checkout')}
            </BodyCopy>
          </Col>
          {showEditLink && (
            <Col colSize={{ small: 1, medium: 1, large: 1 }} className="edit-link-placement">
              <Anchor
                fontSizeVariation="xlarge"
                underline
                noLink
                anchorVariation="primary"
                dataLocator="edit-shipping-address"
                onClick={this.toggleEditingMode}
              >
                {getLabelValue(labels, 'lbl_shipping_edit', 'shipping', 'checkout')}
              </Anchor>
            </Col>
          )}
        </Row>
        {this.renderDefaultAddress()}
      </>
    ) : (
      this.renderAddressFields()
    );
  };

  onSaveToAccountChange = (e, value) => {
    const { dispatch, userAddresses } = this.props;
    if ((userAddresses && userAddresses.size === 0) || !value) {
      dispatch(change(formName, 'defaultShipping', value));
    }
  };

  renderDefaultOptions = () => {
    const { isAddNewAddress, userAddresses, isEditing, labels } = this.props;
    const showSaveToAddressBook = isAddNewAddress || (userAddresses && userAddresses.size === 0);
    const showDefaultShipping = showSaveToAddressBook || isEditing;
    const defaultShippingDisabled = getDefaultShippingDisabledState({
      ...this.props,
    });
    return (
      <Row fullBleed>
        {showSaveToAddressBook && (
          <Col colSize={{ small: 6, medium: 8, large: 12 }} className="elem-mb-LRG">
            <Field
              showDefaultCheckbox={false}
              component={InputCheckbox}
              name="saveToAddressBook"
              onChange={this.onSaveToAccountChange}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary" dataLocator="saveaddress-chk">
                {getLabelValue(labels, 'lbl_shipping_saveToAccount', 'shipping', 'checkout')}
              </BodyCopy>
            </Field>
          </Col>
        )}
        {showDefaultShipping && (
          <Col
            colSize={{ small: 6, medium: 8, large: 12 }}
            className="default-shipping"
            isEditing={isEditing}
          >
            <Field
              showDefaultCheckbox={false}
              component={InputCheckbox}
              name="defaultShipping"
              disabled={defaultShippingDisabled}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary" dataLocator="shippingDefault-chk">
                {getLabelValue(labels, 'lbl_shipping_defaultShipping', 'shipping', 'checkout')}
              </BodyCopy>
            </Field>
          </Col>
        )}
      </Row>
    );
  };

  saveBtnClickHandler = () => {
    onSaveBtnClick({
      ...this.props,
    });
  };

  renderActionButtons = (errorMessageRef, editShipmentDetailsError) => {
    const { labels } = this.props;
    return (
      <div ref={errorMessageRef}>
        {editShipmentDetailsError && (
          <ErrorMessage error={editShipmentDetailsError} className="edit-shipping-error" />
        )}
        <Row fullBleed className="elem-mt-XL edit-cta">
          <Col colSize={{ small: 6, medium: 4, large: 3 }} className="save-cancel-btn">
            <Button
              fill="WHITE"
              type="button"
              buttonVariation="fixed-width"
              data-locator="edit-shipping-cancel-btn"
              className="cancel-btn"
              onClick={this.toggleEditingMode}
            >
              {getLabelValue(labels, 'lbl_shipping_cancel', 'shipping', 'checkout')}
            </Button>
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 3 }} className="save-cancel-btn">
            <Button
              type="button"
              buttonVariation="fixed-width"
              data-locator="edit-shipping-save-btn"
              className="save-btn"
              onClick={this.saveBtnClickHandler}
            >
              {getLabelValue(labels, 'lbl_shipping_save', 'shipping', 'checkout')}
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { isEditing, className, errorMessageRef, editShipmentDetailsError } = this.props;
    return (
      <div className={className} isEditing={isEditing} data-locator="shipping-details">
        <>
          {this.renderAddressForm()}
          {this.renderDefaultOptions()}
          {isEditing && this.renderActionButtons(errorMessageRef, editShipmentDetailsError)}
        </>
      </div>
    );
  }
}

RegisteredShippingForm.propTypes = propTypes;
RegisteredShippingForm.defaultProps = defaultProps;

export default withStyles(RegisteredShippingForm, styles);
export { RegisteredShippingForm as RegisteredShippingFormVanilla };
