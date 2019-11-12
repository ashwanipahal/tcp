import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/OutfitCarouselModule.style';

export class OutfitCarouselModule extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
  };

  static defaultProps = {
    data: {},
  };

  render() {
    return <Text>Outfit Carousel</Text>;
  }
}

export { OutfitCarouselModule as OutfitCarouselModuleVanilla };
export default withStyles(OutfitCarouselModule, styles);
