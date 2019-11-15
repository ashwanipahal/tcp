import React from 'react';
import { PropTypes } from 'prop-types';
import { SafeAreaView } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import SettingsView from '../molecules/SettingsView';
import SettingsTopSection from '../molecules/SettingsTopSection';

export class SettingsModal extends React.PureComponent {
  /**
   * @function onCloseModal  Used to close the modal
   */
  onClose = () => {
    const { navigation } = this.props;
    navigation.navigate('Account');
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { labels, isUserLoggedIn } = this.props;
    return (
      <SafeAreaView>
        <ViewWithSpacing spacingStyles="margin-left-LRG margin-right-LRG margin-bottom-SM margin-top-SM">
          <SettingsTopSection labels={labels} onRequestClose={this.onClose} />
        </ViewWithSpacing>
        <SettingsView labels={labels} isUserLoggedIn={isUserLoggedIn} />
      </SafeAreaView>
    );
  }
}

SettingsModal.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default SettingsModal;
