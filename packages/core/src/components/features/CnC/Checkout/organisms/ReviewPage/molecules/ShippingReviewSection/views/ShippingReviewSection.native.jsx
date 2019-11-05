import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import Address from '../../../../../../../../common/molecules/Address';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import ShippingMethodDisplay from '../../ShippingMethodDisplay';
import GiftWrappingDisplay from '../../GiftWrappingDisplay';
import TitlePlusEditButton from '../../TitlePlusEditButton';
import style from '../styles/ShippingReviewSection.style.native';
import ShipmentMethods from '../../../../../../common/molecules/ShipmentMethods';

const { ShippingReviewContainer, AddressSection, AddressTitle, TitlePlusEditSection } = style;

export class ShippingReviewSection extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const {
      updateShippingMethodSelection,
      expressReviewShippingSectionId,
      isExpressCheckout,
    } = this.props;
    const { expressReviewShippingSectionId: prevexpressReviewShippingSectionId } = prevProps;
    if (
      isExpressCheckout &&
      prevexpressReviewShippingSectionId.shippingMethodId &&
      typeof prevexpressReviewShippingSectionId.shippingMethodId !== 'object' &&
      expressReviewShippingSectionId.shippingMethodId !==
        prevexpressReviewShippingSectionId.shippingMethodId
    ) {
      updateShippingMethodSelection({ id: expressReviewShippingSectionId.shippingMethodId });
    }
  }

  render() {
    const {
      shippingAddress,
      shippingMethod,
      isGiftOptionsEnabled,
      giftWrappingDisplayName,
      labels,
      onEdit,
      isExpressCheckout,
      shipmentMethods,
      formName,
      formSection,
      dispatch,
      expressReviewShippingSectionId,
    } = this.props;
    const {
      lbl_review_shippingSectionTitle: title,
      lbl_review_sectionAnchor: edit,
      lbl_review_sectionShippingAddressTitle: addressTitle,
      lbl_review_sectionShippingMethodTitle: shippingMethodTitle,
    } = labels;
    return (
      <>
        <TitlePlusEditSection>
          <TitlePlusEditButton
            title={title}
            editTitle={edit}
            onEdit={onEdit}
            dataLocator="shipping-section"
          />
        </TitlePlusEditSection>
        <ShippingReviewContainer>
          <View>
            <AddressTitle>
              <BodyCopy
                fontSize="fs16"
                dataLocator=""
                fontFamily="secondary"
                color="gray.900"
                fontWeight="extrabold"
                text={addressTitle}
              />
            </AddressTitle>
            <AddressSection>
              {!!shippingAddress.address && (
                <Address address={shippingAddress.address} regularName />
              )}
              <BodyCopy
                fontSize="fs16"
                dataLocator=""
                fontFamily="secondary"
                color="gray.900"
                fontWeight="regular"
                text={shippingAddress.emailAddress}
              />
              {!!shippingAddress.phoneNumber && (
                <BodyCopy
                  fontSize="fs16"
                  dataLocator=""
                  fontFamily="secondary"
                  color="gray.900"
                  fontWeight="regular"
                  text={formatPhoneNumber(shippingAddress.phoneNumber)}
                />
              )}
            </AddressSection>
          </View>
          <View>
            {!isExpressCheckout && shippingMethod && (
              <ShippingMethodDisplay labels={labels} displayName={shippingMethod.displayName} />
            )}
            {isExpressCheckout && shippingMethod && (
              <ShipmentMethods
                shipmentMethods={shipmentMethods}
                formName={formName}
                formSection={formSection}
                selectedShipmentId={
                  expressReviewShippingSectionId && expressReviewShippingSectionId.shippingMethodId
                }
                shipmentHeader={shippingMethodTitle}
                dispatch={dispatch}
              />
            )}
            {isGiftOptionsEnabled && (
              <GiftWrappingDisplay
                labels={labels}
                displayName={giftWrappingDisplayName}
                onEdit={onEdit}
                editTitle={edit}
                isExpressCheckout={isExpressCheckout}
              />
            )}
          </View>
        </ShippingReviewContainer>
      </>
    );
  }
}

ShippingReviewSection.propTypes = {
  labels: PropTypes.shape({}),
  isGiftOptionsEnabled: PropTypes.bool,
  giftWrappingDisplayName: PropTypes.string,
  shippingAddress: PropTypes.shape({}),
  shippingMethod: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shippingSpeed: PropTypes.string.isRequired,
    isDefault: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  isExpressCheckout: PropTypes.bool.isRequired,
  shipmentMethods: PropTypes.shape({}).isRequired,
  formName: PropTypes.string.isRequired,
  formSection: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  updateShippingMethodSelection: PropTypes.func.isRequired,
  expressReviewShippingSectionId: PropTypes.func.isRequired,
};

ShippingReviewSection.defaultProps = {
  labels: {},
  shippingAddress: {},
  isGiftOptionsEnabled: false,
  giftWrappingDisplayName: 'N/A',
};

export default ShippingReviewSection;
export { ShippingReviewSection as ShippingReviewSectionvanilla };
