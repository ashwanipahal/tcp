import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/JeansModule.style';

export class JeansModule extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
  };

  static defaultProps = {
    data: {},
  };

  render() {
    return <Text>Jeans Module</Text>;
  }
}

export { JeansModule as JeansModuleVanilla };
export default withStyles(JeansModule, styles);
