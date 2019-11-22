import React, { PureComponent } from 'react';
import { View, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { getAPIConfig } from '@tcp/core/src/utils/index.native';
import RICHTEXT_NAVIGATION_MAP from '../container/Espot.constants';

export class Espot extends PureComponent {
  static propTypes = {
    richTextHtml: PropTypes.string.isRequired,
    togglePlccModal: PropTypes.func.isRequired,
    navigation: PropTypes.func.isRequired,
  };

  onPressHandler = (link, target, action) => {
    const { togglePlccModal, navigation } = this.props;

    switch (target) {
      case '_modal':
        switch (action) {
          case 'plccModal':
            navigation.navigate('ApplyNow');
            togglePlccModal(true);
            break;
          default:
            break;
        }
        break;
      default:
        handleNavigationUrl(link, target);
    }
  };

  handleNavigationUrl = (link, target) => {
    const { navigation } = this.props;
    const externalUrl = new RegExp('^(?:[a-z]+:)?//', 'i');
    const { assetHost } = getAPIConfig();

    if (externalUrl.test(link)) {
      Linking.openURL(link);
    } else {
      switch (target) {
        case '_self':
          navigation.navigate(RICHTEXT_NAVIGATION_MAP[link]);
          break;
        case '_blank':
          Linking.openURL(`${assetHost}${link}`);
          break;
        default:
          navigation.navigate('Home');
          break;
      }
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
