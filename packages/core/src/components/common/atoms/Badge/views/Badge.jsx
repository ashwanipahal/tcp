// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '../../../hoc/withStyles';
import styles from '../Badge.style';

type Props = {
  children: string,
  className: string,
  showCheckmark: boolean,
};

const Badge = ({ children, className, showCheckmark }: Props): Node => (
  <BodyCopy
    className={className}
    bodySize="one"
    tag="div"
    color="primary"
    fontFamily="secondaryFontFamily"
    fontWeight="bold"
  >
    {showCheckmark && <span className="badge__checkmark" />}
    <span className="badge__content">{children}</span>
  </BodyCopy>
);

export default withStyles(Badge, styles);
export { Badge as BadgeVanilla };
