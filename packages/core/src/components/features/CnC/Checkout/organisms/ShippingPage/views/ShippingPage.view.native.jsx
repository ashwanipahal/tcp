import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ShippingForm from '../organisms/ShippingForm';
import { StyledHeader, HeaderContainer } from '../styles/ShippingPage.style.native';
import checkoutUtil from '../../../util/utility';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import AddressVerification from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import ModalNative from '../../../../../../common/molecules/Modal';

const { hasPOBox } = checkoutUtil;
export default class ShippingPage extends React.Component {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
    isSubmitting: PropTypes.bool.isRequired,
    labels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    selectedShipmentId: PropTypes.string,
    addressPhoneNumber: PropTypes.number,
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isUsSite: PropTypes.bool,
    orderHasPickUp: PropTypes.bool,
    shipmentMethods: PropTypes.shape([]),
    defaultShipmentId: PropTypes.number,
    loadShipmentMethods: PropTypes.func.isRequired,
    shippingDidMount: PropTypes.func.isRequired,
    formatPayload: PropTypes.func.isRequired,
    verifyAddressAction: PropTypes.func.isRequired,
    submitVerifiedShippingAddressData: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    availableStages: PropTypes.shape([]).isRequired,
    isGiftServicesChecked: PropTypes.bool,
    userAddresses: PropTypes.shape([]),
    onFileAddressKey: PropTypes.string,
    isSaveToAddressBookChecked: PropTypes.bool,
    setAsDefaultShipping: PropTypes.bool,
    saveToAddressBook: PropTypes.bool,
    updateShippingAddressData: PropTypes.func,
    addNewShippingAddressData: PropTypes.func,
    updateShippingMethodSelection: PropTypes.func.isRequired,
    syncErrors: PropTypes.shape({}),
    newUserPhoneNo: PropTypes.string,
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
    addressPhoneNumber: null,
    address: null,
    selectedShipmentId: null,
    isGuest: true,
    isUsSite: true,
    orderHasPickUp: false,
    shipmentMethods: null,
    defaultShipmentId: null,
    isGiftServicesChecked: false,
    userAddresses: null,
    onFileAddressKey: null,
    isSaveToAddressBookChecked: false,
    setAsDefaultShipping: false,
    saveToAddressBook: false,
    updateShippingAddressData: () => {},
    addNewShippingAddressData: () => {},
    syncErrors: {},
    newUserPhoneNo: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultAddressId: null,
      showAddressVerification: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultAddress: prevDefaultAddress } = prevState;
    const { userAddresses, addEditResponseAddressId } = nextProps;
    if (
      userAddresses &&
      (!addEditResponseAddressId || prevDefaultAddress === addEditResponseAddressId)
    ) {
      const defaultAddress = userAddresses.filter(item => item.primary === 'true');
      return {
        defaultAddressId: defaultAddress
          ? defaultAddress.addressId
          : userAddresses.get(0).addressId,
      };
    }
    if (addEditResponseAddressId && prevDefaultAddress !== addEditResponseAddressId) {
      return { defaultAddressId: addEditResponseAddressId };
    }
    return null;
  }

  componentDidMount() {
    const { shippingDidMount } = this.props;
    shippingDidMount();
  }

  shouldComponentUpdate() {
    const { isSubmitting } = this.props;
    return !isSubmitting;
  }

  componentDidUpdate(prevProps) {
    const { address, selectedShipmentId, updateShippingMethodSelection } = this.props;
    const { address: prevAddress, selectedShipmentId: prevSelectedShipmentId } = prevProps;
    if (address && prevAddress) {
      const {
        address: { addressLine1, addressLine2 },
        loadShipmentMethods,
      } = this.props;
      const {
        address: { addressLine1: prevAddressLine1, addressLine2: prevAddressLine2 },
      } = prevProps;
      if (
        (addressLine1 !== prevAddressLine1 || addressLine2 !== prevAddressLine2) &&
        hasPOBox(addressLine1, addressLine2)
      ) {
        loadShipmentMethods({ formName: 'checkoutShipping' });
      }
      if (selectedShipmentId !== prevSelectedShipmentId) {
        updateShippingMethodSelection({ id: selectedShipmentId });
      }
    }
  }

  submitShippingForm = data => {
    const {
      address,
      shipmentMethods,
      onFileAddressKey,
      defaultShipping,
      saveToAddressBook,
      smsSignUp = {},
    } = data;
    const { isGuest, userAddresses, formatPayload } = this.props;
    const { isAddNewAddress } = this.state;
    let shipAddress = address;
    if (!isGuest && userAddresses && userAddresses.size > 0 && !isAddNewAddress) {
      shipAddress = userAddresses.find(item => item.addressId === onFileAddressKey);
      if (shipAddress) {
        const { addressLine } = shipAddress;
        const [addressLine1, addressLine2] = addressLine;
        shipAddress.addressLine1 = addressLine1;
        shipAddress.addressLine2 = addressLine2;
      }
    }
    const submitData = {
      method: {
        shippingMethodId: shipmentMethods.shippingMethodId,
      },
      shipTo: {
        address: shipAddress,
        addressId: shipAddress.addressId,
        emailAddress: shipAddress.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: shipAddress.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: defaultShipping || shipAddress.primary === 'true',
      },
      smsInfo: {
        smsUpdateNumber: smsSignUp.phoneNumber,
        wantsSmsOrderUpdates: smsSignUp.sendOrderUpdate,
      },
    };
    const { handleSubmit, verifyAddressAction } = this.props;
    if (!onFileAddressKey) {
      const formattedPayload = formatPayload(shipAddress);
      this.submitData = submitData;
      this.setState({ showAddressVerification: true });
      return verifyAddressAction(formattedPayload);
    }

    return handleSubmit(submitData);
  };

  updateShippingAddress = () => {
    const {
      address,
      onFileAddressKey,
      setAsDefaultShipping,
      saveToAddressBook,
      updateShippingAddressData,
    } = this.props;
    updateShippingAddressData({
      shipTo: {
        address,
        addressId: address.addressId,
        emailAddress: address.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: address.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: setAsDefaultShipping,
      },
    });
  };

  addNewShippingAddress = () => {
    const {
      address,
      onFileAddressKey,
      setAsDefaultShipping,
      saveToAddressBook,
      addNewShippingAddressData,
    } = this.props;
    addNewShippingAddressData({
      shipTo: {
        address,
        addressId: address.addressId,
        emailAddress: address.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: address.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: setAsDefaultShipping,
      },
    });
  };

  submitVerifiedShippingAddressData = shippingAddress => {
    const { submitVerifiedShippingAddressData, navigation } = this.props;
    this.setState({ showAddressVerification: false });
    submitVerifiedShippingAddressData({ shippingAddress, submitData: this.submitData, navigation });
  };

  closeAddAddressVerificationModal = () => {
    this.setState({ showAddressVerification: false });
  };

  render() {
    const {
      shipmentMethods,
      defaultShipmentId,
      selectedShipmentId,
      isGuest,
      isUsSite,
      orderHasPickUp,
      smsSignUpLabels,
      isOrderUpdateChecked,
      addressPhoneNumber,
      addressLabels,
      emailSignUpLabels,
      loadShipmentMethods,
      navigation,
      availableStages,
      labels,
      isGiftServicesChecked,
      userAddresses,
      onFileAddressKey,
      isSaveToAddressBookChecked,
      address,
      setAsDefaultShipping,
      syncErrors,
      newUserPhoneNo,
      formatPayload,
    } = this.props;

    const { defaultAddressId, showAddressVerification } = this.state;
    const shippingAddressData = (this.submitData && this.submitData.shipTo.address) || {};
    return (
      <>
        {showAddressVerification && (
          <ModalNative
            isOpen={showAddressVerification}
            onRequestClose={this.closeAddAddressVerificationModal}
            heading={getLabelValue(labels, 'lbl_shipping_addNewAddress', 'shipping', 'checkout')}
          >
            <AddressVerification
              onSuccess={this.submitVerifiedShippingAddressData}
              heading={addressLabels.addAddressHeading}
              onError={this.submitVerifiedShippingAddressData}
              userAddress={formatPayload(shippingAddressData)}
            />
          </ModalNative>
        )}
        {!showAddressVerification && (
          <>
            <CheckoutProgressIndicator
              activeStage="shipping"
              navigation={navigation}
              availableStages={availableStages}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
              <HeaderContainer>
                <CheckoutSectionTitleDisplay
                  title={getLabelValue(labels, 'lbl_shipping_header', 'shipping', 'checkout')}
                />
              </HeaderContainer>
              <StyledHeader>
                <BodyCopy
                  color="black"
                  fontWeight="regular"
                  fontFamily="primary"
                  fontSize="fs28"
                  text={getLabelValue(labels, 'lbl_shipping_sectionHeader', 'shipping', 'checkout')}
                  textAlign="left"
                />
              </StyledHeader>
              {shipmentMethods && shipmentMethods.length > 0 && (
                <ShippingForm
                  shipmentMethods={shipmentMethods}
                  initialValues={{
                    address: { country: 'US' },
                    shipmentMethods: { shippingMethodId: defaultShipmentId },
                    onFileAddressKey: defaultAddressId,
                  }}
                  selectedShipmentId={selectedShipmentId}
                  isGuest={isGuest}
                  isUsSite={isUsSite}
                  orderHasPickUp={orderHasPickUp}
                  smsSignUpLabels={smsSignUpLabels}
                  isOrderUpdateChecked={isOrderUpdateChecked}
                  emailSignUpLabels={emailSignUpLabels}
                  addressPhoneNo={addressPhoneNumber}
                  addressLabels={addressLabels}
                  loadShipmentMethods={loadShipmentMethods}
                  navigation={navigation}
                  submitShippingForm={this.submitShippingForm}
                  labels={labels}
                  isGiftServicesChecked={isGiftServicesChecked}
                  userAddresses={userAddresses}
                  onFileAddressKey={onFileAddressKey}
                  isSaveToAddressBookChecked={isSaveToAddressBookChecked}
                  updateShippingAddress={this.updateShippingAddress}
                  addNewShippingAddress={this.addNewShippingAddress}
                  address={address}
                  setAsDefaultShipping={setAsDefaultShipping}
                  defaultAddressId={defaultAddressId}
                  syncErrorsObject={syncErrors}
                  newUserPhoneNo={newUserPhoneNo}
                />
              )}
            </ScrollView>
          </>
        )}
      </>
    );
  }
}
