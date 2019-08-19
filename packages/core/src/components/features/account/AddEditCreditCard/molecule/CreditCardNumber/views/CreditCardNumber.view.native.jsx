import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Image from '@tcp/core/src/components/common/atoms/Image';
import { getIconPath } from '../../../../../../../utils';

const getCardTypeImgUrl = cardType => {
  return getIconPath(`${(cardType || '').toLowerCase().replace(' ', '-')}-small`);
};

export const CreditCardNumber = ({ cardType, className, ...otherProps }) => {
  return (
    <View className={className}>
      <TextBox {...otherProps} />
      {cardType && <Image source={getCardTypeImgUrl(cardType)} width="20px" height="15px" />}
    </View>
  );
};

CreditCardNumber.propTypes = {
  cardType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default CreditCardNumber;
