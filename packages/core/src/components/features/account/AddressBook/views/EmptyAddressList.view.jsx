import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/EmptyAddressList.style';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

// @flow

type Props = {
  labels: Object,
  className: string,
};

export const EmptyAddressList = ({ labels, className }: Props) => {
  return (
    <div className={className}>
      <BodyCopy
        bodySize="three"
        tag="p"
        fontWeight="bold"
        className="emptyAddressList__row--marginBottom"
      >
        {labels.createAddressBookMsg}
      </BodyCopy>
      <BodyCopy bodySize="three" tag="p" className="emptyAddressList__row--marginBottom">
        {labels.createAddressBookBenefitMsg}
      </BodyCopy>
    </div>
  );
};

export default withStyles(EmptyAddressList, styles);
