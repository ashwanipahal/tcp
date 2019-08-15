import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { TextBox, Image } from '../../../../../../common/atoms';
import { getIconPath } from '../../../../../../../utils';
import styles from '../styles/CreditCardNumber.native.style';

const getCardTypeImgUrl = cardType => {
  return getIconPath(`${(cardType || '').toLowerCase().replace(' ', '-')}-small`);
};

export const CreditCardNumber = ({ cardType, className, ...otherProps }) => {
  return (
    <View className={className}>
      <TextBox maxLength="16" {...otherProps} />
      {cardType && <Image src={getCardTypeImgUrl(cardType)} />}
    </View>
  );
};

CreditCardNumber.propTypes = {
  cardType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(CreditCardNumber, styles);
