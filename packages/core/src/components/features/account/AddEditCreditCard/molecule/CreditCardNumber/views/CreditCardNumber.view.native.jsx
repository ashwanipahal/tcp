import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CreditCardTextBox from '@tcp/core/src/components/common/atoms/CreditCardTextBox';
import Image from '@tcp/core/src/components/common/atoms/Image';
import { getIconPath } from '../../../../../../../utils';

const getCardTypeImgUrl = cardType => {
  return getIconPath(`${(cardType || '').toLowerCase().replace(' ', '-')}-small`);
};

export const CreditCardNumber = ({ cardType, className, isEdit, ...otherProps }) => {
  return (
    <View className={className}>
      <CreditCardTextBox {...otherProps} isEdit={isEdit} />
      {cardType && <Image source={getCardTypeImgUrl(cardType)} width="20px" height="15px" />}
    </View>
  );
};

CreditCardNumber.propTypes = {
  cardType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default CreditCardNumber;
