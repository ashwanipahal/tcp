import React from 'react';
import { View } from 'react-native';
import { Field, change, FormSection, resetSection } from 'redux-form';
import PropTypes from 'prop-types';
import AddressDropdown from '../../../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Address from '../../../../../../../../common/molecules/Address';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../../../common/atoms/Button';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import { getLabelValue } from '../../../../../../../../../utils';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import {
  AddressFieldsWrapper,
  SaveToAccountWrapper,
  MarginBottom,
  AddressViewWrapper,
  EditAddressFormHeader,
  EditFromSeparator,
} from '../styles/RegisteredShippingForm.view.style.native';
import {
  onSaveBtnClick,
  getDefaultShippingDisabledState,
  nativeDefaultPropTypes,
  nativePropTypes,
} from './RegisteredShippingForm.util';

const dropDownStyle = {
  height: 30,
  borderBottomWidth: 1,
  marginTop: 25,
};
const itemStyle = {
  height: 90,
};

const CustomAddress = {
  fontWeight: 'regular',
  fontSize: 'fs14',
};

const AddEditShippingAddress = ({
  addressFields,
  defaultOptions,
  modalType,
  actionButtons,
  labels,
}) => {
  return (
    <>
      <EditAddressFormHeader>
        <BodyCopy
          color="black"
          fontWeight="regular"
          fontFamily="primary"
          fontSize="fs28"
          text={
            modalType === 'add'
              ? getLabelValue(labels, 'lbl_shipping_addHeading', 'shipping', 'checkout')
              : getLabelValue(labels, 'lbl_shipping_editHeading', 'shipping', 'checkout')
          }
          textAlign="left"
        />
      </EditAddressFormHeader>
      {addressFields()}
      {defaultOptions()}
      {actionButtons()}
    </>
  );
};

AddEditShippingAddress.propTypes = {
  addressFields: PropTypes.func,
  defaultOptions: PropTypes.func,
  modalType: PropTypes.string,
  actionButtons: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
};

AddEditShippingAddress.defaultProps = {
  addressFields: () => {},
  defaultOptions: () => {},
  modalType: null,
  actionButtons: () => {},
};

class RegisteredShippingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      modalType: null,
    };
  }

  componentDidMount() {
    const { newUserPhoneNo, dispatch, formName, userAddresses } = this.props;
    if (userAddresses && userAddresses.size === 0) {
      dispatch(change(formName, 'address.phoneNumber', newUserPhoneNo));
      dispatch(change(formName, 'saveToAddressBook', true));
      dispatch(change(formName, 'defaultShipping', true));
    }
  }

  componentDidUpdate(prevProps) {
    const { defaultAddressId, dispatch, formName } = this.props;
    const { defaultAddressId: prevDefaultAddressId } = prevProps;
    const { modalState, modalType } = this.state;
    if (defaultAddressId && defaultAddressId !== prevDefaultAddressId && modalState) {
      if (modalType === 'add') {
        this.toggleAddressModal();
      } else if (modalType === 'edit') {
        this.toggleModal({ type: 'edit' });
      }
      dispatch(change(formName, 'onFileAddressKey', defaultAddressId));
    }
  }

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

  getSelectedAddress = () => {
    const { dispatch, formName, onFileAddressKey, userAddresses } = this.props;
    const defaultAddress = onFileAddressKey
      ? userAddresses && userAddresses.find(add => add.addressId === onFileAddressKey)
      : userAddresses && userAddresses.find(add => add.primary);
    dispatch(
      change(formName, 'onFileAddressKey', (defaultAddress && defaultAddress.addressId) || '')
    );
    return defaultAddress;
  };

  onEditClick = e => {
    const { dispatch, formName, userAddresses, onFileAddressKey } = this.props;
    e.preventDefault();
    let address = {};
    /* istanbul ignore next */
    if (userAddresses && userAddresses.size > 0) {
      if (onFileAddressKey) {
        address = userAddresses.find(add => add.addressId === onFileAddressKey);
      } else {
        address = userAddresses.find(add => add.primary === 'true');
      }
      if (!address) {
        address = userAddresses.get(0);
      }
      this.toggleModal({ type: 'edit' });
      const isDefaultAddress = address.primary === 'true';
      dispatch(change(formName, 'address.addressLine1', address.addressLine1));
      dispatch(change(formName, 'address.addressLine2', address.addressLine[1]));
      dispatch(change(formName, 'address.firstName', address.firstName));
      dispatch(change(formName, 'address.lastName', address.lastName));
      dispatch(change(formName, 'address.city', address.city));
      dispatch(change(formName, 'address.zipCode', address.zipCode));
      dispatch(change(formName, 'address.state', address.state));
      dispatch(change(formName, 'address.phoneNumber', address.phone1));
      dispatch(change(formName, 'defaultShipping', isDefaultAddress));
    }
  };

  toggleAddressModal = () => {
    const { dispatch, formName } = this.props;
    dispatch(resetSection(formName, 'address'));
    dispatch(change(formName, 'saveToAddressBook', true));
    dispatch(change(formName, 'defaultShipping', false));
    this.toggleModal({ type: 'add' });
  };

  toggleModal = ({ type }) => {
    const { modalState } = this.state;
    this.setState({ modalState: !modalState, modalType: type });
  };

  onAddressDropDownChange = itemValue => {
    const { dispatch, formName } = this.props;
    dispatch(change(formName, 'onFileAddressKey', itemValue));
  };

  onSaveToAccountChange = value => {
    const { isSaveToAddressBookChecked, formName, dispatch, userAddresses } = this.props;
    /* istanbul ignore next */
    if (dispatch) {
      dispatch(change(formName, 'saveToAddressBook', !isSaveToAddressBookChecked));
      /* istanbul ignore next */
      if ((userAddresses && userAddresses.size === 0) || !value) {
        dispatch(change(formName, 'defaultShipping', value));
      }
    }
  };

  showDefaultOptions = () => {
    const { userAddresses } = this.props;
    let showAddressBook = false;
    let showDefaultShipping = false;
    const { modalState, modalType } = this.state;
    if ((userAddresses && userAddresses.size === 0) || (modalState && modalType === 'add')) {
      showAddressBook = true;
      showDefaultShipping = true;
    }
    if (modalState && modalType === 'edit') {
      showDefaultShipping = true;
    }
    return {
      showDefaultShipping,
      showAddressBook,
    };
  };

  renderDefaultOptions = () => {
    const { showDefaultShipping, showAddressBook } = this.showDefaultOptions();
    const { labels, isSaveToAddressBookChecked, setAsDefaultShipping } = this.props;
    const defaultShippingDisabled = getDefaultShippingDisabledState({ ...this.props });
    return (
      <>
        {showAddressBook && (
          <SaveToAccountWrapper>
            <Field
              fontSize="fs16"
              rightText={getLabelValue(
                labels,
                'lbl_shipping_saveToAccount',
                'shipping',
                'checkout'
              )}
              showDefaultCheckbox={false}
              component={InputCheckbox}
              name="saveToAddressBook"
              onChange={this.onSaveToAccountChange}
              isChecked={isSaveToAddressBookChecked}
            />
          </SaveToAccountWrapper>
        )}
        {showDefaultShipping && (
          <MarginBottom>
            <Field
              showDefaultCheckbox={false}
              component={InputCheckbox}
              name="defaultShipping"
              disabled={defaultShippingDisabled}
              rightText={getLabelValue(
                labels,
                'lbl_shipping_defaultShipping',
                'shipping',
                'checkout'
              )}
              fontSize="fs16"
              isChecked={setAsDefaultShipping}
            />
          </MarginBottom>
        )}
      </>
    );
  };

  saveBtnClickHandler = () => {
    const { modalType, modalState } = this.state;
    const { updateShippingAddress, addNewShippingAddress } = this.props;
    onSaveBtnClick({
      updateShippingAddress,
      modalType,
      modalState,
      addNewShippingAddress,
    });
  };

  renderActionButtons = () => {
    const { labels } = this.props;
    const { modalType } = this.state;
    return (
      <>
        <MarginBottom>
          <Button
            fill="BLUE"
            type="button"
            buttonVariation="fixed-width"
            data-locator="edit-shipping-cancel-btn"
            onPress={this.saveBtnClickHandler}
            text={getLabelValue(labels, 'lbl_shipping_selectShipAdd', 'shipping', 'checkout')}
          />
        </MarginBottom>
        <Button
          fill="WHITE"
          type="button"
          buttonVariation="fixed-width"
          data-locator="edit-shipping-save-btn"
          onPress={() => this.toggleModal({ type: modalType })}
          text={getLabelValue(labels, 'lbl_shipping_cancelCaps', 'shipping', 'checkout')}
        />
      </>
    );
  };

  renderAddressForm = () => {
    const defaultAddress = this.getSelectedAddress();
    const { labels, onFileAddressKey } = this.props;
    const { modalState, modalType } = this.state;
    return (
      <>
        <View {...{ pointerEvents: modalState ? 'none' : 'auto' }}>
          <Field
            selectListTitle="Select from address book"
            name="onFileAddressKey"
            id="onFileAddressKey"
            component={AddressDropdown}
            dataLocator="shipping-address"
            data={this.getAddressOptions()}
            labels={{ common: { lbl_common_tapClose: 'close' } }}
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
            toggleModal={this.toggleAddressModal}
            onValueChange={itemValue => {
              this.onAddressDropDownChange(itemValue);
            }}
            variation="secondary"
            showButton={false}
            selectedValue={onFileAddressKey}
          />
        </View>

        {!modalState && (
          <AddressViewWrapper>
            <Address
              address={defaultAddress}
              showCountry={false}
              showPhone={false}
              showName
              dataLocatorPrefix="address"
              customStyle={CustomAddress}
              className="elem-mb-SM"
            />
            <Anchor
              underline
              anchorVariation="primary"
              fontSizeVariation="small"
              noLink
              href="#"
              target="_blank"
              dataLocator="shipping-edit-contact-anchor"
              text={getLabelValue(labels, 'lbl_shipping_edit', 'shipping', 'checkout')}
              onPress={this.onEditClick}
            />
          </AddressViewWrapper>
        )}
        {modalState && (
          <AddEditShippingAddress
            modalState={modalState}
            addressFields={this.renderAddressFields}
            defaultOptions={this.renderDefaultOptions}
            modalType={modalType}
            toggleAddEditModal={this.toggleModal}
            actionButtons={this.renderActionButtons}
            labels={labels}
          />
        )}
        {modalState && <EditFromSeparator />}
      </>
    );
  };

  renderAddressFields = () => {
    const {
      addressFormLabels,
      dispatch,
      addressPhoneNo,
      loadShipmentMethods,
      isGuest,
      address,
      userAddresses,
      onFileAddressKey,
    } = this.props;
    const { modalState, modalType } = this.state;
    let editedAddress = null;
    let addressLine1 = null;
    if (userAddresses && userAddresses.size > 0) {
      editedAddress = userAddresses.find(add => add.addressId === onFileAddressKey);
    }
    if (editedAddress) {
      [addressLine1] = editedAddress.addressLine;
    }
    return (
      <FormSection name="address">
        <AddressFieldsWrapper>
          <AddressFields
            addressFormLabels={addressFormLabels}
            showDefaultCheckbox={false}
            formName="checkoutShipping"
            formSection="address"
            dispatch={dispatch}
            addressPhoneNo={addressPhoneNo}
            loadShipmentMethods={loadShipmentMethods}
            disableCountry
            isGuest={isGuest}
            showEmailAddress
            state={address ? address.state : ''}
            initialValues={modalState && modalType === 'edit' ? { address: { addressLine1 } } : {}}
          />
        </AddressFieldsWrapper>
      </FormSection>
    );
  };

  render() {
    const { modalState } = this.state;
    const { userAddresses } = this.props;
    return (
      <>
        {userAddresses && userAddresses.size > 0
          ? this.renderAddressForm()
          : this.renderAddressFields()}
        {!modalState && this.renderDefaultOptions()}
      </>
    );
  }
}

RegisteredShippingForm.propTypes = nativePropTypes;
RegisteredShippingForm.defaultProps = nativeDefaultPropTypes;

export default RegisteredShippingForm;
