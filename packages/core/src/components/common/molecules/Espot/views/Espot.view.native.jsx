import React, { PureComponent } from 'react';
import { View, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { richTextNavigationMap, getAPIConfig } from '@tcp/core/src/utils/index.native';

export class Espot extends PureComponent {
  static propTypes = {
    richTextHtml: PropTypes.string.isRequired,
    togglePlccModal: PropTypes.func.isRequired,
    navigation: PropTypes.func.isRequired,
  };

  onPressHandler = (link, target, action) => {
    const { togglePlccModal, navigation } = this.props;
    const externalUrl = new RegExp('^(?:[a-z]+:)?//', 'i');
    const { assetHost } = getAPIConfig();

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
        if (externalUrl.test(link)) {
          Linking.openURL(link);
        } else {
          switch (target) {
            case '_self':
              navigation.navigate(richTextNavigationMap[link]);
              break;

            case '_blank':
              Linking.openURL(`${assetHost}${link}`);
              break;
            default:
              navigation.navigate('Home');
          }
        }
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
