import React from 'react';
import PropTypes from 'prop-types';
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

const formName = 'checkoutShipping';
class RegisteredShippingForm extends React.Component {
  componentDidMount() {
    const { newUserPhoneNo, isGuest, dispatch } = this.props;
    if (!isGuest) {
      dispatch(change(formName, 'address.phoneNumber', newUserPhoneNo));
    }
  }

  getAddressOptions = () => {
    const { userAddresses, shippingAddressId } = this.props;
    let addressOptions = userAddresses.map(address => {
      let defaultId = address.primary === 'true';
      if (shippingAddressId) {
        defaultId = address.id === shippingAddressId;
      }
      return {
        value: address.addressId,
        title: `${address.firstName} ${address.lastName} ${
          address.primary === 'true' ? '(Default)' : ''
        }`,
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
          + Add New Address
        </BodyCopy>
      ),
    });
    return addressOptions;
  };

  getSelectedAddress = (addressList, onFileAddresskey) => {
    return addressList.find(add => add.addressId === onFileAddresskey);
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
    const { toggleAddNewAddress, isMobile, toggleAddEditModal } = this.props;
    if (isMobile) {
      return toggleAddEditModal({ type: 'add' });
    }
    return toggleAddNewAddress();
  };

  onAddressDropDownChange = () => {
    const { onFileAddressKey, isEditing, isAddNewAddress, dispatch } = this.props;
    if ((isEditing || isAddNewAddress) && onFileAddressKey === '') {
      dispatch(change(formName, 'saveToAddressBook', false));
    }
    if (onFileAddressKey === '') {
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
      isEditing,
      isAddNewAddress,
      userAddresses,
      modalState,
    } = this.props;
    const showAddressFields =
      isEditing || isAddNewAddress || modalState || (userAddresses && userAddresses.size === 0);
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
    const { onFileAddressKey, userAddresses, isEditing, toggleAddEditModal } = this.props;
    return (
      <Row fullBleed>
        {onFileAddressKey && !isEditing && (
          <Col colSize={{ small: 5, medium: 4, large: 4 }}>
            <Address
              address={this.getSelectedAddress(userAddresses, onFileAddressKey)}
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
            Edit
          </Anchor>
        </Col>
      </Row>
    );
  };

  renderAddressForm = () => {
    const { userAddresses, shippingLabels, isGuest, isEditing, isAddNewAddress } = this.props;
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
            <Col colSize={{ small: 6, medium: 6, large: 5 }}>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs28"
                fontWeight="regular"
                data-locator="shipping-details"
                className="elem-mb-XS"
              >
                {shippingLabels.sectionHeader}
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
                  Edit
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

  getDefaultShippingDisabledState = () => {
    const {
      isEditing,
      isSaveToAddressBookChecked,
      isAddNewAddress,
      modalState,
      modalType,
    } = this.props;
    let defaultShippingDisabled = !isEditing;
    if (isAddNewAddress) {
      if (!isSaveToAddressBookChecked) {
        defaultShippingDisabled = true;
      } else {
        defaultShippingDisabled = false;
      }
    } else if (modalState && modalType === 'add') {
      defaultShippingDisabled = false;
    }
    return defaultShippingDisabled;
  };

  renderDefaultOptions = () => {
    const { isAddNewAddress, userAddresses, isEditing, modalState, modalType } = this.props;
    const showSaveToAddressBook =
      isAddNewAddress ||
      (modalState && modalType === 'add') ||
      (userAddresses && userAddresses.size === 0);
    const showDefaultShipping = showSaveToAddressBook || isEditing || modalState;
    const defaultShippingDisabled = this.getDefaultShippingDisabledState();
    return (
      <Row fullBleed>
        {showSaveToAddressBook && (
          <Col colSize={{ small: 6, medium: 8, large: 12 }} className="elem-mb-LRG">
            <Field showDefaultCheckbox={false} component={InputCheckbox} name="saveToAddressBook">
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                Save to my address book
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
                Set as default shipping address
              </BodyCopy>
            </Field>
          </Col>
        )}
      </Row>
    );
  };

  onSaveBtnClick = () => {
    const {
      updateShippingAddress,
      modalType,
      addNewShippingAddress,
      modalState,
      isEditing,
    } = this.props;
    if (((modalState && modalType === 'edit') || isEditing) && updateShippingAddress) {
      updateShippingAddress();
    }
    if (modalState && modalType === 'add' && addNewShippingAddress) {
      addNewShippingAddress();
    }
  };

  renderActionButtons = () => {
    const { modalState } = this.props;
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
              onClick={modalState ? this.onSaveBtnClick : this.toggleEditingMode}
              className={modalState ? 'elem-mb-MED' : ''}
            >
              Cancel
            </Button>
          </Col>
          <Col colSize={{ small: 6, medium: 2, large: 3 }}>
            <Button
              fill={modalState ? 'WHITE' : 'BLUE'}
              type="button"
              buttonVariation="fixed-width"
              data-locator="edit-shipping-save-btn"
              onClick={modalState ? this.toggleEditingMode : this.onSaveBtnClick}
            >
              Save
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  render() {
    const { isEditing, className, modalState, modalType, toggleAddEditModal } = this.props;
    return (
      <div className={className} isEditing={isEditing}>
        {this.renderAddressForm()}
        {this.renderDefaultOptions()}
        {isEditing && this.renderActionButtons()}
        <AddEditShippingAddressModal
          modalState={modalState}
          addressFields={this.renderAddressFields}
          modalType={modalType}
          defaultOptions={this.renderDefaultOptions}
          toggleAddEditModal={toggleAddEditModal}
          actionButtons={this.renderActionButtons}
        />
      </div>
    );
  }
}

RegisteredShippingForm.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  shippingLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  addressPhoneNo: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  loadShipmentMethods: PropTypes.func.isRequired,
  isSaveToAddressBookChecked: PropTypes.bool,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  isMobile: PropTypes.bool,
  newUserPhoneNo: PropTypes.number,
  shippingAddressId: PropTypes.string,
  updateShippingAddress: PropTypes.func.isRequired,
  addNewShippingAddress: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  className: PropTypes.string,
  modalState: PropTypes.bool,
  modalType: PropTypes.string,
  toggleAddEditModal: PropTypes.func.isRequired,
  isAddNewAddress: PropTypes.bool,
  toggleAddNewAddress: PropTypes.func.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
};

RegisteredShippingForm.defaultProps = {
  addressPhoneNo: null,
  isGuest: true,
  isSaveToAddressBookChecked: false,
  userAddresses: [],
  onFileAddressKey: null,
  isMobile: false,
  newUserPhoneNo: null,
  shippingAddressId: null,
  isEditing: null,
  className: '',
  modalState: false,
  modalType: null,
  isAddNewAddress: false,
};

export default withStyles(RegisteredShippingForm, styles);
export { RegisteredShippingForm as RegisteredShippingFormVanilla };
