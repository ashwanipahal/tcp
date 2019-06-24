// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '../../../hoc/withStyles';
import styles from '../Badge.style';

type Props = {
  children: Node,
  className: string,
  showCheckmark: boolean,
};

const Badge = ({ children, className, showCheckmark }: Props): Node => (
  <BodyCopy className={className} bodySize="one" tag="div" fontWeight="bold" color="primary">
    {showCheckmark && <span className="checkmark" />}
    <span className="content">{children}</span>
  </BodyCopy>
);

export default withStyles(Badge, styles);
export { Badge as BadgeVanilla };
