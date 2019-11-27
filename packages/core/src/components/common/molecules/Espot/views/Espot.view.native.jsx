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

  /**
   * @function onPressHandler
   * @param {string} link - href key
   * @param {string} target - action type
   * @param {string} action - data-target of anchor
   * @returns {function}  - function to open modal or navigate to a path
   */
  onPressHandler = (link, target, action) => {
    switch (target) {
      case '_modal':
        this.openModal(action);
        break;
      default:
        this.handleNavigationUrl(link, target);
    }
  };

  /**
   * @function openModal
   * @param {string} action - action to identify data-target of modal
   * @returns {function} calls function received from prop to open a modal
   */
  openModal = action => {
    const { togglePlccModal, navigation, toggleNeedHelpModal } = this.props;

    switch (action) {
      case 'plccModal':
        navigation.navigate('ApplyNow');
        togglePlccModal(true);
        break;
      case 'isCouponHelpModalOpen':
        toggleNeedHelpModal();
        break;
      default:
        break;
    }
  };

  /**
   * @function handleNavigationUrl - opens an external url or navigate to internal route
   * @param {string} link - href in anchor of richtext
   * @param {string} target - action type to identify navigation destination
   */
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
