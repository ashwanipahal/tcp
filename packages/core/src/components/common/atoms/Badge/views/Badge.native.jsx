import React from 'react';
import BodyCopy from '../../BodyCopy';
import { BadgeView, DefaultBadgeView } from '../Badge.style.native';

// @flow

type Props = {
  children: string,
  dataLocator: ?string,
};

const Badge = ({ children, dataLocator }: Props) => (
  <DefaultBadgeView data-locator={dataLocator}>
    <BadgeView>
      <BodyCopy
        mobilefontFamily={['secondary']}
        fontWeight="semibold"
        fontSize="fs10"
        color="white"
        text={children}
      />
    </BadgeView>
  </DefaultBadgeView>
);

export default Badge;
