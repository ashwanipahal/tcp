// @flow
import React from 'react';
import withStyles from '../../../hoc/withStyles.native';
import BodyCopy from '../../BodyCopy';
import { BadgeStyles, BadgeView, DefaultBadgeView } from '../Badge.style.native';

// @flow

type Props = {
  children: string,
  showCheckmark: boolean,
  dataLocator: ?string,
};

const Badge = ({ children, showCheckmark, dataLocator }: Props) => (
  <React.Fragment>
    {showCheckmark && (
      <DefaultBadgeView data-locator={dataLocator}>
        <BodyCopy fontSize="fs10" fontWeight="regular" color="white" text={children} />
      </DefaultBadgeView>
    )}
    {!showCheckmark && (
      <BadgeView data-locator={dataLocator}>
        <BodyCopy fontSize="fs10" fontWeight="regular" text={children} />
      </BadgeView>
    )}
  </React.Fragment>
);

export default withStyles(Badge, BadgeStyles);
export { Badge as BadgeVanilla };
