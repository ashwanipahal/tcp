import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CheckoutPageEmptyBag.style';

const CheckoutPageEmptyBag = ({ labels: { emptyBagText, emptyBagSubText } = {}, className }) => {
  return (
    <div className={className}>
      {emptyBagText}
      {emptyBagSubText}
    </div>
  );
};

CheckoutPageEmptyBag.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(CheckoutPageEmptyBag, styles);
