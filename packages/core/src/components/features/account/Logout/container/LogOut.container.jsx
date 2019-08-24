import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './LogOut.actions';
import LogOutView from '../views/LogOut.view';

class LogOutPageContainer extends React.PureComponent {
  render() {
    const { triggerLogout, labels } = this.props;
    return <LogOutView triggerLogout={triggerLogout} labels={labels} />;
  }
}

LogOutPageContainer.propTypes = {
  triggerLogout: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
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
export { LogOutPageContainer as LogOutPageContainerVanilla };
