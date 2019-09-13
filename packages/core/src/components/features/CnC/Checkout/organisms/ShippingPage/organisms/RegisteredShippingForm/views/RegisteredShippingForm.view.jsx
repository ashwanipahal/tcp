import React from 'react';
import { FormSection, Field, change } from 'redux-form';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/RegisteredShippingForm.styles';
import AddressDropdown from '../../../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Address from '../../../../../../../../common/molecules/Address';
import Button from '../../../../../../../../common/atoms/Button';
import AddEditShippingAddressModal from '../../../../../molecules/AddEditShippingAddressModal';
import { getLabelValue } from '../../../../../../../../../utils';
import {
  getSelectedAddress,
  getDefaultShippingDisabledState,
  onSaveBtnClick,
  getCancelAction,
  getShowAddressFields,
  propTypes,
  defaultProps,
  getFieldsValidation,
} from './RegisteredShippingForm.util';

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
    this.setDefaultShippingValue();
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

  setDefaultShippingValue = () => {
    const { userAddresses, dispatch } = this.props;
    if (userAddresses && userAddresses.size === 0) {
      dispatch(change(formName, 'defaultShipping', true));
    }
  };

  getAddressOptions = () => {
    const { userAddresses, shippingAddressId, labels } = this.props;
    const userAddressesLength = userAddresses && userAddresses.size;
    let addressOptions = userAddresses.map(address => {
      let defaultId = false;
      if (address.primary === 'true') {
        defaultId = true;
      } else if (shippingAddressId && !userAddressesLength) {
        defaultId = address.addressId === shippingAddressId;
      }
      return {
        value: address.addressId,
        title: `${address.firstName} ${address.lastName} ${defaultId ? '(Default)' : ''}`,
        content: <Address address={address} showPhone isDefault={defaultId} className="address" />,
      };
    });

    addressOptions = addressOptions.push({
      value: '',
      title: 'Add New Address',
      content: (
        <BodyCopy
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="black"
          className="add-address"
          onClick={this.toggleAddNewAddressMode}
        >
          {getLabelValue(labels, 'lbl_shipping_addNewAddress', 'shipping', 'checkout')}
        </BodyCopy>
      ),
    });
    return addressOptions;
  };

  toggleEditingMode = e => {
    const { toggleIsEditing, isMobile, toggleAddEditModal } = this.props;
    if (isMobile) {
      return toggleAddEditModal({ type: 'edit' });
    }
    e.preventDefault();
    return toggleIsEditing();
  };

  toggleAddNewAddressMode = () => {
    const { toggleAddNewAddress, isMobile, toggleAddEditModal, dispatch } = this.props;
    dispatch(change(formName, 'defaultShipping', false));
    if (isMobile) {
      return toggleAddEditModal({ type: 'add' });
    }
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
    } = this.props;
    const showAddressFields = getShowAddressFields({ ...this.props });
    return (
      showAddressFields && (
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="address-form">
            <FormSection name="address">
              <AddressFields
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
      toggleAddEditModal,
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
              dataLocatorPrefix="address"
            />
          </Col>
        )}
        {this.renderAddressFields()}
        <Col colSize={{ small: 1, medium: 1, large: 1 }} className="hide-on-desktop">
          <Anchor
            fontSizeVariation="small"
            underline
            noLink
            anchorVariation="primary"
            dataLocator="edit-shipping-address"
            onClick={e => toggleAddEditModal({ type: 'edit', e })}
          >
            {getLabelValue(labels, 'lbl_shipping_edit', 'shipping', 'checkout')}
          </Anchor>
        </Col>
      </Row>
    );
  };

  renderAddressForm = () => {
    const { userAddresses, isGuest, isEditing, isAddNewAddress, labels } = this.props;
    const showEditLink = !isEditing && !isAddNewAddress;
    return userAddresses && userAddresses.size > 0 ? (
      <>
        <Row fullBleed>
          <Col
            colSize={{ small: 6, medium: 8, large: 6 }}
            className="address-dropDown"
            isEditing={isEditing}
          >
            <Field
              selectListTitle="Select from address book"
              name="onFileAddressKey"
              id="onFileAddressKey"
              component={AddressDropdown}
              dataLocator="shipping-address"
              options={this.getAddressOptions()}
              onChange={this.onAddressDropDownChange}
            />
          </Col>
        </Row>
        {!isGuest && (
          <Row fullBleed className="hide-on-mobile">
            <Col colSize={{ small: 6, medium: 6, large: 4 }}>
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
              <Col colSize={{ small: 1, medium: 1, large: 1 }}>
                <Anchor
                  fontSizeVariation="small"
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
        )}
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
    const { isAddNewAddress, userAddresses, isEditing, modalState, modalType, labels } = this.props;
    const showSaveToAddressBook =
      isAddNewAddress ||
      (modalState && modalType === 'add') ||
      (userAddresses && userAddresses.size === 0);
    const showDefaultShipping = showSaveToAddressBook || isEditing || modalState;
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
              <BodyCopy fontSize="fs16" fontFamily="secondary">
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
              <BodyCopy fontSize="fs16" fontFamily="secondary">
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

  getBtnDisabledState = () => {
    let disabledState = false;
    const { modalState, syncErrorsObject } = this.props;
    if (modalState) {
      disabledState = getFieldsValidation({ syncErrorsObject });
    }
    return disabledState;
  };

  renderActionButtons = () => {
    const { modalState, labels } = this.props;
    const cancelAction = getCancelAction({
      ...this.props,
      toggleEditingMode: this.toggleEditingMode,
    });
    return (
      <>
        <Row
          fullBleed
          className={`elem-mt-XL edit-cta ${modalState ? 'elem-mb-LRG top-border' : ''}`}
        >
          <Col colSize={{ small: 6, medium: 2, large: 3 }}>
            <Button
              fill={modalState ? 'BLUE' : 'WHITE'}
              type="button"
              buttonVariation="fixed-width"
              data-locator="edit-shipping-cancel-btn"
              onClick={modalState ? this.saveBtnClickHandler : this.toggleEditingMode}
              className={modalState ? 'elem-mb-MED' : ''}
              disabled={this.getBtnDisabledState()}
            >
              {modalState
                ? getLabelValue(labels, 'lbl_shipping_selectShipAdd', 'shipping', 'checkout')
                : getLabelValue(labels, 'lbl_shipping_cancel', 'shipping', 'checkout')}
            </Button>
          </Col>
          <Col colSize={{ small: 6, medium: 2, large: 3 }}>
            <Button
              fill={modalState ? 'WHITE' : 'BLUE'}
              type="button"
              buttonVariation="fixed-width"
              data-locator="edit-shipping-save-btn"
              onClick={modalState ? cancelAction : this.saveBtnClickHandler}
            >
              {modalState
                ? getLabelValue(labels, 'lbl_shipping_cancelCaps', 'shipping', 'checkout')
                : getLabelValue(labels, 'lbl_shipping_save', 'shipping', 'checkout')}
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  render() {
    const { isEditing, className, modalState, modalType, toggleAddEditModal, labels } = this.props;
    return (
      <div className={className} isEditing={isEditing}>
        {!modalState && (
          <>
            {this.renderAddressForm()}
            {this.renderDefaultOptions()}
            {isEditing && this.renderActionButtons()}
          </>
        )}
        <AddEditShippingAddressModal
          modalState={modalState}
          addressFields={this.renderAddressFields}
          modalType={modalType}
          defaultOptions={this.renderDefaultOptions}
          toggleAddEditModal={toggleAddEditModal}
          actionButtons={this.renderActionButtons}
          labels={labels}
        />
      </div>
    );
  }
}

RegisteredShippingForm.propTypes = propTypes;

RegisteredShippingForm.defaultProps = defaultProps;

export default withStyles(RegisteredShippingForm, styles);
export { RegisteredShippingForm as RegisteredShippingFormVanilla };
