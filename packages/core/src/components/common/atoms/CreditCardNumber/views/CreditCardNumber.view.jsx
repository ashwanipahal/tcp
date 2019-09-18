import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import TextBox from '../../TextBox';
import Image from '../../Image';
import BodyCopy from '../../BodyCopy';
import { getIconPath } from '../../../../../utils';
import styles from '../styles/CreditCardNumber.style';

const getCardTypeImgUrl = cardType => {
  return getIconPath(`${(cardType || '').toLowerCase().replace(' ', '-')}-small`);
};

export const CreditCardNumber = ({ cardType, className, ...otherProps }) => {
  return (
    <BodyCopy component="div" className={className}>
      <TextBox maxLength="16" {...otherProps} />
      {cardType && <Image src={getCardTypeImgUrl(cardType)} />}
    </BodyCopy>
  );
};

CreditCardNumber.propTypes = {
  cardType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(CreditCardNumber, styles);
export { CreditCardNumber as CreditCardNumberVanilla };
