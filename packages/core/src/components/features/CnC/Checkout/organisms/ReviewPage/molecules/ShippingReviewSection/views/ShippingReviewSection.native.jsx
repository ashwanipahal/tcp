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

const { ShippingReviewContainer, AddressSection, AddressTitle, TitlePlusEditSection } = style;

export class ShippingReviewSection extends React.PureComponent {
  render() {
    const {
      shippingAddress,
      shippingMethod,
      isGiftOptionsEnabled,
      giftWrappingDisplayName,
      labels,
      onEdit,
    } = this.props;
    const {
      lbl_review_shippingSectionTitle: title,
      lbl_review_sectionAnchor: edit,
      lbl_review_sectionShippingAddressTitle: addressTitle,
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
                mobileFontFamily="secondary"
                color="gray.900"
                fontWeight="extrabold"
                text={addressTitle}
              />
            </AddressTitle>
            <AddressSection>
              <Address address={shippingAddress.address} regularName />
              <BodyCopy
                fontSize="fs16"
                dataLocator=""
                mobileFontFamily="secondary"
                color="gray.900"
                fontWeight="regular"
                text={shippingAddress.emailAddress}
              />
              {shippingAddress.phoneNumber && (
                <BodyCopy
                  fontSize="fs16"
                  dataLocator=""
                  mobileFontFamily="secondary"
                  color="gray.900"
                  fontWeight="regular"
                  text={formatPhoneNumber(shippingAddress.phoneNumber)}
                />
              )}
            </AddressSection>
          </View>
          <View>
            {shippingMethod && (
              <ShippingMethodDisplay labels={labels} displayName={shippingMethod.displayName} />
            )}
            {isGiftOptionsEnabled && (
              <GiftWrappingDisplay labels={labels} displayName={giftWrappingDisplayName} />
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
};

ShippingReviewSection.defaultProps = {
  labels: {},
  shippingAddress: {},
  isGiftOptionsEnabled: false,
  giftWrappingDisplayName: 'N/A',
};

export default ShippingReviewSection;
export { ShippingReviewSection as ShippingReviewSectionvanilla };
