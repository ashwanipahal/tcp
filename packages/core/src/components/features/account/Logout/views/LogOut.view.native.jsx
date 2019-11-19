import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import AsyncStorage from '@react-native-community/async-storage';
import BodyCopy from '../../../../common/atoms/BodyCopy';

class LogOutView extends React.Component {
  constructor(props) {
    super(props);
    this.logoutApp = this.logoutApp.bind(this);
  }

  logoutApp(e) {
    e.preventDefault();
    const { triggerLogout } = this.props;
    triggerLogout();

    // clear the username and password
    AsyncStorage.setItem('username', '');
    AsyncStorage.setItem('password', '');
  }

  render() {
    const { className, labels } = this.props;
    return (
      <React.Fragment className={className}>
        <BodyCopy
          onPress={this.logoutApp}
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_overview_logout')}
          color="gray.900"
        />
      </React.Fragment>
    );
  }
}

LogOutView.propTypes = {
  className: PropTypes.string.isRequired,
  triggerLogout: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default LogOutView;
export { LogOutView as LogOutViewVanilla };
