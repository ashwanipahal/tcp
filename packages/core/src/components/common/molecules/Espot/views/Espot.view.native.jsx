import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';

export class Espot extends PureComponent {
  static propTypes = {
    richTextHtml: PropTypes.string.isRequired,
    togglePlccModal: PropTypes.func.isRequired,
    navigation: PropTypes.func.isRequired,
  };

  onPressHandler = action => {
    const { togglePlccModal, navigation } = this.props;
    switch (action) {
      case 'plccModal':
        navigation.navigate('ApplyNow');
        togglePlccModal(true);
        break;
      default:
        break;
    }
  };

  render() {
    const { richTextHtml } = this.props;
    return (
      <View>
        <RichText source={richTextHtml} isNativeView actionHandler={this.onPressHandler} />
      </View>
    );
  }
}

export default withNavigation(Espot);
