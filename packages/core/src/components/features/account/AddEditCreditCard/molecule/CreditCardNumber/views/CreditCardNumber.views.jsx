import React from 'react'
import PropTypes from 'prop-types';
import { TextBox, Image } from '../../../../../../common/atoms';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';

const CreditCardNumber = ({ creditCardImgUrl, ...otherProps }) => {
  return (
    <BodyCopy component="div">
      <TextBox
        {...otherProps}
      />
      <Image src={creditCardImgUrl} />
    </BodyCopy>
  );
}

CreditCardNumber.propTypes = {
  creditCardImgUrl: PropTypes.string.isRequired
}

export default CreditCardNumber;
