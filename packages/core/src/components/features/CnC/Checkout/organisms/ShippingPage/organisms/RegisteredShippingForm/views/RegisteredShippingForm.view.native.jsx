import React from 'react';
import { View } from 'react-native';
import { Field, change, FormSection } from 'redux-form';
import AddressDropdown from '../../../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Address from '../../../../../../../../common/molecules/Address';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import Button from '../../../../../../../../common/atoms/Button';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import ErrorMessage from '../../../../../../../../common/atoms/ErrorDisplay';
import { getLabelValue } from '../../../../../../../../../utils';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import {
  AddressFieldsWrapper,
  SaveToAccountWrapper,
  MarginBottom,
  AddressViewWrapper,
  EditFromSeparator,
  ErrorMessageWrapper,
} from '../styles/RegisteredShippingForm.view.style.native';
import {
  onSaveBtnClick,
  getDefaultShippingDisabledState,
  nativeDefaultPropTypes,
  nativePropTypes,
} from './RegisteredShippingForm.util';
import AddEditShippingAddress from './RegisteredShippingForm.view.native.util';

const saveToAddressBookConst = 'saveToAddressBook';
const addressPhoneNumber = 'address.phoneNumber';
const defaultShippingConst = 'defaultShipping';
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
      dispatch(change(formName, addressPhoneNumber, newUserPhoneNo));
      dispatch(change(formName, saveToAddressBookConst, true));
      dispatch(change(formName, defaultShippingConst, true));
    }
  }

  componentDidUpdate(prevProps) {
    const { defaultAddressId, dispatch, formName, setEditModalRef } = this.props;
    const { defaultAddressId: prevDefaultAddressId } = prevProps;
    const { modalState, modalType } = this.state;
    if (defaultAddressId && defaultAddressId !== prevDefaultAddressId && modalState) {
      if (modalType === 'edit') {
        this.toggleModal({ type: 'edit', open: false });
      }
      dispatch(change(formName, 'onFileAddressKey', defaultAddressId));
    }
    if (modalState) {
      setEditModalRef(this.editModalRef);
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
    const { modalState, modalType } = this.state;
    const defaultAddress = onFileAddressKey
      ? userAddresses && userAddresses.find(add => add.addressId === onFileAddressKey)
      : userAddresses && userAddresses.find(add => add.primary);
    if (!onFileAddressKey && !(modalState && modalType === 'add')) {
      dispatch(
        change(formName, 'onFileAddressKey', (defaultAddress && defaultAddress.addressId) || '')
      );
    }
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
      this.toggleModal({ type: 'edit', open: true });
      const isDefaultAddress = address.primary === 'true';
      dispatch(change(formName, 'address.addressLine1', address.addressLine1));
      dispatch(change(formName, 'address.addressLine2', address.addressLine[1]));
      dispatch(change(formName, 'address.firstName', address.firstName));
      dispatch(change(formName, 'address.lastName', address.lastName));
      dispatch(change(formName, 'address.city', address.city));
      dispatch(change(formName, 'address.zipCode', address.zipCode));
      dispatch(change(formName, 'address.state', address.state));
      dispatch(change(formName, addressPhoneNumber, address.phone1));
      dispatch(change(formName, defaultShippingConst, isDefaultAddress));
    }
  };

  toggleModal = ({ type, open }) => {
    const { setEditState } = this.props;
    this.setState({ modalState: open, modalType: type });
    setEditState(open);
  };

  onAddressDropDownChange = itemValue => {
    const { dispatch, formName } = this.props;
    dispatch(change(formName, 'onFileAddressKey', itemValue));
    if (!itemValue) {
      const fields = [
        { field: saveToAddressBookConst, val: true },
        { field: defaultShippingConst, val: false },
        { field: 'address.addressLine1', val: '' },
        { field: 'address.addressLine2', val: '' },
        { field: 'address.firstName', val: '' },
        { field: 'address.lastName', val: '' },
        { field: 'address.city', val: '' },
        { field: 'address.zipCode', val: '' },
        { field: 'address.state', val: '' },
        { field: addressPhoneNumber, val: '' },
      ];
      fields.forEach(({ field, val }) => {
        dispatch(change(formName, field, val));
      });
      this.toggleModal({ type: 'add', open: true });
    } else {
      this.toggleModal({ open: false });
    }
  };

  onSaveToAccountChange = value => {
    const { isSaveToAddressBookChecked, formName, dispatch, userAddresses } = this.props;
    /* istanbul ignore next */
    if (dispatch) {
      dispatch(change(formName, saveToAddressBookConst, !isSaveToAddressBookChecked));
      /* istanbul ignore next */
      if ((userAddresses && userAddresses.size === 0) || !value) {
        dispatch(change(formName, defaultShippingConst, value));
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
              name={saveToAddressBookConst}
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
              name={defaultShippingConst}
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
    const { labels, editShipmentDetailsError } = this.props;
    const { modalType } = this.state;
    return (
      <View
        ref={errorBtnRef => {
          this.editModalRef = errorBtnRef;
        }}
      >
        {editShipmentDetailsError ? (
          <ErrorMessageWrapper>
            <ErrorMessage error={editShipmentDetailsError} />
          </ErrorMessageWrapper>
        ) : null}
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
          onPress={() => this.toggleModal({ type: modalType, open: false })}
          text={getLabelValue(labels, 'lbl_shipping_cancelCaps', 'shipping', 'checkout')}
        />
      </View>
    );
  };

  renderAddressForm = () => {
    const { labels, onFileAddressKey } = this.props;
    const { modalState, modalType } = this.state;
    const editModalState = modalState && modalType === 'edit';
    const defaultAddress = this.getSelectedAddress();
    return (
      <>
        <View {...{ pointerEvents: editModalState ? 'none' : 'auto' }}>
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
        {editModalState && (
          <AddEditShippingAddress
            {...{ modalState, modalType, labels }}
            addressFields={this.renderAddressFields}
            defaultOptions={this.renderDefaultOptions}
            actionButtons={this.renderActionButtons}
          />
        )}
        {editModalState && <EditFromSeparator />}
      </>
    );
  };

  renderAddressFields = () => {
    const { loadShipmentMethods, isGuest, address, userAddresses, onFileAddressKey } = this.props;
    const { addressFormLabels, dispatch, addressPhoneNo } = this.props;
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
    const { modalState, modalType } = this.state;
    const { userAddresses } = this.props;
    const userAddressesPresent = userAddresses && userAddresses.size > 0;
    const isAddModal = modalType === 'add' && modalState;
    const isEditModal = modalType === 'edit' && modalState;
    return (
      <>
        {userAddressesPresent && this.renderAddressForm()}
        {(!userAddressesPresent || isAddModal) && this.renderAddressFields()}
        {!isEditModal && this.renderDefaultOptions()}
      </>
    );
  }
}

RegisteredShippingForm.propTypes = nativePropTypes;
RegisteredShippingForm.defaultProps = nativeDefaultPropTypes;

export default RegisteredShippingForm;
