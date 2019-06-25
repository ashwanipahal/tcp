// @flow
import React from 'react';
import withStyles from '../../../hoc/withStyles';
import styles from '../Separator.style';

const Separator = ({ className }: { className: string }) => <hr className={className} />;

export default withStyles(Separator, styles);
export { Separator as SeparatorVanilla };
