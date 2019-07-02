import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '../../../hoc/withStyles';
import styles from '../Badge.style';

// @flow

type Props = {
  children: string,
  className: string,
  showCheckmark: boolean,
  dataLocator: ?string,
};

const Badge = ({ children, className, showCheckmark, dataLocator }: Props): Node => (
  <BodyCopy
    className={className}
    bodySize="one"
    tag="div"
    color="primary"
    fontFamily="secondaryFontFamily"
    fontWeight="bold"
  >
    {showCheckmark && <span className="badge__checkmark" />}
    <span className="badge__content" data-locator={dataLocator}>
      {children}
    </span>
  </BodyCopy>
);

export default withStyles(Badge, styles);
export { Badge as BadgeVanilla };
