import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CheckoutPageEmptyBag.style';
import { BodyCopy } from '../../../../../../common/atoms';

const CheckoutPageEmptyBag = ({ labels: { emptyBagText, emptyBagSubText } = {}, className }) => {
  return (
    <div className={className}>
      <div className="empty-bag-text">
        <BodyCopy color="gray.900" fontWeight="extrabold" fontFamily="secondary">
          {emptyBagText}
        </BodyCopy>
      </div>
      <div className="empty-bag-subtext">
        <BodyCopy className="small-text" fontFamily="secondary">
          {emptyBagSubText}
        </BodyCopy>
      </div>
    </div>
  );
};

CheckoutPageEmptyBag.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(CheckoutPageEmptyBag, styles);
export { CheckoutPageEmptyBag as CheckoutPageEmptyBagVanilla };
