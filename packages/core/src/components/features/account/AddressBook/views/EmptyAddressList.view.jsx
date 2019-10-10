import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/EmptyAddressList.style';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

export const EmptyAddressList = ({ labels, className }) => {
  return (
    <div className={className}>
      <BodyCopy bodySize="three" tag="p" fontWeight="bold" className="emptyAddressList__row">
        {getLabelValue(labels, 'ACC_LBL_CREATE_ADDRESS_BOOK_MSG', 'addressBook')}
      </BodyCopy>
      <BodyCopy bodySize="three" tag="p" className="emptyAddressList__row">
        {getLabelValue(labels, 'ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG', 'addressBook')}
      </BodyCopy>
    </div>
  );
};
EmptyAddressList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(EmptyAddressList, styles);
