import React from 'react';
import PropTypes from 'prop-types';
import { Field, change, FormSection, resetSection } from 'redux-form';
import AddressDropdown from '../../../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Address from '../../../../../../../../common/molecules/Address';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import Button from '../../../../../../../../common/atoms/Button';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import { getLabelValue } from '../../../../../../../../../utils';
import AddEditShippingAddress from '../../../../../molecules/AddEditShippingAddressModal';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import {
  AddressFieldsWrapper,
  SaveToAccountWrapper,
  MarginBottom,
  AddressViewWrapper,
} from '../styles/RegisteredShippingForm.styles.native';
import {
  onSaveBtnClick,
  getFieldsValidation,
  getDefaultShippingDisabledState,
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
    const { userAddresses, onFileAddressKey } = this.props;
    const userAddressesLength = userAddresses && userAddresses.size;
    let addressOptions =
      (userAddresses &&
        userAddresses.map(address => {
          let defaultId = false;
          if (address.primary === 'true') {
            defaultId = true;
          } else if (onFileAddressKey && !userAddressesLength) {
            defaultId = address.addressId === onFileAddressKey;
          }
          return {
            id: address.addressId,
            label: `${address.firstName} ${address.lastName} ${defaultId ? '(Default)' : ''}`,
            content: address,
            primary: defaultId,
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

  getBtnDisabledState = () => {
    let disabledState = false;
    const { syncErrorsObject } = this.props;
    const { modalState } = this.state;
    if (modalState) {
      disabledState = getFieldsValidation({ syncErrorsObject });
    }

    return disabledState;
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
            disableButton={this.getBtnDisabledState()}
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
    return (
      <>
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
        />

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
            noUnderline
            anchorVariation="primary"
            fontSizeVariation="small"
            noLink
            href="#"
            target="_blank"
            dataLocator="shipping-edit-contact-anchor"
            text="edit"
            onPress={this.onEditClick}
          />
        </AddressViewWrapper>
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
    } = this.props;
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
          />
        </AddressFieldsWrapper>
      </FormSection>
    );
  };

  render() {
    const { modalState, modalType } = this.state;
    const { labels, userAddresses } = this.props;
    return (
      <>
        {userAddresses && userAddresses.size > 0
          ? this.renderAddressForm()
          : this.renderAddressFields()}
        {!modalState && this.renderDefaultOptions()}
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
      </>
    );
  }
}

RegisteredShippingForm.propTypes = {
  addressFormLabels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  addressPhoneNo: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  loadShipmentMethods: PropTypes.func.isRequired,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  newUserPhoneNo: PropTypes.number,
  labels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
  address: PropTypes.shape({}),
  formName: PropTypes.string,
  updateShippingAddress: PropTypes.func.isRequired,
  addNewShippingAddress: PropTypes.func.isRequired,
  syncErrorsObject: PropTypes.shape({}),
  isSaveToAddressBookChecked: PropTypes.bool,
  setAsDefaultShipping: PropTypes.bool,
  defaultAddressId: PropTypes.string,
};
RegisteredShippingForm.defaultProps = {
  addressPhoneNo: null,
  isGuest: true,
  userAddresses: [],
  onFileAddressKey: null,
  newUserPhoneNo: null,
  shippingAddress: null,
  address: null,
  formName: 'checkoutShipping',
  syncErrorsObject: {},
  isSaveToAddressBookChecked: false,
  setAsDefaultShipping: false,
  defaultAddressId: null,
};

export default RegisteredShippingForm;
