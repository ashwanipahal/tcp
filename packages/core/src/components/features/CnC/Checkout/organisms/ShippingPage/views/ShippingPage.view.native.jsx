import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import ShippingForm from '../organisms/ShippingForm';
import StyledHeader from '../styles/ShippingPage.style.native';
import checkoutUtil from '../../../util/utility';

const { hasPOBox } = checkoutUtil;

export const checkPOBoxAddress = ({ address, loadShipmentMethods }) => {
  if (address) {
    const { addressLine1, addressLine2 } = address;
    if (hasPOBox(addressLine1, addressLine2)) {
      return loadShipmentMethods();
    }
  }
  return null;
};

const ShippingPage = ({
  navigation,
  shippingLabels,
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
  address,
}) => {
  return (
    <ScrollView>
      <View>
        <Text>Checkout Progress Bar container</Text>
      </View>
      <StyledHeader>
        <BodyCopy
          color="black"
          fontWeight="regular"
          fontFamily="primary"
          fontSize="fs28"
          text={shippingLabels.sectionHeader}
          textAlign="left"
        />
      </StyledHeader>
      {shipmentMethods && shipmentMethods.length > 0 && (
        <ShippingForm
          shippingLabels={shippingLabels}
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
          checkPOBoxAddress={checkPOBoxAddress({ address, loadShipmentMethods })}
        />
      )}
      <CnCTemplate navigation={navigation} btnText="NEXT:BILLING" routeToPage="" />
    </ScrollView>
  );
};
ShippingPage.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  shippingLabels: PropTypes.shape({}).isRequired,
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
};

ShippingPage.defaultProps = {
  isOrderUpdateChecked: false,
  addressPhoneNumber: null,
  address: null,
  selectedShipmentId: null,
  isGuest: true,
  isUsSite: true,
  orderHasPickUp: false,
  shipmentMethods: null,
  defaultShipmentId: null,
};

export default ShippingPage;
