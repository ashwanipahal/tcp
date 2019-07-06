// @flow
// eslint-disable-next-line import/no-unresolved
import { Text } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import AnchorStyles from '../Anchor.style.native';

type Props = {
  id?: string,
  anchorVariation?: string,
};

const Anchor = ({ id, anchorVariation, ...otherProps }: Props) => (
    <Text anchorVariation={anchorVariation}{...otherProps} />
);

Anchor.defaultProps = {
  id: 'btn',
  anchorVariation: '',
};

export default withStyles(Anchor, AnchorStyles);
