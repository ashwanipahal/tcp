import React from 'react';
import type { Node } from 'react';
// eslint-disable-next-line
import { BodyCopy } from '../../../atoms';
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
    fontSize="fs10"
    component="div"
    color="text.primary"
    fontFamily="secondary"
    fontWeight="extrabold"
  >
    {showCheckmark && <span className="badge__checkmark" />}
    <span className="badge__content" data-locator={dataLocator}>
      {children}
    </span>
  </BodyCopy>
);

export default withStyles(Badge, styles);
export { Badge as BadgeVanilla };
