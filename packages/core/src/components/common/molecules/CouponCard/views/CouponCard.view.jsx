import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';

const CouponCard = ({ coupon }) =>
  coupon && (
    <BodyCopy component="div" fontSize="fs14" color="text.primary">
      <BodyCopy component="p" fontFamily="secondary">
        {`${coupon.title}`}
      </BodyCopy>
    </BodyCopy>
  );

CouponCard.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
};

export default CouponCard;
