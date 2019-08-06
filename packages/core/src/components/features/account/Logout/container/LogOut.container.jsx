import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './LogOut.actions';
import labels from './LogOut.labels';
import LogOutView from '../views/LogOut.view';

export class LogOutPageContainer extends React.PureComponent {
  render() {
    const { triggerLogout } = this.props;
    return <LogOutView triggerLogout={triggerLogout} labels={labels} />;
  }
}

LogOutPageContainer.propTypes = {
  triggerLogout: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => {
  return {
    triggerLogout: payload => {
      dispatch(logout(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogOutPageContainer);
