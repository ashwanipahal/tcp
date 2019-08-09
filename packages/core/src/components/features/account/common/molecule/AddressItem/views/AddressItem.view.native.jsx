import React from 'react';
import PropTypes from 'prop-types';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import {
  PaymentContainer,
  PaymentType,
  PaymentInfoContainer,
  TouchableLink,
  PaymentInfo,
  PaymentDetails,
} from '../styles/AddressItem.style.native';

class AddressItem extends React.PureComponent<Props> {
  render() {
    const { paymentInfo, handleComponentChange } = this.props;
    const variation = paymentInfo && paymentInfo.variation && paymentInfo.variation.toLowerCase();

    return (
      <PaymentContainer>
        <PaymentType>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs13"
            fontWeight="regular"
            text={paymentInfo.title}
            color="gray.900"
          />
          {variation === 'add' && (
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={paymentInfo.defaultText}
              color="gray.900"
            />
          )}
          {variation === 'edit' && (
            <PaymentInfoContainer>
              <ImageComp source={paymentInfo.icon} width={50} height={30} />
              <PaymentInfo>
                <BodyCopy
                  style={PaymentDetails}
                  fontFamily="secondary"
                  fontSize="fs12"
                  fontWeight="regular"
                  text={paymentInfo.text}
                  color="gray.900"
                />
                <BodyCopy
                  style={PaymentDetails}
                  fontFamily="secondary"
                  fontSize="fs10"
                  fontWeight="regular"
                  text={paymentInfo.subText}
                  color="gray.700"
                />
              </PaymentInfo>
            </PaymentInfoContainer>
          )}
        </PaymentType>
        <TouchableLink
          onPress={() => handleComponentChange('addressBookMobile')}
          textDecorationLine="underline"
        >
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs13"
            fontWeight="regular"
            text={paymentInfo.variation}
            color="gray.900"
          />
        </TouchableLink>
      </PaymentContainer>
    );
  }
}

AddressItem.propTypes = {
  paymentInfo: PropTypes.shape({}).isRequired,
};

export default AddressItem;
