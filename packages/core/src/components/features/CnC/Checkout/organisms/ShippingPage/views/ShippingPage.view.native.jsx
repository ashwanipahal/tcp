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

const { hasPOBox } = checkoutUtil;
export default class ShippingPage extends React.Component {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
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
    navigation: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    availableStages: PropTypes.shape([]).isRequired,
    isGiftServicesChecked: PropTypes.bool,
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
  };

  componentDidUpdate(prevProps) {
    const { address } = this.props;
    const { address: prevAddress } = prevProps;
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
    }
  }

  submitShippingForm = data => {
    const { address, shipmentMethods, smsSignUp } = data;
    const { handleSubmit } = this.props;
    handleSubmit({
      method: {
        shippingMethodId: shipmentMethods.shippingMethodId,
      },
      shipTo: {
        address: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          country: address.country,
          firstName: address.firstName,
          lastName: address.lastName,
          isCommercialAddress: false,
          state: address.state,
          zipCode: address.zipCode,
        },
        addressId: undefined,
        emailAddress: address.emailAddress,

        emailSignup: true,
        onFileAddressKey: undefined,
        phoneNumber: address.phoneNumber,
        saveToAccount: address.saveToAccount || true,
        setAsDefault: address.isDefault || true,
      },
      smsInfo: {
        smsUpdateNumber: smsSignUp.phoneNumber,
        wantsSmsOrderUpdates: smsSignUp.sendOrderUpdate,
      },
    });
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
    } = this.props;

    return (
      <>
        <CheckoutProgressIndicator
          activeStage="shipping"
          navigation={navigation}
          availableStages={availableStages}
        />
        <ScrollView>
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
                shipmentMethods: { shippingMethodId: defaultShipmentId },
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
            />
          )}
        </ScrollView>
      </>
    );
  }
}
